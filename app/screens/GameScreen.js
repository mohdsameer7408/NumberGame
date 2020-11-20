import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  FlatList,
  Dimensions,
} from "react-native";
import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";
import Colors from "../config/colors";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNumber;
  }
};

const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [guess, setGuess] = useState(initialGuess);

  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const updateLayout = () => {
      setWindowHeight(Dimensions.get("window").height);
    };

    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  }, []);

  useEffect(() => {
    if (guess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [guess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && guess < props.userChoice) ||
      (direction === "greater" && guess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = guess;
    } else {
      currentLow.current = guess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      guess
    );

    setGuess(nextNumber);
    setPastGuesses((currentGuesses) => [nextNumber, ...currentGuesses]);
  };

  if (windowHeight < 600) {
    return (
      <View style={styles.screen}>
        <Text>Opponent's Guess</Text>
        <View style={styles.control}>
          <Button title="LOWER" onPress={() => nextGuessHandler("lower")} />
          <NumberContainer>{guess}</NumberContainer>
          <Button title="GREATER" onPress={() => nextGuessHandler("greater")} />
        </View>
        <View style={styles.listItems}>
          <FlatList
            contentContainerStyle={styles.flatListStyle}
            keyExtractor={(item) => item.toString()}
            data={pastGuesses}
            renderItem={(pastGuess) => (
              <View style={styles.guessContainer}>
                <Text style={styles.guessText}>
                  #{pastGuesses.length - pastGuess.index}
                </Text>
                <Text style={styles.guessText}>{pastGuess.item}</Text>
              </View>
            )}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{guess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={() => nextGuessHandler("lower")} />
        <Button title="GREATER" onPress={() => nextGuessHandler("greater")} />
      </Card>
      <View style={styles.listItems}>
        <FlatList
          contentContainerStyle={styles.flatListStyle}
          keyExtractor={(item) => item.toString()}
          data={pastGuesses}
          renderItem={(pastGuess) => (
            <View style={styles.guessContainer}>
              <Text style={styles.guessText}>
                #{pastGuesses.length - pastGuess.index}
              </Text>
              <Text style={styles.guessText}>{pastGuess.item}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  control: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
    width: 300,
    maxWidth: "80%",
  },
  listItems: {
    flex: 1,
    width: Dimensions.get("window").width > 350 ? "60%" : "80%",
    marginVertical: 20,
  },
  flatListStyle: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  guessContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  guessText: {
    color: Colors.accentColor,
  },
});

export default GameScreen;
