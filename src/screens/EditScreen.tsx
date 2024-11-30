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
import useEditCelebration from "../hooks/useEditCelebration";
import { Celebration } from "../models/Celebration";
import TextForm from "../components/TextForm";
import { convertDateString, dateFromString } from "../utils/dateFormat";
import DateForm from "../components/DateForm";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/route";

export default function EditScreen() {
  const { editCelebration } = useEditCelebration();
  const route = useRoute<RouteProp<RootStackParamList, "Detail">>();
  const [dayName, setDayName] = useState(route.params.celebration.dayName);
  const [date, setDate] = useState(new Date(dateFromString(route.params.celebration.date)));

  // 年月日変更時に呼ばれる
  const onDateChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    setDate(selectedDate || date);
  };

  const handleEditCelebration = () => {
    const dateString = convertDateString(date);
    const celebration = Celebration.create({
      docId: route.params.celebration.docId,
      dayName: dayName,
      date: dateString,
    });
    editCelebration(celebration);
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

      <AddButton handleButtonPress={handleEditCelebration} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
