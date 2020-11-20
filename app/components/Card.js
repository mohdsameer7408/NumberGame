import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: colors.white,
    elevation: 8,
    padding: 20,
    borderRadius: 10,
  },
});

export default Card;
