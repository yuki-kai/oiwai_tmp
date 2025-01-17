import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/route";
import { AuthContext } from "../utils/Auth";

export default function CalendarScreen() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser?.uid);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Add">>();

  return (
    <View style={styles.container}>
      <Text onPress={() => navigation.navigate("Add")}>記念日を追加</Text>
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
