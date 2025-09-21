import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useGame } from '../context/GameContext';

const GameHeader: React.FC = () => {
  const { gameState, resetGame } = useGame();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Wood Block Puzzle</Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Score</Text>
          <Text style={styles.statValue}>{gameState.score}</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Level</Text>
          <Text style={styles.statValue}>{gameState.level}</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Lines</Text>
          <Text style={styles.statValue}>{gameState.linesCleared}</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#A0522D', // Saddle brown
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF8DC', // Cornsilk
    textShadowColor: '#8B4513',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#DEB887', // Burlywood
    fontWeight: '600',
  },
  statValue: {
    fontSize: 16,
    color: '#FFF8DC',
    fontWeight: 'bold',
    marginTop: 2,
  },
  resetButton: {
    backgroundColor: '#CD853F', // Peru
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#8B4513',
  },
  resetButtonText: {
    color: '#FFF8DC',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default GameHeader;