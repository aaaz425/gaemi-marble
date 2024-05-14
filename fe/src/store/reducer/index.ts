import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { splitAtom } from 'jotai/utils';
import { focusAtom } from 'jotai-optics';
import { INITIAL_GAME_STATE } from './constants';
import { GameType } from './type';

export const gameAtom = atom<GameType>(INITIAL_GAME_STATE);
gameAtom.debugLabel = 'gameAtom';

export const gameInfoAtom = focusAtom(gameAtom, (optic) => optic.prop('game'));
gameInfoAtom.debugLabel = 'gameInfoAtom';

export const playersAtom = focusAtom(gameAtom, (optic) =>
  optic.prop('players')
);
playersAtom.debugLabel = 'playersAtom';

export const stocksAtom = focusAtom(gameAtom, (optic) => optic.prop('stocks'));
stocksAtom.debugLabel = 'stocksAtom';

export const playerAtomsAtom = splitAtom(playersAtom);

const resetGoldCardAtom = atom(null, (_get, set) => {
  set(gameInfoAtom, (prev) => {
    return {
      ...prev,
      goldCardInfo: { cardType: '', title: '', description: '' },
    };
  });
});

const resetEventRoundAtom = atom(null, (_get, set) => {
  set(gameInfoAtom, (prev) => {
    return {
      ...prev,
      dice: [0, 0],
      eventList: [],
      eventResult: '',
      currentPlayerId: prev.firstPlayerId,
    };
  });
});

const setTeleportLocationAtom = atom(null, (_get, set, location: number) => {
  set(gameInfoAtom, (prev) => {
    return {
      ...prev,
      teleportLocation: location,
    };
  });
});

const resetTeleportAtom = atom(null, (_get, set) => {
  set(gameInfoAtom, (prev) => {
    return {
      ...prev,
      teleportPlayerId: '',
      teleportLocation: null,
    };
  });
});

const resetPlayerEmoteAtom = atom(null, (_get, set, playerId: string) => {
  set(playersAtom, (prev) => {
    return prev.map((player) => {
      if (player.playerId === playerId) {
        return {
          ...player,
          emote: {
            isActive: false,
            name: '',
          },
        };
      }
      return player;
    });
  });
});

const timerAtom = focusAtom(gameInfoAtom, (optic) => optic.prop('timer'));
export const useRouletteTimer = () => useAtom(timerAtom);

export const useGameInfo = () => useAtom(gameInfoAtom);
export const usePlayers = () => useAtom(playersAtom);

export const useGameValue = () => useAtomValue(gameAtom);
export const useGameInfoValue = () => useAtomValue(gameInfoAtom);
export const usePlayersValue = () => useAtomValue(playersAtom);
export const useStocksValue = () => useAtomValue(stocksAtom);

export const useSetGame = () => useSetAtom(gameAtom);
export const useSetGameInfo = () => useSetAtom(gameInfoAtom);
export const useSetPlayers = () => useSetAtom(playersAtom);

export const useSetTeleportLocation = () => useSetAtom(setTeleportLocationAtom);
export const useResetTeleportStatus = () => useSetAtom(resetTeleportAtom);
export const useResetGoldCard = () => useSetAtom(resetGoldCardAtom);
export const useResetEventRound = () => useSetAtom(resetEventRoundAtom);
export const useResetPlayerEmote = () => useSetAtom(resetPlayerEmoteAtom);
