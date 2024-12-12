import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Alert, StyleSheet, View } from "react-native";
import { RootStackParamList } from "../types/route";
import TextConfirm from "../components/TextConfirm";
import { StackNavigationProp } from "@react-navigation/stack";
import { IconButton, Menu } from "react-native-paper";
import useDeleteCelebration from "../hooks/useDeleteCelebration";
import { AuthContext } from "../utils/Auth";
import { CelebrationRepository } from "../repositories/celebration.repository";
import { CelebrationDto } from "../types/celebration";
import { Celebration } from "../models/Celebration";

export default function DetailScreen() {
  // TODO: read数増えるなら props で渡す
  const { currentUser } = useContext(AuthContext);
  const route = useRoute<RouteProp<RootStackParamList, "Detail">>();
  const { docId, dayName, date } = route.params.celebration;
  const [celebration, setCelebration] = useState<CelebrationDto>(
    Celebration.create({ docId, dayName, date })
  );
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Edit">>();
  const { deleteCelebration } = useDeleteCelebration();
  const [visible, setVisible] = useState(false);


  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const showAlert = () => {
    Alert.alert("このお祝いを削除しますか？", "この操作は取り消せません", [
      { text: "やめる", style: "cancel" },
      {
        text: "削除する",
        onPress: () => deleteCelebration(docId!),
      },
    ]);
  };

  useEffect(() => {
    if (!currentUser || !docId) return;
    const celebrationRepository = new CelebrationRepository(currentUser.uid);
    celebrationRepository.getCelebration(docId).then((celebration) => {
      setCelebration(celebration);
    });
  }, [dayName, date]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <IconButton
              icon="dots-horizontal"
              iconColor="white"
              size={24}
              onPress={openMenu}
            />
          }
        >
          <Menu.Item
            onPress={() => {
              navigation.navigate("Edit", {
                celebration: route.params.celebration,
              });
              closeMenu();
            }}
            title="更新"
          />
          <Menu.Item
            onPress={() => {
              showAlert();
              closeMenu();
            }}
            title="削除"
          />
        </Menu>
      ),
    });
  }, [visible]);

  return (
    <View style={styles.container}>
      <TextConfirm label="お祝いする日" value={ celebration.dayName } />
      <TextConfirm label="年月日" value={ celebration.date } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
