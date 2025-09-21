import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState, GameContextType, Block, Position, BLOCK_SHAPES, BLOCK_COLORS } from '../types/game';

const GRID_WIDTH = 10;
const GRID_HEIGHT = 10;

const initialState: GameState = {
  grid: Array(GRID_HEIGHT).fill(null).map(() => Array(GRID_WIDTH).fill(0)),
  score: 0,
  level: 1,
  linesCleared: 0,
  gameOver: false,
  currentBlocks: [],
  nextBlocks: [],
};

type GameAction =
  | { type: 'PLACE_BLOCK'; payload: { block: Block; position: Position } }
  | { type: 'CLEAR_LINES' }
  | { type: 'RESET_GAME' }
  | { type: 'GENERATE_BLOCKS' }
  | { type: 'SET_GRID'; payload: number[][] };

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'PLACE_BLOCK': {
      const { block, position } = action.payload;
      const newGrid = state.grid.map(row => [...row]);
      
      // Check if block can be placed
      for (let y = 0; y < block.shape.length; y++) {
        for (let x = 0; x < block.shape[y].length; x++) {
          if (block.shape[y][x]) {
            const gridX = position.x + x;
            const gridY = position.y + y;
            
            if (gridX < 0 || gridX >= GRID_WIDTH || gridY < 0 || gridY >= GRID_HEIGHT) {
              return state; // Invalid placement
            }
            
            if (newGrid[gridY][gridX] !== 0) {
              return state; // Space already occupied
            }
          }
        }
      }
      
      // Place the block
      for (let y = 0; y < block.shape.length; y++) {
        for (let x = 0; x < block.shape[y].length; x++) {
          if (block.shape[y][x]) {
            const gridX = position.x + x;
            const gridY = position.y + y;
            newGrid[gridY][gridX] = 1;
          }
        }
      }
      
      return {
        ...state,
        grid: newGrid,
        currentBlocks: state.currentBlocks.filter(b => b.id !== block.id),
      };
    }
    
    case 'CLEAR_LINES': {
      const newGrid = [...state.grid];
      let linesToClear = 0;
      
      // Find complete lines
      for (let y = 0; y < GRID_HEIGHT; y++) {
        if (newGrid[y].every(cell => cell === 1)) {
          newGrid.splice(y, 1);
          newGrid.unshift(Array(GRID_WIDTH).fill(0));
          linesToClear++;
        }
      }
      
      const newScore = state.score + linesToClear * 100 * state.level;
      const newLinesCleared = state.linesCleared + linesToClear;
      const newLevel = Math.floor(newLinesCleared / 10) + 1;
      
      return {
        ...state,
        grid: newGrid,
        score: newScore,
        linesCleared: newLinesCleared,
        level: newLevel,
      };
    }
    
    case 'RESET_GAME':
      return {
        ...initialState,
        currentBlocks: generateRandomBlocks(),
        nextBlocks: generateRandomBlocks(),
      };
    
    case 'GENERATE_BLOCKS':
      return {
        ...state,
        currentBlocks: state.nextBlocks,
        nextBlocks: generateRandomBlocks(),
      };
    
    case 'SET_GRID':
      return {
        ...state,
        grid: action.payload,
      };
    
    default:
      return state;
  }
};

const generateRandomBlocks = (): Block[] => {
  const shapes = Object.keys(BLOCK_SHAPES);
  const blocks: Block[] = [];
  
  for (let i = 0; i < 3; i++) {
    const shapeKey = shapes[Math.floor(Math.random() * shapes.length)] as keyof typeof BLOCK_SHAPES;
    blocks.push({
      id: `${shapeKey}_${Date.now()}_${i}`,
      shape: BLOCK_SHAPES[shapeKey],
      color: BLOCK_COLORS[shapeKey],
      position: { x: 0, y: 0 },
    });
  }
  
  return blocks;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, {
    ...initialState,
    currentBlocks: generateRandomBlocks(),
    nextBlocks: generateRandomBlocks(),
  });

  const placeBlock = (block: Block, position: Position): boolean => {
    const result = dispatch({ type: 'PLACE_BLOCK', payload: { block, position } });
    
    // Check if placement was successful by comparing grids
    const newGrid = gameState.grid.map(row => [...row]);
    for (let y = 0; y < block.shape.length; y++) {
      for (let x = 0; x < block.shape[y].length; x++) {
        if (block.shape[y][x]) {
          const gridX = position.x + x;
          const gridY = position.y + y;
          if (gridX >= 0 && gridX < GRID_WIDTH && gridY >= 0 && gridY < GRID_HEIGHT) {
            newGrid[gridY][gridX] = 1;
          }
        }
      }
    }
    
    dispatch({ type: 'SET_GRID', payload: newGrid });
    dispatch({ type: 'CLEAR_LINES' });
    
    // Generate new blocks if current blocks are empty
    if (gameState.currentBlocks.length === 1) {
      dispatch({ type: 'GENERATE_BLOCKS' });
    }
    
    return true;
  };

  const clearLines = () => {
    dispatch({ type: 'CLEAR_LINES' });
  };

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  const generateNewBlocks = () => {
    dispatch({ type: 'GENERATE_BLOCKS' });
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        placeBlock,
        clearLines,
        resetGame,
        generateNewBlocks,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
