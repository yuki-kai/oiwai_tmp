import React, { useLayoutEffect } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Button, StyleSheet, View } from "react-native";
import { RootStackParamList } from "../types/route";
import TextConfirm from "../components/TextConfirm";
import { StackNavigationProp } from "@react-navigation/stack";

export default function DetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "Detail">>();
  const { dayName, date } = route.params.celebration;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Edit">>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="更新"
          onPress={() => navigation.navigate("Edit", { celebration: route.params.celebration })}
        />
      ),
    });
  }, []);

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
