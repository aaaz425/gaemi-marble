import useGetSocketUrl from '@hooks/useGetSocketUrl';
import useHover from '@hooks/useHover';
import useTeleportToken from '@hooks/useTeleportToken';
import { usePlayerIdValue } from '@store/index';
import {
  useGameInfoValue,
  usePlayersValue,
  useResetTeleportStatus,
} from '@store/reducer';
import { PlayerStatusType } from '@store/reducer/type';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import { styled } from 'styled-components';
import Dice from './Dice';
import Roulette from './Roulette';

type CenterAreaProps = {
  currentStatus: PlayerStatusType;
  targetLocation: number | null;
  resetTargetLocation: () => void;
};

export default function CenterArea({
  currentStatus,
  targetLocation,
  resetTargetLocation,
}: CenterAreaProps) {
  const {
    handleMouseEnter: handleBailBtnEnter,
    handleMouseLeave: handleBailBtnLeave,
    isHover: isBailBtnHover,
  } = useHover();
  const {
    handleMouseEnter: handleEscapeBtnEnter,
    handleMouseLeave: handleEscapeBtnLeave,
    isHover: isEscapeBtnHover,
  } = useHover();
  const { gameId } = useParams();
  const playerId = usePlayerIdValue();
  const players = usePlayersValue();
  const {
    currentPlayerId,
    firstPlayerId,
    isMoveFinished,
    teleportPlayerId,
    teleportLocation,
  } = useGameInfoValue();
  const teleportToken = useTeleportToken();
  const resetTeleportStatus = useResetTeleportStatus();
  const socketUrl = useGetSocketUrl();
  const { sendJsonMessage } = useWebSocket(socketUrl, {
    share: true,
  });

  const isMyTurn = playerId === currentPlayerId;
  const eventTime = currentPlayerId === null;
  const isPrison = currentStatus === 'prison';
  const isTeleport = currentStatus === 'teleport';
  const isFirstPlayer = firstPlayerId === playerId;

  const defaultStart =
    isMyTurn && !eventTime && !isPrison && !isTeleport && !isMoveFinished;
  const prisonStart = isMyTurn && !eventTime && isPrison && !isMoveFinished;
  const teleportStart = isMyTurn && !eventTime && isTeleport && !isMoveFinished;

  useEffect(() => {
    if (!eventTime) return;
    if (firstPlayerId !== playerId) return;
    const message = {
      type: 'events',
      gameId,
    };
    sendJsonMessage(message);
  }, [eventTime, gameId, playerId, firstPlayerId, sendJsonMessage]);

  const sendCellMessage = useCallback(
    (playerId: string) => {
      const message = {
        type: 'cell',
        gameId,
        playerId,
      };
      sendJsonMessage(message);
    },
    [gameId, sendJsonMessage]
  );

  useEffect(() => {
    if (!teleportLocation) return;
    const targetPlayer = players.find(
      (player) => player.playerId === teleportPlayerId
    );
    if (!targetPlayer) return;
    teleportToken({
      location: teleportLocation,
      playerData: targetPlayer,
    });
    if (playerId === teleportPlayerId) {
      sendCellMessage(teleportPlayerId);
    }
    resetTargetLocation();
    resetTeleportStatus();
  }, [
    players,
    playerId,
    teleportPlayerId,
    teleportLocation,
    teleportToken,
    sendCellMessage,
    resetTargetLocation,
    resetTeleportStatus,
  ]);

  const handleThrowDice = () => {
    const message = {
      type: 'dice',
      gameId,
      playerId,
    };
    sendJsonMessage(message);
  };

  const handleEndTurn = () => {
    const message = {
      type: 'endTurn',
      gameId,
      playerId,
    };
    sendJsonMessage(message);
  };

  const handleBail = () => {
    const message = {
      type: 'bail',
      gameId,
      playerId,
    };
    sendJsonMessage(message);
  };

  const handleEscape = () => {
    const message = {
      type: 'prisonDice',
      gameId,
      playerId,
    };
    sendJsonMessage(message);
  };

  const handleTeleport = () => {
    if (!targetLocation) {
      alert('이동할 칸을 선택해주세요.');
      return;
    }
    const message = {
      type: 'teleport',
      gameId,
      playerId,
      location: targetLocation,
    };
    sendJsonMessage(message);
  };

  const sendStatusBoardMessage = () => {
    const message = {
      type: 'statusBoard',
      gameId,
    };

    if (isFirstPlayer) {
      sendJsonMessage(message);
    }
  };

  return (
    <Center>
      {eventTime && (
        <Roulette sendStatusBoardMessage={sendStatusBoardMessage} />
      )}
      {!eventTime && !teleportStart && (
        <Dice sendCellMessage={sendCellMessage} />
      )}
      {defaultStart && (
        <Button onClick={handleThrowDice} disabled={isMoveFinished}>
          굴리기
        </Button>
      )}
      {prisonStart && (
        <Wrapper>
          <Button
            onMouseEnter={handleBailBtnEnter}
            onMouseLeave={handleBailBtnLeave}
            onClick={handleBail}
          >
            {isBailBtnHover ? '-5,000,000₩' : '보석금 지불'}
          </Button>
          <Button
            onMouseEnter={handleEscapeBtnEnter}
            onMouseLeave={handleEscapeBtnLeave}
            onClick={handleEscape}
          >
            {isEscapeBtnHover ? '주사위 더블시 탈출' : '굴려서 탈출'}
          </Button>
        </Wrapper>
      )}
      {teleportStart && (
        <>
          <span>이동할 칸을 선택한 후</span>
          <span>이동하기 버튼을 눌러주세요.</span>
          <Button onClick={handleTeleport}>이동하기</Button>
        </>
      )}
      {isMyTurn && isMoveFinished && (
        <Button onClick={handleEndTurn}>턴종료</Button>
      )}
    </Center>
  );
}

const Center = styled.div`
  width: 20rem;
  height: 20rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  width: 8rem;
  height: 4rem;
  border-radius: ${({ theme: { radius } }) => radius.small};
  color: ${({ theme: { color } }) => color.neutralText};
  background-color: ${({ theme: { color } }) => color.neutralBackground};
  box-shadow: 0 0.5rem 0 #9d9d9d;

  &:active {
    box-shadow: none;
    transform: translateY(0.5rem);
    transition: transform 0.1s box-shadow 0.1s;
  }
`;
