import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ListRenderItemInfo } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/route";
import { AuthContext } from "../utils/Auth";
import { Celebration } from "../models/Celebration";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import CelebrationCard from "../components/CelebrationCard";

export default function ListScreen() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser?.uid);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Add">>();
  const [celebrations, setCelebrations] = useState<Celebration[]>([]);

  useEffect(() => {
    (async() => {
      const collectionRef = collection(db, `users/${currentUser!.uid!}/celebrations`);
      const snapshot = await getDocs(collectionRef);
      const celebrationList: Celebration[] = snapshot.docs.map((doc) => {
        // TODO: repository で取得して Timestamp と Date の変換も取得時に行う
        return Celebration.create(currentUser!.uid, {
          dayName: doc.data().dayName,
          date: doc.data().date.toDate(),
        });
      });
      setCelebrations(celebrationList);
    })();
  }, []);

  const _renderItem = (listRenderItemInfo: ListRenderItemInfo<Celebration>) => {
    return <CelebrationCard {...listRenderItemInfo.item.toDto()} />;
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
