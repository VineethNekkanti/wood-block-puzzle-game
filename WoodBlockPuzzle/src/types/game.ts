export interface Position {
  x: number;
  y: number;
}

export interface Block {
  id: string;
  shape: number[][];
  color: string;
  position: Position;
}

export interface GameState {
  grid: number[][];
  score: number;
  level: number;
  linesCleared: number;
  gameOver: boolean;
  currentBlocks: Block[];
  nextBlocks: Block[];
}

export interface GameContextType {
  gameState: GameState;
  placeBlock: (block: Block, position: Position) => boolean;
  clearLines: () => void;
  resetGame: () => void;
  generateNewBlocks: () => void;
}

export const BLOCK_SHAPES = {
  I: [[1, 1, 1, 1]],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
  ],
  DOT: [[1]],
  SMALL_L: [
    [1, 0],
    [1, 1],
  ],
  SMALL_T: [
    [1, 1, 1],
  ],
};

export const BLOCK_COLORS = {
  I: '#FF6B6B',
  O: '#4ECDC4',
  T: '#45B7D1',
  S: '#96CEB4',
  Z: '#FFEAA7',
  J: '#DDA0DD',
  L: '#98D8C8',
  DOT: '#F7DC6F',
  SMALL_L: '#BB8FCE',
  SMALL_T: '#85C1E9',
};
