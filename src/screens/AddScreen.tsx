import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import AddButton from "../components/AddButton";
import useAddaddCelebration from "../hooks/useAddCelebration";
import { Celebration } from "../models/Celebration";
import TextForm from "../components/TextForm";
import { convertDateString } from "../utils/dateFormat";
import DateForm from "../components/DateForm";

export default function AddScreen() {
  const { addCelebration } = useAddaddCelebration();
  const [dayName, setDayName] = useState("");
  const [date, setDate] = useState(new Date());

  // 年月日変更時に呼ばれる
  const onDateChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    setDate(selectedDate || date);
  };

  const handleAddCelebration = () => {
    const dateString = convertDateString(date);
    const celebration = Celebration.create({ dayName, date: dateString });
    addCelebration(celebration);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <TextForm
            label="お祝いする日"
            value={dayName}
            onChangeText={(value: string) => setDayName(value)}
            placeholder="お祝いしたい日を入力してください"
          />
          <DateForm
            label="年月日"
            value={date}
            onChangeDate={onDateChange}
          />
        </View>
      </TouchableWithoutFeedback>

      <AddButton
        label="追加する"
        handleButtonPress={handleAddCelebration}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
