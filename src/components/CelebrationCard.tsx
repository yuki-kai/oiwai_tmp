import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  dayName: string,
	date: Date,
};

export default function CelebrationCard(props: Props) {
	const { dayName, date } = props;

  return (
    <TouchableOpacity
			style={styles.celebrationCard}
			onPress={() => console.log("詳細画面へ遷移")}
		>
			<View>
      	<Text style={styles.celebrationTitle}>{ dayName }</Text>
      	<Text style={styles.celebrationDate}>{ date .toDateString() }</Text>
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
