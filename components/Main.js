import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Main() {
  return (
    <View style={styles.container}>
      <Text style={styles.baseText}>Main</Text>
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
export default Main;
