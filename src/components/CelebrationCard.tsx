import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/route";
import { CelebrationDto } from "../types/celebration";

function CelebrationCard({ celebration }: { celebration: CelebrationDto }) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Detail">>();

  return (
    <TouchableOpacity
			style={styles.celebrationCard}
			onPress={() => navigation.navigate("Detail", { celebration })}
		>
			<View>
      	<Text style={styles.celebrationTitle}>{ celebration.dayName }</Text>
      	<Text style={styles.celebrationDate}>{ celebration.date }</Text>
			</View>
    </TouchableOpacity>
  );
}

function ListEmptyCard() {
  return (
		<View>
			<Text style={styles.listEmptyCard}>表示するお祝いがありません。</Text>
			<Text style={styles.listEmptyCard}>記念日を追加してみましょう！</Text>
		</View>
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
	listEmptyCard: {
		textAlign: "center",
		fontSize: 16,
		lineHeight: 32,
	},
});

export { CelebrationCard, ListEmptyCard };
