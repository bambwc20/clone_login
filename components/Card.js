import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Card() {
  return (
    <View style={styles.container}>
      <Text style={styles.baseText}>Card</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  baseText: {
    fontWeight: "bold",
    fontSize: 40,
  },
  innerText: {
    color: "red",
  },
});
export default Card;
