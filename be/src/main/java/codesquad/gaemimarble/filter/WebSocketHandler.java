package codesquad.gaemimarble.filter;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

import codesquad.gaemimarble.game.GameMessage;
import codesquad.gaemimarble.game.controller.GameController;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketHandler extends TextWebSocketHandler {
	private final ObjectMapper objectMapper;
	private final GameController gameController;

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		Long gameId = extractGameIdFromUri(session.getUri().getPath());
		String playerId = extractPlayerIdFromUri(session.getUri().getPath());
		gameController.enterGame(gameId, session, playerId);
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		String payload = message.getPayload();
		log.info("payload:{}", payload);

		GameMessage gameMessage = objectMapper.readValue(payload, GameMessage.class);
		Class<?> expectedClass = gameController.getTypeMap().get(gameMessage.getType());
		Object mappedRequest = objectMapper.readValue(
			payload, expectedClass);
		log.info("payload:{}", payload);
		log.info("className:{}", mappedRequest.getClass().cast(mappedRequest));
		gameController.handleRequest(mappedRequest);
	}

	private Long extractGameIdFromUri(String uri) {
		String[] parts = uri.split("/");
		return Long.parseLong(parts[3]); // Assuming /api/games/{room}

	}
}
