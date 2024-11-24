import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "../types/route";
import TextConfirm from "../components/TextConfirm";

export default function DetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "Detail">>();
  const { dayName, date } = route.params.celebration;

  return (
    <View style={styles.container}>
      <TextConfirm label="お祝いする日" value={ dayName } />
      <TextConfirm label="年月日" value={ date.toString() } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
