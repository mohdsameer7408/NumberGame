import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import colors from "../config/colors";

const GameOver = (props) => {
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

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View
        style={{
          ...styles.screen,
          flexDirection: windowHeight < 600 ? "row" : "column",
        }}
      >
        <Image
          style={styles.gameOverImage}
          source={{
            uri:
              "https://image.freepik.com/free-vector/glitch-game-background_23-2148090006.jpg",
          }}
        />

        <View
          style={{
            ...styles.gameOvercontainer,
            flex: windowHeight < 600 ? 0.3 : 0.2,
          }}
        >
          <Text style={styles.gameText}>Game summary!</Text>
          <Text>Number of rounds: {props.rounds}</Text>
          <Text>Number was: {props.userChoice}</Text>
          <Button title="New Game" onPress={props.onRestart} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  screen: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  gameOverImage: {
    resizeMode: "contain",
    flex: 0.5,
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: 10,
  },
  gameOvercontainer: {
    flex: 0.2,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
  },
  gameText: {
    fontSize: 23,
  },
});

export default GameOver;
