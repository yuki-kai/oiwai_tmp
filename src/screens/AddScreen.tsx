import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AddScreen() {
  return (
    <View style={styles.container}>
      <Text>追加画面</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
