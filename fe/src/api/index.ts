import { API_END_POINT } from './constants';
import { fetcher } from './fetcher';

export const postSignup = async (playerId: string, password: string) => {
  const res = await fetcher.post(API_END_POINT.SIGNUP, {
    playerId,
    password,
  });

  return res;
};

export const postSignin = async (playerId: string, password: string) => {
  const res = await fetcher.post(API_END_POINT.SIGNIN, {
    playerId,
    password,
  });

  return res;
};

export const postLogout = async () => {
  const res = await fetcher.post(API_END_POINT.LOGOUT);
  return res;
};

export const postCreateRoom = async () => {
  const res = await fetcher.post(API_END_POINT.GAMES);
  return res;
};

export const getGameCheck = async (gameId: string) => {
  const res = await fetcher.get(`${API_END_POINT.GAMES}/${gameId}`);
  return res;
};

export const getGameRooms = async () => {
  const res = await fetcher.get(API_END_POINT.ROOMS);
  return res;
};
