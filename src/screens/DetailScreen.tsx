import React, { useLayoutEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Alert, StyleSheet, View } from "react-native";
import { RootStackParamList } from "../types/route";
import TextConfirm from "../components/TextConfirm";
import { StackNavigationProp } from "@react-navigation/stack";
import { IconButton, Menu } from "react-native-paper";
import useDeleteCelebration from "../hooks/useDeleteCelebration";

export default function DetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "Detail">>();

  const { docId, dayName, date } = route.params.celebration;
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
      <TextConfirm label="お祝いする日" value={ dayName } />
      <TextConfirm label="年月日" value={ date } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
