import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Block } from '../types/game';

interface BlockComponentProps {
  block: Block;
  size: number;
}

const BlockComponent: React.FC<BlockComponentProps> = ({ block, size }) => {
  const renderCell = (row: number, col: number) => {
    const isFilled = block.shape[row] && block.shape[row][col] === 1;
    
    if (!isFilled) return null;
    
    return (
      <View
        key={`${row}-${col}`}
        style={[
          styles.cell,
          {
            width: size,
            height: size,
            backgroundColor: block.color,
            left: col * size,
            top: row * size,
          },
        ]}
      />
    );
  };

  const blockWidth = block.shape[0]?.length || 0;
  const blockHeight = block.shape.length;

  return (
    <View
      style={[
        styles.container,
        {
          width: blockWidth * size,
          height: blockHeight * size,
        },
      ]}
    >
      {block.shape.map((row, rowIndex) =>
        row.map((_, colIndex) => renderCell(rowIndex, colIndex))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  cell: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 2,
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

export default BlockComponent;
