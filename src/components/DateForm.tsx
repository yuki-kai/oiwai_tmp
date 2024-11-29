import React from "react";
import { Text, StyleSheet, View } from "react-native";
import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

type Props = {
  label: string;
  value: Date;
	onChangeDate: (event: DateTimePickerEvent, selectedDate: Date | undefined) => void;
};

export default function DateForm(props: Props) {
	const { label, value, onChangeDate } = props;

	return (
		<View style={styles.container}>
			<Text style={styles.label}>{ label }</Text>
			<DateTimePicker
				style={styles.input}
				value={value}
				display="spinner"
				locale="ja-JP"
				onChange={onChangeDate}
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
    borderRadius: 4,
  },
});
  