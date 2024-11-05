import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import AddButton from "../components/AddButton";

export default function AddScreen() {
  const today = new Date();
  const [dayName, setDayName] = useState("");
  const [date, setDate] = useState(today);

  // 年月日変更時に呼ばれる
  const onDateChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    setDate(selectedDate || date);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Text>お祝いする日</Text>
          <TextInput
            style={styles.input}
            onChangeText={setDayName}
            value={dayName}
            placeholder="お祝いしたい日を入力してください"
          />

          <Text>年月日</Text>
          <DateTimePicker
            value={date}
            display="spinner"
            locale="ja-JP"
            onChange={onDateChange}
          />
        </View>
      </TouchableWithoutFeedback>
      <AddButton />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    width: "90%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
