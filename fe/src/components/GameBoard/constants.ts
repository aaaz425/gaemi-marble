import { DirectionType, EmoteNameType } from '@store/reducer/type';

export const INITIAL_BOARD = [
  [
    { logo: 'start', name: '시작', location: 0 },
    { theme: 'it', logo: 'codesquad', name: '코드스쿼드', location: 1 },
    { theme: 'fashion', logo: 'musinsa', name: '무신사', location: 2 },
    { theme: 'trip', logo: 'hanatour', name: '하나투어', location: 3 },
    { theme: 'construction', logo: 'gs', name: 'GS건설', location: 4 },
    { theme: 'food', logo: 'nongshim', name: '농심', location: 5 },
  ],
  [
    { logo: 'jail', name: '유치장', location: 6 },
    {
      theme: 'construction',
      logo: 'hyundai',
      name: '현대건설',
      location: 7,
    },
    {
      theme: 'military',
      logo: 'hanwha',
      name: '한화디펜스',
      location: 8,
    },
    { logo: 'goldcard', name: '황금카드', location: 9 },
    { theme: 'trip', logo: 'koreanair', name: '대한항공', location: 10 },
    { theme: 'elonmusk', logo: 'twitter', name: '트위터', location: 11 },
  ],
  [
    { logo: 'goodnews', name: '호재', location: 12 },
    {
      theme: 'pharmaceutical',
      logo: 'samsungbio',
      name: '삼성바이오',
      location: 13,
    },
    { theme: 'it', logo: 'google', name: '구글', location: 14 },
    { logo: 'tax', name: '세금', location: 15 },
    { theme: 'fashion', logo: 'hermes', name: '에르메스', location: 16 },
    { theme: 'food', logo: 'mcdonalds', name: '맥도날드', location: 17 },
  ],
  [
    { logo: 'rocket', name: '순간이동', location: 18 },
    { theme: 'elonmusk', logo: 'tesla', name: '테슬라', location: 19 },
    {
      theme: 'pharmaceutical',
      logo: 'pfizer',
      name: '화이자',
      location: 20,
    },
    { logo: 'goldcard', name: '황금카드', location: 21 },
    {
      theme: 'military',
      logo: 'starkindustry',
      name: '스타크산업',
      location: 22,
    },
    { theme: 'it', logo: 'apple', name: '애플', location: 23 },
  ],
];

export const CELL = {
  WIDTH: 6,
  HEIGHT: 6,
};

export const CORNER_CELLS = [0, 6, 12, 18];
export const PRISON_CELL = 6;

export const DIRECTIONS = {
  top: { x: 0, y: -CELL.HEIGHT },
  right: { x: CELL.WIDTH, y: 0 },
  bottom: { x: 0, y: CELL.HEIGHT },
  left: { x: -CELL.HEIGHT, y: 0 },
};

export const DICE_MOVE_DELAY = 200;
export const EMOTE_DEBOUNCE_DELAY = 2000;

export const changeDirection = (direction: DirectionType) => {
  switch (direction) {
    case 'top':
      return 'right';
    case 'right':
      return 'bottom';
    case 'bottom':
      return 'left';
    case 'left':
      return 'top';
    default:
      return 'top';
  }
};

export const CELL_COORDINATES: { [key: number]: { x: number; y: number } } = {
  0: { x: 0, y: 0 },
  1: { x: 0, y: -6 },
  2: { x: 0, y: -12 },
  3: { x: 0, y: -18 },
  4: { x: 0, y: -24 },
  5: { x: 0, y: -30 },
  6: { x: 0, y: -36 },
  7: { x: 6, y: -36 },
  8: { x: 12, y: -36 },
  9: { x: 18, y: -36 },
  10: { x: 24, y: -36 },
  11: { x: 30, y: -36 },
  12: { x: 36, y: -36 },
  13: { x: 36, y: -30 },
  14: { x: 36, y: -24 },
  15: { x: 36, y: -18 },
  16: { x: 36, y: -12 },
  17: { x: 36, y: -6 },
  18: { x: 36, y: 0 },
  19: { x: 30, y: 0 },
  20: { x: 24, y: 0 },
  21: { x: 18, y: 0 },
  22: { x: 12, y: 0 },
  23: { x: 6, y: 0 },
};

export const LINE_1_CELLS = [0, 1, 2, 3, 4, 5];
export const LINE_2_CELLS = [6, 7, 8, 9, 10, 11];
export const LINE_3_CELLS = [12, 13, 14, 15, 16, 17];
export const LINE_4_CELLS = [18, 19, 20, 21, 22, 23];

export const EMOTE_LIST: EmoteNameType[] = [
  'hi',
  'angry',
  'laugh',
  'cry',
  'celebrate',
  'clock',
];
