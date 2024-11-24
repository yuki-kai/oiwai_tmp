import { Text, StyleSheet, View } from "react-native";

type Props = {
  label: string;
  value: string;
};

export default function TextConfirm(props: Props) {
	const { label, value } = props;

	return (
		<View style={styles.textConfirmWrapper}>
			<Text style={styles.label}>{ label }</Text>
			<Text style={styles.value}>{ value }</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	textConfirmWrapper: {
		backgroundColor: "#f8f8fa",
		paddingVertical: 8,
		paddingHorizontal: 20,
	},
	label: {
    fontSize: 12,
    marginBottom: 2,
  },
  value: {
		backgroundColor: "#fff",
    borderColor: '#969696',
		paddingVertical: 12,
		paddingHorizontal: 8,
		textAlign: "left",
  },
});
  