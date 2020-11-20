import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Header from "./app/components/Header";
import GameOver from "./app/screens/GameOver";
import GameScreen from "./app/screens/GameScreen";
import StartGameScreen from "./app/screens/StartGameScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState();

  const [guessRounds, setGuessRounds] = useState(0);

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverhandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  };

  const startNewGame = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverhandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOver
        rounds={guessRounds}
        userChoice={userNumber}
        onRestart={startNewGame}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
