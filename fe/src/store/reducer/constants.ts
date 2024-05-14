import { PlayerType } from './type';

const INITIAL_PLAYER: PlayerType[] = [
  {
    playerId: '',
    order: 1,
    position: 'top',
    isReady: false,
    location: 0,
    userStatusBoard: {
      cashAsset: 0,
      stockAsset: 0,
      totalAsset: 0,
      stockList: [],
    },
    gameBoard: {
      ref: null,
      status: 'default',
      location: 0,
      direction: 'top',
      coordinates: { x: 0, y: 0 },
      hasEscaped: true,
    },
    emote: {
      isActive: false,
      name: '',
    },
  },
  {
    playerId: '',
    order: 2,
    position: 'top',
    isReady: false,
    location: 0,
    userStatusBoard: {
      cashAsset: 0,
      stockAsset: 0,
      totalAsset: 0,
      stockList: [],
    },
    gameBoard: {
      ref: null,
      status: 'default',
      location: 0,
      direction: 'top',
      coordinates: { x: 0, y: 0 },
      hasEscaped: true,
    },
    emote: {
      isActive: false,
      name: '',
    },
  },
  {
    playerId: '',
    order: 3,
    position: 'bottom',
    isReady: false,
    location: 0,
    userStatusBoard: {
      cashAsset: 0,
      stockAsset: 0,
      totalAsset: 0,
      stockList: [],
    },
    gameBoard: {
      ref: null,
      status: 'default',
      location: 0,
      direction: 'top',
      coordinates: { x: 0, y: 0 },
      hasEscaped: true,
    },
    emote: {
      isActive: false,
      name: '',
    },
  },
  {
    playerId: '',
    order: 4,
    position: 'bottom',
    isReady: false,
    location: 0,
    userStatusBoard: {
      cashAsset: 0,
      stockAsset: 0,
      totalAsset: 0,
      stockList: [],
    },
    gameBoard: {
      ref: null,
      status: 'default',
      location: 0,
      direction: 'top',
      coordinates: { x: 0, y: 0 },
      hasEscaped: true,
    },
    emote: {
      isActive: false,
      name: '',
    },
  },
];

const INITIAL_STOCK = [
  {
    logo: 'codesquad',
    name: '코드스쿼드',
    theme: 'it',
    quantity: 0,
    price: 0,
    location: 1,
  },
  {
    logo: 'musinsa',
    name: '무신사',
    theme: 'fashion',
    quantity: 0,
    price: 0,
    location: 2,
  },
  {
    logo: 'hanatour',
    name: '하나투어',
    theme: 'trip',
    quantity: 0,
    price: 0,
    location: 3,
  },
  {
    logo: 'gs',
    name: 'GS건설',
    theme: 'construction',
    quantity: 0,
    price: 0,
    location: 4,
  },
  {
    logo: 'nongshim',
    name: '농심',
    theme: 'food',
    quantity: 0,
    price: 0,
    location: 5,
  },
  {
    logo: 'hyundai',
    name: '현대건설',
    theme: 'construction',
    quantity: 0,
    price: 0,
    location: 7,
  },
  {
    logo: 'hanwha',
    name: '한화디펜스',
    theme: 'military',
    quantity: 0,
    price: 0,
    location: 8,
  },
  {
    logo: 'koreanair',
    name: '대한항공',
    theme: 'trip',
    quantity: 0,
    price: 0,
    location: 10,
  },
  {
    logo: 'twitter',
    name: '트위터',
    theme: 'elonmusk',
    quantity: 0,
    price: 0,
    location: 11,
  },
  {
    logo: 'samsungbio',
    name: '삼성바이오',
    theme: 'pharmaceutical',
    quantity: 0,
    price: 0,
    location: 13,
  },
  {
    logo: 'google',
    name: '구글',
    theme: 'it',
    quantity: 0,
    price: 0,
    location: 14,
  },
  {
    logo: 'hermes',
    name: '에르메스',
    theme: 'fashion',
    quantity: 0,
    price: 0,
    location: 16,
  },
  {
    logo: 'mcdonalds',
    name: '맥도날드',
    theme: 'food',
    quantity: 0,
    price: 0,
    location: 17,
  },
  {
    logo: 'tesla',
    name: '테슬라',
    theme: 'elonmusk',
    quantity: 0,
    price: 0,
    location: 19,
  },
  {
    logo: 'pfizer',
    name: '화이자',
    theme: 'pharmaceutical',
    quantity: 0,
    price: 0,
    location: 20,
  },
  {
    logo: 'starkindustry',
    name: '스타크인더스트리',
    theme: 'military',
    quantity: 0,
    price: 0,
    location: 22,
  },
  {
    logo: 'apple',
    name: '애플',
    theme: 'it',
    quantity: 0,
    price: 0,
    location: 23,
  },
];

const INITIAL_GAME = {
  isPlaying: false,
  firstPlayerId: '',
  currentPlayerId: '',
  dice: [0, 0],
  timer: 0,
  eventList: [],
  eventResult: '',
  isMoveFinished: false,
  teleportPlayerId: '',
  teleportLocation: null,
  goldCardInfo: { cardType: '', title: '', description: '' },
  isArrived: false,
  ranking: [],
};

export const INITIAL_GAME_STATE = {
  game: INITIAL_GAME,
  players: INITIAL_PLAYER,
  stocks: INITIAL_STOCK,
};
