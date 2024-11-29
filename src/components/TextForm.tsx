import { Text, StyleSheet, View, TextInput } from "react-native";

type Props = {
  label: string;
  value: string;
	onChangeText: (value: string) => void;
  placeholder?: string;
};

export default function TextForm(props: Props) {
	const { label, placeholder, onChangeText } = props;

	return (
		<View style={styles.container}>
			<Text style={styles.label}>{ label }</Text>
			<TextInput
				style={styles.input}
				placeholder={ placeholder ?? "入力してください" }
				onChangeText={(value: string) => onChangeText(value)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		paddingVertical: 8,
		paddingHorizontal: 20,
	},
	label: {
    fontSize: 12,
    marginBottom: 2,
  },
  input: {
    borderColor: '#969696',
    borderWidth: 1,
		paddingVertical: 12,
		paddingHorizontal: 8,
    borderRadius: 4,
  },
});
  