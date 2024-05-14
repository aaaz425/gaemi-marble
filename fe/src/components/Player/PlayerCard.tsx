import StockSellModal from '@components/Modal/StockSellModal/StockSellModal';
import useGetSocketUrl from '@hooks/useGetSocketUrl';
import { usePlayerIdValue } from '@store/index';
import { useGameInfoValue } from '@store/reducer';
import { PlayerType } from '@store/reducer/type';
import { useState } from 'react';
import { useParams } from 'react-router';
import useWebSocket from 'react-use-websocket';
import { styled } from 'styled-components';
import PlayerInfo from './PlayerInfo';
import PlayerStockList from './PlayerStockList';
import { BOTTOM_PLAYERS } from './constants';

type PlayerCardProps = {
  player: PlayerType;
};

export default function PlayerCard({ player }: PlayerCardProps) {
  const { gameId } = useParams();
  const myId = usePlayerIdValue();
  const { currentPlayerId, eventResult, isPlaying } = useGameInfoValue();
  const { isReady, playerId, userStatusBoard, order } = player;
  const [isStockSellModalOpen, setIsStockSellModalOpen] = useState(false);
  const socketUrl = useGetSocketUrl();
  const { sendJsonMessage } = useWebSocket(socketUrl, {
    share: true,
  });

  const isMyButton = playerId === myId;
  const eventTime = currentPlayerId === null;
  const beforeRouletteSpin = !eventResult;

  const handleReady = () => {
    const message = {
      type: 'ready',
      gameId,
      playerId,
      isReady: !isReady,
    };
    sendJsonMessage(message);
  };

  const toggleStockSellModal = () => {
    setIsStockSellModalOpen((prev) => !prev);
  };

  const isBottomCard = BOTTOM_PLAYERS.includes(order);

  return (
    <>
      {playerId && (
        <CardWrapper $isBottomCard={isBottomCard}>
          <PlayerInfo player={player} />
          {!!userStatusBoard.stockList.length && (
            <PlayerStockList stockList={userStatusBoard.stockList} />
          )}
          {!isPlaying && (
            <ButtonWrapper>
              <ReadyButton
                onClick={handleReady}
                disabled={!isMyButton}
                $isReady={isReady}
              >
                {isReady ? '준비완료' : '준비'}
              </ReadyButton>
            </ButtonWrapper>
          )}
          {isMyButton && eventTime && beforeRouletteSpin && (
            <ButtonWrapper>
              <StockSellButton onClick={toggleStockSellModal}>
                매도하기
              </StockSellButton>
            </ButtonWrapper>
          )}
        </CardWrapper>
      )}
      {isStockSellModalOpen && eventTime && beforeRouletteSpin && (
        <StockSellModal handleClose={toggleStockSellModal} />
      )}
    </>
  );
}

const CardWrapper = styled.div<{
  $isBottomCard: boolean;
}>`
  display: flex;
  flex-direction: ${({ $isBottomCard }) =>
    $isBottomCard ? 'column-reverse' : 'column'};
  align-items: center;
  gap: 0.5rem;
`;

const ButtonWrapper = styled.div`
  height: 3.5rem;
`;

const ReadyButton = styled.button<{ $isReady: boolean }>`
  z-index: -1;
  width: 8rem;
  height: 3rem;
  border-radius: ${({ theme: { radius } }) => radius.small};
  color: ${({ theme: { color } }) => color.neutralText};
  background-color: ${({ theme: { color }, $isReady }) =>
    $isReady ? color.accentTertiary : color.neutralBackground};
  box-shadow: 0 0.5rem 0 ${({ $isReady }) => ($isReady ? '#007076' : '#9d9d9d')};

  &:hover {
    box-shadow: none;
    transform: translateY(0.5rem);
    transition: transform 0.1s box-shadow 0.1s;
  }

  &:active {
    height: 2.5rem;
    box-shadow: 0 -0.5rem 0 ${({ $isReady }) => ($isReady ? '#007076' : '#9d9d9d')};
    transform: translateY(1rem);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const StockSellButton = styled.button`
  width: 6rem;
  height: 3rem;
  border: 1px solid;
  border-radius: ${({ theme: { radius } }) => radius.small};
  box-shadow: 0 0.5rem 0 #9d9d9d;
  color: ${({ theme: { color } }) => color.neutralText};
  background-color: ${({ theme: { color } }) => color.neutralBackground};

  &:hover {
    box-shadow: none;
    transform: translateY(0.5rem);
    transition: transform 0.1s box-shadow 0.1s;
  }

  &:active {
    height: 2.5rem;
    box-shadow: 0 -0.5rem 0 #9d9d9d;
    transform: translateY(1rem);
  }
`;
