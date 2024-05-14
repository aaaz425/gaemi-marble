import useGetSocketUrl from '@hooks/useGetSocketUrl';
import { usePlayerIdValue } from '@store/index';
import {
  useGameInfoValue,
  useResetGoldCard,
  useSetPlayers,
} from '@store/reducer';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import { styled } from 'styled-components';
import GoldCardNoTarget from './GoldCardNoTarget';
import GoldCardPlayer from './GoldCardPlayer';
import GoldCardStock from './GoldCardStock';
import { NEED_NOTHING, NEED_PLAYER, NEED_STOCK } from './constants';

export default function GoldCardModalContent() {
  const { goldCardInfo } = useGameInfoValue();
  const { cardType, title, description } = goldCardInfo;
  const { gameId } = useParams();
  const playerId = usePlayerIdValue();
  const setPlayers = useSetPlayers();
  const { currentPlayerId } = useGameInfoValue();
  const resetGoldCard = useResetGoldCard();
  const [targetPlayer, setTargetPlayer] = useState('');
  const [targetStock, setTargetStock] = useState('');
  const socketUrl = useGetSocketUrl();
  const { sendJsonMessage } = useWebSocket(socketUrl, {
    share: true,
  });

  const handleChoosePlayer = (target: string) => {
    if (targetPlayer === target) {
      setTargetPlayer('');
      return;
    }

    setTargetPlayer(target);
  };

  const handleChooseStock = (stock: string) => {
    if (targetStock === stock) {
      setTargetPlayer('');
      return;
    }

    setTargetStock(stock);
  };

  const handleClickPlayerAttack = () => {
    if (!targetPlayer) {
      alert('타겟을 선택해주세요');
      return;
    }

    sendJsonMessage({
      gameId,
      type: cardType,
      playerId: playerId,
      targetId: targetPlayer,
    });

    resetGoldCard();
  };

  const handleClickStockAttack = () => {
    if (!targetStock) {
      alert('타겟을 선택해주세요');
      return;
    }

    sendJsonMessage({
      gameId,
      type: cardType,
      stockName: targetStock,
    });

    resetGoldCard();
  };

  const handleClickNoTarget = () => {
    resetGoldCard();

    setPlayers((prev) => {
      return prev.map((player) => {
        if (player.playerId === currentPlayerId) {
          return {
            ...player,
            gameBoard: {
              ...player.gameBoard,
              status: 'teleport',
            },
          };
        }

        return player;
      });
    });
  };

  const isTargetNeedNothing = NEED_NOTHING.includes(cardType);
  const isTargetNeedPlayer = NEED_PLAYER.includes(cardType);
  const isTargetNeedStock = NEED_STOCK.includes(cardType);

  return (
    <Content>
      <GoldCard>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </GoldCard>
      {isTargetNeedPlayer && (
        <GoldCardPlayer
          targetPlayer={targetPlayer}
          handleChoosePlayer={handleChoosePlayer}
          handleClickButton={handleClickPlayerAttack}
        />
      )}
      {isTargetNeedStock && (
        <GoldCardStock
          targetStock={targetStock}
          handleChooseStock={handleChooseStock}
          handleClickButton={handleClickStockAttack}
        />
      )}
      {isTargetNeedNothing && (
        <GoldCardNoTarget handleClickButton={handleClickNoTarget} />
      )}
    </Content>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const GoldCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radius.medium};
  background-color: ${({ theme }) => theme.color.accentGold};
`;

const Title = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sMedium};
`;

const Description = styled.span``;
