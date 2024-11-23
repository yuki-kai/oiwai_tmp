import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/route";
import { AuthContext } from "../utils/Auth";
import CelebrationCard from "../components/CelebrationCard";
import { CelebrationRepository } from "../repositories/celebration.repository";
import { CelebrationDto } from "../types/celebration";

export default function ListScreen() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser?.uid);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Add">>();
  const [celebrations, setCelebrations] = useState<CelebrationDto[]>([]);

  useEffect(() => {
    (async() => {
      const celebrationRepository = new CelebrationRepository(currentUser!.uid!);
      const celebrationList = await celebrationRepository.getCelebrationList();
      setCelebrations(celebrationList);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={celebrations}
        renderItem={({ item }: { item: CelebrationDto }) => (
          <CelebrationCard celebration={ item } />
        )}
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
