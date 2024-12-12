import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/route";
import { AuthContext } from "../utils/Auth";
import { CelebrationCard, ListEmptyCard } from "../components/CelebrationCard";
import { CelebrationRepository } from "../repositories/celebration.repository";
import { CelebrationDto } from "../types/celebration";
import AddButton from "../components/AddButton";

export default function ListScreen() {
  const { currentUser } = useContext(AuthContext);
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Add">>();
  const [celebrations, setCelebrations] = useState<CelebrationDto[]>([]);
  // goBack でリダイレクトされた際に useEffect が発火しないため、useIsFocused を利用
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!currentUser) return;
    const celebrationRepository = new CelebrationRepository(currentUser.uid);
    celebrationRepository.getCelebrationList().then((celebrationList) => {
      setCelebrations(celebrationList);
    });
  }, [currentUser?.uid, isFocused]);

  const handleAddCelebration = (): void => {
    navigation.navigate("Add");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={celebrations}
        renderItem={({ item }: { item: CelebrationDto }) => (
          <CelebrationCard celebration={item} />
        )}
        ListEmptyComponent={<ListEmptyCard />}
      />
    <AddButton
      label="記念日を追加"
      handleButtonPress={handleAddCelebration}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
