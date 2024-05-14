import { MutableRefObject } from 'react';

export type GameType = {
  game: GameInfoType;
  players: PlayerType[];
  stocks: StockType[];
};

export type GameActionType =
  | { type: 'start'; payload: StartPayloadType }
  | { type: 'endTurn'; payload: EndTurnPayloadType }
  | { type: 'dice'; payload: DicePayloadType }
  | { type: 'enter'; payload: EnterPayloadType[] }
  | { type: 'ready'; payload: ReadyPayloadType }
  | { type: 'userStatusBoard'; payload: UserStatusPayloadType }
  | { type: 'cell'; payload: CellPayloadType }
  | { type: 'statusBoard'; payload: StatusBoardPayloadType }
  | { type: 'events'; payload: EventsPayloadType }
  | { type: 'eventResult'; payload: EventResultPayloadType }
  | { type: 'goldCard'; payload: GoldCardPayloadType }
  | { type: 'prisonDice'; payload: PrisonDicePayloadType }
  | { type: 'teleport'; payload: TeleportPayloadType }
  | { type: 'gameOver'; payload: GameOverPayloadType }
  | { type: 'currentPlayer'; payload: CurrentPlayerPayloadType }
  | { type: 'locations'; payload: LocationsPayloadType[] }
  | { type: 'emoticon'; payload: EmoticonPayloadType };

export type GameInfoType = {
  isPlaying: boolean;
  firstPlayerId: string;
  currentPlayerId: string | null;
  dice: number[];
  timer: number;
  eventList: RouletteEvent[];
  eventResult: string;
  isMoveFinished: boolean;
  teleportPlayerId: string;
  teleportLocation: number | null;
  goldCardInfo: {
    cardType: string;
    title: string;
    description: string;
  };
  ranking: PlayerRankingType[];
};

export type StartPayloadType = {
  playerId: string;
};

export type EndTurnPayloadType = {
  nextPlayerId: string;
  nextPlayerStatus: { type: string; count?: number };
};

export type DicePayloadType = {
  dice1: number;
  dice2: number;
};

export type PlayerType = {
  playerId: string;
  order: number;
  position: PlayerCardPositionType;
  isReady: boolean;
  location: number;
  userStatusBoard: UserStatusType;
  gameBoard: GameBoardType;
  emote: EmoteType;
};

type PlayerCardPositionType = 'top' | 'bottom';

type UserStatusType = {
  cashAsset: number;
  stockAsset: number;
  totalAsset: number;
  stockList: Pick<StockType, 'name' | 'quantity'>[];
};

export type GameBoardType = {
  ref: MutableRefObject<HTMLDivElement | null> | null;
  status: PlayerStatusType;
  location: number;
  direction: DirectionType;
  coordinates: { x: number; y: number };
  hasEscaped: boolean;
};

type EmoteType = {
  isActive: boolean;
  name: EmoteNameType | '';
};

export type EmoteNameType =
  | 'hi'
  | 'angry'
  | 'laugh'
  | 'cry'
  | 'celebrate'
  | 'clock';

export type EnterPayloadType = {
  order: number;
  playerId: string;
  isReady: boolean;
};

export type ReadyPayloadType = {
  playerId: string;
  isReady: boolean;
};

export type UserStatusPayloadType = {
  playerId: string;
  userStatusBoard: UserStatusType;
};

export type CellPayloadType = {
  playerId: string;
  location: number;
};

export type EventsPayloadType = {
  timer: number;
  events: RouletteEvent[];
};

export type EventResultPayloadType = {
  name: string;
};

export type StockType = {
  logo: string;
  name: string;
  theme: string;
  quantity: number;
  price: number;
  location: number;
};

export type StatusBoardPayloadType = {
  stockStatusBoard: Omit<StockType, 'logo'>[];
};

export type RouletteEvent = {
  title: string;
  content: string;
  impact: string;
};

export type PlayerStatusType = 'default' | 'prison' | 'teleport';

export type GoldCardPayloadType = {
  cardType: string;
  title: string;
  description: string;
};

export type DirectionType = 'top' | 'right' | 'bottom' | 'left';

export type PlayerTokenAtom = {
  location: number;
  direction: DirectionType;
  coordinates: { x: number; y: number };
};

export type PrisonDicePayloadType = {
  playerId: string;
  dice1: number;
  dice2: number;
  hasEscaped: boolean;
};

export type TeleportPayloadType = {
  playerId: string;
  location: number;
};

export type GameOverPayloadType = {
  ranking: PlayerRankingType[];
};

export type PlayerRankingType = {
  playerId: string;
  totalAsset: number;
};

export type CurrentPlayerPayloadType = {
  playerId: string;
};

export type LocationsPayloadType = {
  playerId: string;
  location: number;
};

export type EmoticonPayloadType = {
  playerId: string;
  name: EmoteNameType;
};
