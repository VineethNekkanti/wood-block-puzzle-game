import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useGame } from '../context/GameContext';
import { Block } from '../types/game';
import BlockComponent from './BlockComponent';

const { width: screenWidth } = Dimensions.get('window');
const PALETTE_WIDTH = screenWidth - 20;
const BLOCK_SIZE = 25;

const BlockPalette: React.FC = () => {
  const { gameState, placeBlock } = useGame();
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);

  const handleBlockPress = (block: Block) => {
    setSelectedBlock(block);
  };

  const handleGridPress = (row: number, col: number) => {
    if (selectedBlock) {
      const success = placeBlock(selectedBlock, { x: col, y: row });
      if (success) {
        setSelectedBlock(null);
      }
    }
  };

  const renderBlock = (block: Block, index: number) => {
    const isSelected = selectedBlock?.id === block.id;
    
    return (
      <TouchableOpacity
        key={block.id}
        style={[
          styles.blockContainer,
          isSelected && styles.selectedBlock,
        ]}
        onPress={() => handleBlockPress(block)}
      >
        <BlockComponent block={block} size={BLOCK_SIZE} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.palette}>
        {gameState.currentBlocks.map((block, index) => renderBlock(block, index))}
      </View>
      {selectedBlock && (
        <View style={styles.instructions}>
          <Text style={styles.instructionText}>
            Tap on the grid to place the selected block
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  palette: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#A0522D', // Saddle brown
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#8B4513',
  },
  blockContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
  },
  selectedBlock: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: '#FFF8DC',
  },
  instructions: {
    alignItems: 'center',
    marginTop: 10,
  },
  instructionText: {
    color: '#FFF8DC',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default BlockPalette;
