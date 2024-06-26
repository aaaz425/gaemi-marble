import {
  CORNER_CELLS,
  DICE_MOVE_DELAY,
  changeDirection,
  DIRECTIONS,
} from '@components/GameBoard/constants';
import { useGameInfoValue, useSetPlayers } from '@store/reducer';
import { GameBoardType } from '@store/reducer/type';
import { delay } from '@utils/index';
import { MutableRefObject } from 'react';

type MoveTokenParams = {
  diceCount: number;
  playerGameBoardData: GameBoardType;
};

export default function useMoveToken() {
  const gameInfo = useGameInfoValue();
  const setPlayers = useSetPlayers();

  const moveToNextCell = (
    x: number,
    y: number,
    tokenCoordinates: { x: number; y: number },
    tokenRef: MutableRefObject<HTMLDivElement | null> | null
  ) => {
    if (!tokenRef) return;
    const ref = tokenRef as MutableRefObject<HTMLDivElement>;
    tokenCoordinates.x += x;
    tokenCoordinates.y += y;
    ref.current.style.transform = `translate(${tokenCoordinates.x}rem, ${tokenCoordinates.y}rem)`;
  };

  const moveToken = async ({
    diceCount,
    playerGameBoardData,
  }: MoveTokenParams) => {
    const delayTime = DICE_MOVE_DELAY;
    const tokenCoordinates = {
      x: playerGameBoardData.coordinates.x,
      y: playerGameBoardData.coordinates.y,
    };
    let tokenDirection = playerGameBoardData.direction;
    let tokenLocation = playerGameBoardData.location;

    for (let i = diceCount; i > 0; i--) {
      const directionData = DIRECTIONS[tokenDirection];
      moveToNextCell(
        directionData.x,
        directionData.y,
        tokenCoordinates,
        playerGameBoardData.ref
      );

      tokenLocation = (tokenLocation + 1) % 24;
      const isCorner = CORNER_CELLS.includes(tokenLocation);

      if (isCorner) {
        tokenDirection = changeDirection(tokenDirection);
      }

      await delay(delayTime);
    }

    setPlayers((prev) => {
      const targetPlayerIndex = prev.findIndex(
        (player) => player.playerId === gameInfo.currentPlayerId
      );
      const hasEscaped = tokenLocation === 6 ? false : true;

      return prev.map((player, index) => {
        if (index !== targetPlayerIndex) return player;
        return {
          ...player,
          gameBoard: {
            ...player.gameBoard,
            location: tokenLocation,
            coordinates: tokenCoordinates,
            direction: tokenDirection,
            hasEscaped,
          },
        };
      });
    });
  };

  return moveToken;
}
