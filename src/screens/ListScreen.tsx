import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ListRenderItemInfo } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/route";
import { AuthContext } from "../utils/Auth";
import { Celebration } from "../models/Celebration";
import CelebrationCard from "../components/CelebrationCard";
import { CelebrationRepository } from "../repositories/celebration.repository";

export default function ListScreen() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser?.uid);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Add">>();
  const [celebrations, setCelebrations] = useState<Celebration[]>([]);

  useEffect(() => {
    (async() => {
      const celebrationRepository = new CelebrationRepository(currentUser!.uid!);
      const celebrationList = await celebrationRepository.getCelebrationList();
      setCelebrations(celebrationList);
    })();
  }, []);

  const _renderItem = (listRenderItemInfo: ListRenderItemInfo<Celebration>) => {
    return <CelebrationCard {...listRenderItemInfo.item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={celebrations}
        renderItem={_renderItem}
      />
      <Text onPress={() => navigation.navigate("Add")}>記念日を追加</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
