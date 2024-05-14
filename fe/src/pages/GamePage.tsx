import EmoteMenu from '@components/GameBoard/EmoteMenu';
import GameBoard from '@components/GameBoard/GameBoard';
// import GameHeader from '@components/Header/GameHeader';
import GameOverModal from '@components/Modal/GameOverModal/GameOverModal';
import GoldCardModal from '@components/Modal/GoldCardModal/GoldCardModal';
import StockBuyModal from '@components/Modal/StockBuyModal/StockBuyModal';
import LeftPlayers from '@components/Player/LeftPlayers';
import RightPlayers from '@components/Player/RightPlayers';
import useGetSocketUrl from '@hooks/useGetSocketUrl';
import useWindowSize from '@hooks/useWindowSize';
import { ROUTE_PATH } from '@router/constants';
import { usePlayerIdValue } from '@store/index';
import { useGameInfoValue, usePlayersValue } from '@store/reducer';
import useGameReducer from '@store/reducer/useGameReducer';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import { styled } from 'styled-components';
import { GOLD_CARD_LOCATIONS, STOCK_LOCATION } from './constants';

export default function GamePage() {
  const navigate = useNavigate();
  const playersInfo = usePlayersValue();
  const playerId = usePlayerIdValue();
  const { isPlaying, currentPlayerId, isMoveFinished, goldCardInfo, ranking } =
    useGameInfoValue();
  const { dispatch } = useGameReducer();
  const socketUrl = useGetSocketUrl();
  const { width, height } = useWindowSize();
  const [isStockBuyModalOpen, setIsStockBuyModalOpen] = useState(false);

  const handleCloseSocket = () => {
    alert('유효하지 않은 게임방입니다');
    navigate(ROUTE_PATH.HOME);
  };

  const handleCloseStockBuyModal = () => {
    setIsStockBuyModalOpen(false);
  };

  const { lastMessage } = useWebSocket(socketUrl, {
    share: true,
    onClose: handleCloseSocket,
  });

  const isCurrentPlayer = currentPlayerId === playerId;
  const currentLocation = playersInfo.find(
    (player) => player.playerId === playerId
  )?.location;
  const isLocatedStockCell = STOCK_LOCATION.includes(currentLocation ?? 0);
  const isLocatedGoldCardCell = GOLD_CARD_LOCATIONS.includes(
    currentLocation ?? 0
  );
  const isGameOver = !isPlaying && !!ranking.length;
  const isGoldCardOpen =
    isCurrentPlayer && isLocatedGoldCardCell && goldCardInfo.title;

  useEffect(() => {
    if (lastMessage) {
      const messageFromServer = JSON.parse(lastMessage?.data);
      dispatch({
        type: messageFromServer.type,
        payload: messageFromServer.data,
      });
    }
    // Memo: dependency에 dispatch 추가시 무한렌더링
  }, [lastMessage]);

  useEffect(() => {
    if (isCurrentPlayer && isLocatedStockCell && isMoveFinished) {
      setIsStockBuyModalOpen(true);
    }
  }, [isCurrentPlayer, isLocatedStockCell, isMoveFinished]);

  return (
    <>
      <Container>
        {/* <GameHeader /> */}
        <Main>
          <LeftPlayers />
          <GameBoard />
          <RightPlayers />
        </Main>
        <EmoteMenu />
      </Container>
      {isGoldCardOpen && <GoldCardModal />}
      {isStockBuyModalOpen && (
        <StockBuyModal handleClose={handleCloseStockBuyModal} />
      )}
      {isGameOver && <GameOverModal />}
      {isGameOver && <Confetti width={width} height={height} />}
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  color: ${({ theme: { color } }) => color.accentText};
`;

const Main = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex: 1;
`;
