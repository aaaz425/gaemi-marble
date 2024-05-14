import useTeleportToken from '@hooks/useTeleportToken';
import { useReducerAtom } from 'jotai/utils';
import {
  CellPayloadType,
  DicePayloadType,
  EndTurnPayloadType,
  EnterPayloadType,
  EventResultPayloadType,
  EventsPayloadType,
  GameActionType,
  GoldCardPayloadType,
  PrisonDicePayloadType,
  ReadyPayloadType,
  StartPayloadType,
  StatusBoardPayloadType,
  TeleportPayloadType,
  UserStatusPayloadType,
  CurrentPlayerPayloadType,
  LocationsPayloadType,
  GameOverPayloadType,
  EmoticonPayloadType,
  GameType,
  PlayerType,
} from './type';
import { gameAtom } from '.';

export default function useGameReducer() {
  const teleportToken = useTeleportToken();

  const [gameInfo, dispatch] = useReducerAtom(
    gameAtom,
    (prev, action: GameActionType) => {
      const { type, payload } = action;

      switch (type) {
        case 'start': {
          return handleGameAction(prev, payload);
        }

        case 'endTurn': {
          return handleEndTurnAction(prev, payload);
        }

        case 'dice': {
          return handleDiceAction(prev, payload);
        }

        case 'enter': {
          return handleEnterAction(prev, payload);
        }

        case 'ready': {
          return handleReadyAction(prev, payload);
        }

        case 'userStatusBoard': {
          return handleUserStatusBoardAction(prev, payload);
        }

        case 'cell': {
          return handleCellAction(prev, payload);
        }

        case 'statusBoard': {
          return handleStatusBoardAction(prev, payload);
        }

        case 'events': {
          return handleEventsAction(prev, payload);
        }

        case 'eventResult': {
          return handleEventResultAction(prev, payload);
        }

        case 'goldCard': {
          return handleGoldCardAction(prev, payload);
        }

        case 'prisonDice': {
          return handlePrisonDiceAction(prev, payload);
        }

        case 'teleport': {
          return handleTeleportAction(prev, payload);
        }

        case 'currentPlayer': {
          return handleCurrentPlayerAction(prev, payload);
        }

        // Memo: enter 메세지가 오기전에 먼저 실행돼서 작동을 안 합니다.
        // players 상태가 비어있는 초기 상태로 들어가서 이를 해결해야 할 것 같습니다.
        case 'locations': {
          return handleLocationsAction(prev, payload, teleportToken);
        }

        case 'gameOver': {
          return handleGameOverAction(prev, payload);
        }

        case 'emoticon': {
          return handleEmoticonAction(prev, payload);
        }

        default: {
          return prev;
        }
      }
    }
  );

  return { gameInfo, dispatch };
}

function handleGameAction(prev: GameType, payload: StartPayloadType) {
  return {
    ...prev,
    game: {
      ...prev.game,
      firstPlayerId: payload.playerId,
      currentPlayerId: payload.playerId,
      isPlaying: true,
    },
  };
}

function handleEndTurnAction(prev: GameType, payload: EndTurnPayloadType) {
  return {
    ...prev,
    game: {
      ...prev.game,
      dice: [0, 0],
      currentPlayerId: payload.nextPlayerId,
      isMoveFinished: false,
      goldCardInfo: {
        cardType: '',
        title: '',
        description: '',
      },
    },
  };
}

function handleDiceAction(prev: GameType, payload: DicePayloadType) {
  const { dice1, dice2 } = payload;

  return {
    ...prev,
    game: {
      ...prev.game,
      dice: [dice1, dice2],
    },
  };
}

function handleEnterAction(prev: GameType, payload: EnterPayloadType[]) {
  return {
    ...prev,
    players: prev.players.map((player) => {
      const currentPlayer = payload.find(
        (currentPlayer) => currentPlayer.order === player.order
      );

      if (!currentPlayer) {
        return player;
      }

      const { playerId, isReady } = currentPlayer;

      return {
        ...player,
        playerId: playerId,
        isReady: isReady,
      };
    }),
  };
}

function handleReadyAction(prev: GameType, payload: ReadyPayloadType) {
  return {
    ...prev,
    players: prev.players.map((player) => {
      if (player.playerId !== payload.playerId) {
        return player;
      }

      return {
        ...player,
        isReady: payload.isReady,
      };
    }),
  };
}

function handleUserStatusBoardAction(
  prev: GameType,
  payload: UserStatusPayloadType
) {
  return {
    ...prev,
    players: prev.players.map((player) => {
      if (player.playerId !== payload.playerId) {
        return player;
      }

      return {
        ...player,
        userStatusBoard: payload.userStatusBoard,
      };
    }),
  };
}

function handleCellAction(prev: GameType, payload: CellPayloadType) {
  const playerStatus =
    payload.location === 6
      ? ('prison' as const)
      : payload.location === 18
      ? ('teleport' as const)
      : ('default' as const);

  return {
    ...prev,
    game: {
      ...prev.game,
      isMoveFinished: true,
    },
    players: prev.players.map((player) => {
      if (player.playerId !== payload.playerId) {
        return player;
      }

      return {
        ...player,
        location: payload.location,
        gameBoard: {
          ...player.gameBoard,
          status: playerStatus,
        },
      };
    }),
  };
}

function handleStatusBoardAction(
  prev: GameType,
  payload: StatusBoardPayloadType
) {
  return {
    ...prev,
    stocks: prev.stocks.map((stock) => {
      const newStock = payload.stockStatusBoard.find(
        (resStock) => resStock.name === stock.name
      );

      if (!newStock) {
        return stock;
      }

      return {
        ...stock,
        quantity: newStock.quantity,
        price: newStock.price,
      };
    }),
  };
}

function handleEventsAction(prev: GameType, payload: EventsPayloadType) {
  return {
    ...prev,
    game: {
      ...prev.game,
      timer: payload.timer,
      eventList: [...payload.events],
    },
  };
}

function handleEventResultAction(
  prev: GameType,
  payload: EventResultPayloadType
) {
  return {
    ...prev,
    game: {
      ...prev.game,
      eventResult: payload.name,
    },
  };
}

function handleGoldCardAction(prev: GameType, payload: GoldCardPayloadType) {
  return {
    ...prev,
    game: {
      ...prev.game,
      goldCardInfo: {
        cardType: payload.cardType,
        title: payload.title,
        description: payload.description,
      },
    },
  };
}

function handlePrisonDiceAction(
  prev: GameType,
  payload: PrisonDicePayloadType
) {
  const { dice1, dice2 } = payload;

  if (payload.hasEscaped) {
    return {
      ...prev,
      game: {
        ...prev.game,
        dice: [dice1, dice2],
      },
      players: prev.players.map((player) => {
        if (player.playerId !== payload.playerId) {
          return player;
        }
        return {
          ...player,
          gameBoard: {
            ...player.gameBoard,
            hasEscaped: true,
          },
        };
      }),
    };
  }

  return {
    ...prev,
    game: {
      ...prev.game,
      dice: [dice1, dice2],
    },
    players: prev.players.map((player) => {
      if (player.playerId !== payload.playerId) {
        return player;
      }
      return {
        ...player,
        gameBoard: {
          ...player.gameBoard,
          hasEscaped: false,
        },
      };
    }),
  };
}

function handleTeleportAction(prev: GameType, payload: TeleportPayloadType) {
  return {
    ...prev,
    game: {
      ...prev.game,
      teleportPlayerId: payload.playerId,
      teleportLocation: payload.location,
    },
  };
}

function handleCurrentPlayerAction(
  prev: GameType,
  payload: CurrentPlayerPayloadType
) {
  return {
    ...prev,
    game: {
      ...prev.game,
      currentPlayerId: payload.playerId,
    },
  };
}

function handleLocationsAction(
  prev: GameType,
  payload: LocationsPayloadType[],
  teleportToken: ({
    location,
    playerData,
  }: {
    location: number;
    playerData: PlayerType;
  }) => void
) {
  return {
    ...prev,
    game: {
      ...prev.game,
      isPlaying: true,
    },
    players: prev.players.map((player) => {
      const currentPlayer = payload.find(
        (currentPlayer) => currentPlayer.playerId === player.playerId
      );

      if (!currentPlayer) {
        return player;
      }

      const { location } = currentPlayer;

      teleportToken({
        location,
        playerData: player,
      });

      return {
        ...player,
        location: location,
      };
    }),
  };
}

function handleGameOverAction(prev: GameType, payload: GameOverPayloadType) {
  return {
    ...prev,
    game: {
      ...prev.game,
      isPlaying: false,
      ranking: [...payload.ranking],
    },
  };
}

function handleEmoticonAction(prev: GameType, payload: EmoticonPayloadType) {
  const { playerId, name } = payload;

  return {
    ...prev,
    players: prev.players.map((player) => {
      if (player.playerId !== playerId) {
        return player;
      }

      return {
        ...player,
        emote: {
          name: name,
          isActive: true,
        },
      };
    }),
  };
}
