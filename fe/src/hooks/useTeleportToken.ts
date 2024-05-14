import {
  CELL_COORDINATES,
  LINE_1_CELLS,
  LINE_2_CELLS,
  LINE_3_CELLS,
  LINE_4_CELLS,
} from '@components/GameBoard/constants';
import { useSetPlayers } from '@store/reducer';
import { DirectionType, PlayerType } from '@store/reducer/type';

type teleportTokenParams = {
  location: number;
  playerData: PlayerType;
};

type updatedPlayerGameBoardType = {
  playerId: string;
  direction: DirectionType;
  location: number;
  coordinates: { x: number; y: number };
};

export default function useTeleportToken() {
  const setPlayers = useSetPlayers();

  const getCellCoordinates = (location: number) => CELL_COORDINATES[location];

  const getNewDirection = (location: number): DirectionType => {
    if (LINE_1_CELLS.includes(location)) return 'top';
    if (LINE_2_CELLS.includes(location)) return 'right';
    if (LINE_3_CELLS.includes(location)) return 'bottom';
    if (LINE_4_CELLS.includes(location)) return 'left';
    return 'top';
  };

  const moveTokenCoordinates = (
    tokenRef: React.MutableRefObject<HTMLDivElement | null> | null,
    coordinates: { x: number; y: number }
  ) => {
    if (!tokenRef?.current) return;
    tokenRef.current.style.transform = `translate(${coordinates.x}rem, ${coordinates.y}rem)`;
  };

  const updatePlayerState = (
    prevPlayers: PlayerType[],
    { playerId, direction, location, coordinates }: updatedPlayerGameBoardType
  ) => {
    const hasEscaped = location === 6 ? false : true;

    return prevPlayers.map((player) => {
      if (player.playerId === playerId) {
        return {
          ...player,
          gameBoard: {
            ...player.gameBoard,
            direction,
            location,
            coordinates,
            hasEscaped,
          },
        };
      }
      return player;
    });
  };

  const teleportToken = ({ location, playerData }: teleportTokenParams) => {
    const { playerId, gameBoard } = playerData;
    const { ref: tokenRef } = gameBoard;
    const coordinates = getCellCoordinates(location);
    const direction = getNewDirection(location);
    moveTokenCoordinates(tokenRef, coordinates);

    const updatedPlayerGameBoard = {
      playerId,
      direction,
      location,
      coordinates,
    };

    setPlayers((prev) => updatePlayerState(prev, updatedPlayerGameBoard));
  };

  return teleportToken;
}
