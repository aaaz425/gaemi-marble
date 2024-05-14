import { RoomInfo } from '@store/type';
import { atom, useAtomValue, useSetAtom } from 'jotai';

const playerIdAtom = atom(localStorage.getItem('playerId') || '');
const accessTokenAtom = atom(localStorage.getItem('accessToken') || '');
const refreshTokenAtom = atom(localStorage.getItem('refreshToken') || '');
export const gameRoomsAtom = atom<RoomInfo[]>([]);

const playerIdAtomWithStorage = atom(
  (get) => get(playerIdAtom),
  (_, set, newPlayerId: string) => {
    set(playerIdAtom, newPlayerId);
    localStorage.setItem('playerId', newPlayerId);
  }
);
const accessTokenAtomWithStorage = atom(
  (get) => get(accessTokenAtom),
  (_, set, newAccessToken: string) => {
    set(accessTokenAtom, newAccessToken);
    localStorage.setItem('accessToken', newAccessToken);
  }
);
const refreshTokenAtomWithStorage = atom(
  (get) => get(refreshTokenAtom),
  (_, set, newRefreshToken: string) => {
    set(refreshTokenAtom, newRefreshToken);
    localStorage.setItem('refreshToken', newRefreshToken);
  }
);

export const useAuth = () => useAtomValue(accessTokenAtom);
export const usePlayerIdValue = () => useAtomValue(playerIdAtom);
export const useGameRoomsValue = () => useAtomValue(gameRoomsAtom);

export const useSetPlayer = () => useSetAtom(playerIdAtomWithStorage);
export const useSetAccessToken = () => useSetAtom(accessTokenAtomWithStorage);
export const useSetRefreshToken = () => useSetAtom(refreshTokenAtomWithStorage);
export const useSetGameRooms = () => useSetAtom(gameRoomsAtom);
