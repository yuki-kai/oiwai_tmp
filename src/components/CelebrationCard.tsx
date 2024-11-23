import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/route";
import { CelebrationDto } from "../types/celebration";

export default function CelebrationCard({ celebration }: { celebration: CelebrationDto }) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Detail">>();

  return (
    <TouchableOpacity
			style={styles.celebrationCard}
			onPress={() => console.log("詳細画面へ遷移")}
		>
			<View>
      	<Text style={styles.celebrationTitle}>{ celebration.dayName }</Text>
      	<Text style={styles.celebrationDate}>{ celebration.date.toString() }</Text>
			</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  celebrationCard: {
    backgroundColor: "#ffffff",
		flexDirection: "row",
    justifyContent: "space-between",
		paddingVertical: 16,
		paddingHorizontal: 19,
    alignItems: "center",
		borderBottomWidth: 1,
		borderColor: "rgba(0,0,0,0.15)",
  },
	celebrationTitle: {
		fontSize: 16,
		lineHeight: 32,
	},
	celebrationDate: {
		fontSize: 12,
		lineHeight: 16,
		color: "#848484",
	},
});
