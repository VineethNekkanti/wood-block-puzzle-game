import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GameProvider } from './src/context/GameContext';
import GameBoard from './src/components/GameBoard';
import GameHeader from './src/components/GameHeader';
import BlockPalette from './src/components/BlockPalette';

const App = (): JSX.Element => {
  return (
    <GameProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" backgroundColor="#8B4513" />
        <View style={styles.gameContainer}>
          <GameHeader />
          <GameBoard />
          <BlockPalette />
        </View>
      </SafeAreaView>
    </GameProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8B4513', // Dark wood color
  },
  gameContainer: {
    flex: 1,
    padding: 10,
  },
});

export default App;