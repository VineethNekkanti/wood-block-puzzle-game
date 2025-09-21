# 🧩 Wood Block Puzzle Game

A beautiful block puzzle game built with React Native, inspired by Block Puzzle - Wood Legend from оловоломка world studio.

## 🎮 Features

- **10x10 Grid**: Classic block puzzle gameplay
- **Drag & Drop**: Intuitive block placement with smooth animations
- **Wood Theme**: Beautiful brown color scheme with wood textures
- **Multiple Block Shapes**: Various tetris-like pieces (I, O, T, S, Z, J, L, and more)
- **Line Clearing**: Fill complete rows or columns to clear them
- **Scoring System**: Points and level progression
- **Cross-Platform**: Works on iOS, Android, and Web

## 🚀 Quick Start

### Web Version (Instant Play)
1. Open `web-preview.html` in your browser
2. Drag blocks to the grid to place them
3. Fill complete rows or columns to score points!

### Mobile Development
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npx expo start
   ```

3. Scan the QR code with Expo Go app on your phone

## 🎯 How to Play

1. **Drag blocks** from the bottom palette onto the 10x10 grid
2. **Fill complete rows or columns** to clear them and score points
3. **Watch your score and level** increase as you play
4. **Use the Reset button** to start a new game

## 🛠️ Technical Details

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **State Management**: React Context
- **Animations**: React Native Reanimated
- **Gestures**: React Native Gesture Handler
- **Styling**: StyleSheet with wood-themed colors

## 📱 Project Structure

```
src/
├── components/
│   ├── GameBoard.tsx      # Main game grid with touch handling
│   ├── GameHeader.tsx     # Score display and controls
│   ├── BlockPalette.tsx   # Draggable block selection area
│   └── BlockComponent.tsx # Individual block rendering
├── context/
│   └── GameContext.tsx    # Game state management
└── types/
    └── game.ts           # TypeScript type definitions
```

## 🎨 Game Mechanics

- **Block Shapes**: 10 different block types with unique colors
- **Placement Validation**: Blocks can only be placed in valid positions
- **Line Clearing**: Both rows and columns can be cleared
- **Scoring**: 100 points per line cleared, multiplied by current level
- **Level Progression**: Every 10 lines cleared increases the level

## 🌐 Deployment

The game can be deployed to:
- **Web**: Use the included `web-preview.html`
- **Mobile**: Build with Expo or React Native CLI
- **App Stores**: Use Expo Application Services (EAS)

## 🎮 Inspired By

This game is inspired by **Block Puzzle - Wood Legend** from оловоломка world studio, featuring the same wood-themed aesthetic and block puzzle mechanics.

## 📄 License

This project is open source and available under the MIT License.

---

**Enjoy playing the Wood Block Puzzle game!** 🎉