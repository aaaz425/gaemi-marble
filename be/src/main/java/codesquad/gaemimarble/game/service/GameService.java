package codesquad.gaemimarble.game.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import codesquad.gaemimarble.game.dto.GameMapper;
import codesquad.gaemimarble.game.dto.request.GameEndTurnRequest;
import codesquad.gaemimarble.game.dto.request.GameEventResultRequest;
import codesquad.gaemimarble.game.dto.request.GameRollDiceRequest;
import codesquad.gaemimarble.game.dto.request.GameSellStockRequest;
import codesquad.gaemimarble.game.dto.request.GameStockBuyRequest;
import codesquad.gaemimarble.game.dto.request.StockNameQuantity;
import codesquad.gaemimarble.game.dto.response.GameAccessibleResponse;
import codesquad.gaemimarble.game.dto.response.GameDiceResult;
import codesquad.gaemimarble.game.dto.response.GameEndTurnResponse;
import codesquad.gaemimarble.game.dto.response.GameEnterResponse;
import codesquad.gaemimarble.game.dto.response.GameEventListResponse;
import codesquad.gaemimarble.game.dto.response.GameEventResponse;
import codesquad.gaemimarble.game.dto.response.GameRoomCreateResponse;
import codesquad.gaemimarble.game.dto.response.generalStatusBoard.GameStatusBoardResponse;
import codesquad.gaemimarble.game.dto.response.userStatusBoard.GameUserBoardResponse;
import codesquad.gaemimarble.game.entity.Board;
import codesquad.gaemimarble.game.entity.CurrentPlayerInfo;
import codesquad.gaemimarble.game.entity.Events;
import codesquad.gaemimarble.game.entity.GameStatus;
import codesquad.gaemimarble.game.entity.Player;
import codesquad.gaemimarble.game.entity.Stock;
import codesquad.gaemimarble.game.entity.Theme;
import codesquad.gaemimarble.game.repository.GameRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GameService {
	private final GameRepository gameRepository;

	public GameRoomCreateResponse createRoom() {
		GameStatus gameStatus = GameStatus.builder()
			.players(new ArrayList<>())
			.stocks(Stock.initStocks())
			.roundCount(0)
			.isStarted(false)
			.board(new Board())
			.build();
		Long gameRoomId = gameRepository.createRoom(gameStatus);
		return GameRoomCreateResponse.builder().gameId(gameRoomId).build();
	}

	public List<GameEnterResponse> enterGame(Long gameId, String playerId) {
		Player player = Player.init(playerId);
		List<Player> players = gameRepository.enterGame(gameId, player);
		return players.stream()
			.map(p -> GameEnterResponse.of(p.getOrder(), p.getPlayerId()))
			.collect(Collectors.toList());
	}

	public String getFirstPlayer(Long gameId) {
		List<Player> players = gameRepository.getAllPlayer(gameId);
		int randomIndex = (int)(Math.random() * players.size()) + 1;
		gameRepository.setOrder(gameId, players.get(randomIndex));
		return players.get(randomIndex).getPlayerId();
	}

	public GameAccessibleResponse checkAccessibility(Long gameId) {
		GameStatus gameStatus = gameRepository.getGameStatus(gameId);
		boolean isPresent = false;
		boolean isFull = false;
		if (gameStatus != null) {
			isPresent = true;
			if (gameStatus.getPlayers().size() == 4) {
				isFull = true;
			}
		}

		return GameAccessibleResponse.builder().isPresent(isPresent).isFull(isFull).build();
	}

	public GameDiceResult rollDice(GameRollDiceRequest gameRollDiceRequest) {
		int dice1 = (int)(Math.random() * 6) + 1;
		int dice2 = (int)(Math.random() * 6) + 1;

		GameStatus gameStatus = gameRepository.getGameStatus(gameRollDiceRequest.getGameId());
		Player player = gameStatus.getPlayer(gameRollDiceRequest.getPlayerId());
		int startLocation = player.getLocation();

		if (dice1 == dice2) {
			int countDouble = gameStatus.increaseCountDouble();
			if (countDouble == 3) {
				player.goToPrison();
				return new GameDiceResult(startLocation, dice1, dice2);
			}
		}
		player.move(dice1 + dice2);
		return new GameDiceResult(startLocation, dice1, dice2);
	}

	public GameEventListResponse selectEvents() {
		List<Integer> numbers = new ArrayList<>();
		GameEventListResponse gameEventListResponse = GameEventListResponse.builder().events(new ArrayList<>()).build();

		for (int i = 1; i <= Events.values().length; i++) {
			numbers.add(i);
		}

		List<Integer> selectedNumbers = new ArrayList<>();
		Random random = new Random();
		for (int i = 0; i < 6; i++) {
			int randomIndex = random.nextInt(numbers.size());
			selectedNumbers.add(randomIndex);
			numbers.remove(randomIndex);
		}
		int count = 1;
		for (Events event : Events.values()) {
			if (selectedNumbers.contains(count)) {
				gameEventListResponse.getEvents()
					.add(GameEventResponse.builder()
						.title(event.getTitle())
						.content(event.getContents())
						.impact(event.getImpactDescription())
						.build());
			}
		}
		return gameEventListResponse;

	}

	public GameStatusBoardResponse proceedEvent(GameEventResultRequest gameEventResultRequest) {
		Events eventToProceed = null;
		for (Events events : Events.values()) {
			if (events.getTitle().equals(gameEventResultRequest.getEventName())) {
				eventToProceed = events;
			}
		}
		if (eventToProceed == null) {
			throw new RuntimeException("이벤트 이름이 맞지 않습니다");
		}
		GameStatus gameStatus = gameRepository.getGameStatus(gameEventResultRequest.getGameId());
		Map<Theme, Integer> impactMap = eventToProceed.getImpact();
		List<Stock> stockList = gameStatus.getStocks();
		for (Stock stock : stockList) {
			if (impactMap.containsKey(stock.getTheme())) {
				stock.changePrice(impactMap.get(stock.getTheme()));
			} else {
				Random random = new Random();
				stock.changePrice(random.nextBoolean() ? -10 : 10);
			}
		}
		return createGameStatusBoardResponse(gameEventResultRequest.getGameId());
	}

	public GameStatusBoardResponse createGameStatusBoardResponse(Long gameId) {
		List<Stock> stockList = gameRepository.getGameStatus(gameId).getStocks();
		return GameStatusBoardResponse.builder()
			.stockStatusBoard(stockList.stream()
				.map(stock -> GameMapper.INSTANCE.toGameStockStatusResponse(stock, stock.getTheme().getName()))
				.collect(Collectors.toList()))
			.build();
	}

	public GameUserBoardResponse buyStock(GameStockBuyRequest gameStockBuyRequest) {
		GameStatus gameStatus = gameRepository.getGameStatus(gameStockBuyRequest.getGameId());
		Player player = gameRepository.getAllPlayer(gameStockBuyRequest.getGameId())
			.stream()
			.filter(p -> p.getPlayerId().equals(gameStockBuyRequest.getPlayerId()))
			.findFirst()
			.orElseThrow(() -> new RuntimeException("해당 플레이어가 존재하지 않습니다"));
		Stock stock = gameStatus.getStocks()
			.stream()
			.filter(s -> s.getName().equals(gameStockBuyRequest.getStockName()))
			.findFirst()
			.orElseThrow(() -> new RuntimeException("존재하지 않는 주식이름입니다"));
		if (stock.getRemainingStock() < gameStockBuyRequest.getQuantity()
			| player.getCashAsset() < stock.getCurrentPrice() * gameStockBuyRequest.getQuantity()) {
			throw new RuntimeException("구매할 수량이 부족하거나, 플레이어 보유 캐쉬가 부족합니다");
		}
		player.buy(stock, gameStockBuyRequest.getQuantity());
		stock.decrementQuantity(gameStockBuyRequest.getQuantity());
		return createUserBoardResponse(player, gameStatus.getStocks());
	}

	private GameUserBoardResponse createUserBoardResponse(Player player, List<Stock> stocks) {
		return GameUserBoardResponse.builder()
			.playerId(player.getPlayerId())
			.userStatusBoard(GameMapper.INSTANCE.toGameUserStatusBoardResponse(player, stocks
				.stream()
				.map(GameMapper.INSTANCE::toStockNameResponse)
				.collect(Collectors.toList())))
			.build();
	}

	public GameUserBoardResponse sellStock(GameSellStockRequest gameSellStockRequest) {
		GameStatus gameStatus = gameRepository.getGameStatus(gameSellStockRequest.getGameId());
		Player player = gameRepository.getAllPlayer(gameSellStockRequest.getGameId())
			.stream()
			.filter(p -> p.getPlayerId().equals(gameSellStockRequest.getPlayerId()))
			.findFirst()
			.orElseThrow(() -> new RuntimeException("해당 플레이어가 존재하지 않습니다"));

		Map<String, Integer> sellingStockInfoMap = new HashMap<>();
		for (StockNameQuantity stock : gameSellStockRequest.getStockList()) {
			sellingStockInfoMap.put(stock.getName(), stock.getQuantity());
		}
		for (String stockName : sellingStockInfoMap.keySet()) {
			if (player.getMyStocks().get(stockName) < sellingStockInfoMap.get(stockName)) {
				throw new RuntimeException("플레이어가 보유한 주식보다 더 많이 팔수는 없습니다");
			}
		}

		List<Stock> stocks = gameStatus.getStocks();
		for (Stock stock : stocks) {
			String stockName = stock.getName();
			if (sellingStockInfoMap.containsKey(stockName)) {
				stock.incrementQuantity(sellingStockInfoMap.get(stockName));
				player.sellStock(stock, sellingStockInfoMap.get(stockName));
			}
		}

		return createUserBoardResponse(player, gameStatus.getStocks());

	}

	public GameEndTurnResponse endTurn(GameEndTurnRequest gameEndTurnRequest) {
		GameStatus gameStatus = gameRepository.getGameStatus(gameEndTurnRequest.getGameId());
		CurrentPlayerInfo currentPlayerInfo = gameStatus.getCurrentPlayerInfo();
		// TODO: 전에 더블을 굴렸으면 한번 더해야하는 로직 추가해야함
		if (currentPlayerInfo.getOrder() != gameStatus.getPlayers().size()) {
			for (Player player : gameStatus.getPlayers()) {
				if (player.getOrder() == currentPlayerInfo.getOrder() + 1) {
					currentPlayerInfo.update(player);
					return GameEndTurnResponse.builder()
						.nextPlayerId(player.getPlayerId())
						.build();
				}
			}
		}
		for (Player player : gameStatus.getPlayers()) {
			if (player.getOrder() == 1) {
				currentPlayerInfo.update(player);
			}
		}
		return GameEndTurnResponse.builder()
			.nextPlayerId(null)
			.build();
	}
}