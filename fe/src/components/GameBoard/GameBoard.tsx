import useGetSocketUrl from '@hooks/useGetSocketUrl';
import { usePlayerIdValue } from '@store/index';
import {
  playerAtomsAtom,
  useGameInfoValue,
  usePlayersValue,
  useStocksValue,
} from '@store/reducer';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import { css, styled } from 'styled-components';
import Cell from './Cell';
import CenterArea from './CenterArea';
import PlayerToken from './PlayerToken';
import { INITIAL_BOARD } from './constants';

export default function GameBoard() {
  const { gameId } = useParams();
  const playerId = usePlayerIdValue();
  const { currentPlayerId, isPlaying } = useGameInfoValue();
  const stockList = useStocksValue();
  const players = usePlayersValue();
  const [playerAtoms] = useAtom(playerAtomsAtom);
  const [targetLocation, setTargetLocation] = useState<number | null>(null);
  const socketUrl = useGetSocketUrl();
  const { sendJsonMessage } = useWebSocket(socketUrl, {
    share: true,
  });

  const isEveryoneReady = players.every(
    (player) => player.playerId === '' || player.isReady
  );
  const currentPlayer = players.find(
    (player) => player.playerId === currentPlayerId
  );
  const currentPlayerStatus = currentPlayer!.gameBoard.status;
  const isCaptain =
    players.find((player) => player.playerId === playerId)?.order === 1;

  const handleStart = () => {
    const message = {
      type: 'start',
      gameId,
    };
    sendJsonMessage(message);
  };

  const selectTargetLocation = (location: number) => {
    setTargetLocation(location);
  };

  const resetTargetLocation = () => {
    setTargetLocation(null);
  };

  return (
    <Container>
      <Board>
        {INITIAL_BOARD.map((line, index) => (
          <Line key={index} $lineNum={index + 1}>
            {line.map((cell) => {
              const stockPrice = stockList.find(
                (stock) => stock.logo === cell.logo
              )?.price;
              return (
                <Cell
                  key={cell.name}
                  cell={cell}
                  price={stockPrice}
                  playerStatus={currentPlayerStatus}
                  targetLocation={targetLocation}
                  selectTargetLocation={selectTargetLocation}
                />
              );
            })}
          </Line>
        ))}
        {!isPlaying && isEveryoneReady && isCaptain && (
          <Button onClick={handleStart}>게임 시작</Button>
        )}

        {playerAtoms.map((playerAtom) => {
          return <PlayerToken key={`${playerAtom}`} playerAtom={playerAtom} />;
        })}
      </Board>
      {isPlaying && (
        <CenterArea
          currentStatus={currentPlayerStatus}
          targetLocation={targetLocation}
          resetTargetLocation={resetTargetLocation}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Board = styled.div`
  width: 42rem;
  height: 42rem;
  min-width: 42rem;
  min-height: 42rem;
  position: relative;
  border-color: ${({ theme: { color } }) => color.accentText};
  transform-style: preserve-3d;
  transform: perspective(10000px) rotateZ(-55deg) rotateX(30deg) rotateY(35deg)
    translateZ(20px);
`;

const Line = styled.div<{ $lineNum: number }>`
  position: absolute;
  display: flex;
  transform-style: preserve-3d;
  ${({ $lineNum }) => drawLine($lineNum)}
`;

const Button = styled.button`
  width: 6rem;
  height: 4rem;
  position: absolute;
  top: 50%;
  left: 50%;
  box-shadow: 0 0.5rem 0 #9d9d9d;
  transform: translate(-50%, -50%) rotateZ(45deg);
  border-radius: ${({ theme: { radius } }) => radius.small};
  color: ${({ theme: { color } }) => color.neutralText};
  background-color: ${({ theme: { color } }) => color.neutralBackground};

  &:active {
    box-shadow: none;
    transform: translate(-50%, -50%) rotateZ(45deg) translateY(0.5rem);
    transition: transform 0.1s box-shadow 0.1s;
  }
`;

const drawLine = (lineNum: number) => {
  switch (lineNum) {
    case 1:
      return css`
        top: 6rem;
        left: 0;
        flex-direction: column-reverse;
      `;
    case 2:
      return css`
        top: 0;
        flex-direction: row;
      `;
    case 3:
      return css`
        right: 0;
        flex-direction: column;
      `;
    case 4:
      return css`
        bottom: 0;
        right: 0;
        flex-direction: row-reverse;
      `;
    default:
      return css``;
  }
};
