import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useGame } from '../context/GameContext';

const { width: screenWidth } = Dimensions.get('window');
const BOARD_SIZE = Math.min(screenWidth - 40, 350);
const CELL_SIZE = BOARD_SIZE / 10;

const GameBoard: React.FC = () => {
  const { gameState } = useGame();

  const renderCell = (row: number, col: number) => {
    const isFilled = gameState.grid[row][col] === 1;
    
    return (
      <View
        key={`${row}-${col}`}
        style={[
          styles.cell,
          isFilled && styles.filledCell,
        ]}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {gameState.grid.map((row, rowIndex) =>
          row.map((_, colIndex) => renderCell(rowIndex, colIndex))
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  board: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    backgroundColor: '#DEB887', // Burlywood
    borderRadius: 10,
    padding: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#8B4513',
  },
  cell: {
    width: CELL_SIZE - 1,
    height: CELL_SIZE - 1,
    backgroundColor: '#F5DEB3', // Wheat
    borderWidth: 0.5,
    borderColor: '#DEB887',
    position: 'absolute',
  },
  filledCell: {
    backgroundColor: '#8B4513', // Saddle brown
    borderColor: '#654321',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
});

export default GameBoard;
