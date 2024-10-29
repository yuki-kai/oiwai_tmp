import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

export default function AddScreen() {
  const today = new Date();
  const currentYearString = today.getFullYear().toString();
  const currentMonthString = (today.getMonth() + 1).toString();
  const currentDateString = today.getDate().toString();

  const [date, setDate] = useState(today);
  const [year, setYear] = useState(currentYearString);
  const [month, setMonth] = useState(currentMonthString);
  const [day, setDay] = useState(currentDateString);

  const onYearChange = (text: string) => {
    setYear(text);
    const parsedYear = parseInt(text);
    if (!isNaN(parsedYear)) {
      const updatedDate = new Date(parsedYear, parseInt(month), parseInt(day));
      setDate(updatedDate);
    }
  };

  const onMonthChange = (text: string) => {
    setMonth(text);
    const parsedMonth = parseInt(text);
    if (!isNaN(parsedMonth) && parsedMonth >= 1 && parsedMonth <= 12) {
      const updatedDate = new Date(parseInt(year), parsedMonth - 1, parseInt(day));
      setDate(updatedDate);
    }
  };

  const onDayChange = (text: string) => {
    setDay(text);
    const parsedDay = parseInt(text);
    if (!isNaN(parsedDay) && parsedDay >= 1 && parsedDay <= 31) {
      const updatedDate = new Date(parseInt(year), date.getMonth(), parsedDay);
      setDate(updatedDate);
    }
  };


  // 年月日変更時に呼ばれる
  const onDateChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    setDate(selectedDate || date);
    const selectedYear = selectedDate!.getFullYear().toString();
    const selectedMonth = (selectedDate!.getMonth() + 1).toString().padStart(2, "0");
    const selectedDay = selectedDate!.getDate().toString().padStart(2, "0");
    setYear(selectedYear);
    setMonth(selectedMonth);
    setDay(selectedDay);
  };

  return (
    <View>
      <Text>お祝いする日</Text>
      <TextInput
        style={styles.input}
        placeholder="お祝いしたい日を入力してください"
        multiline
        // onChangeText={(text) => {}}
      />

      <Text>年月日</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.inputYear}
          placeholder="年"
          keyboardType="numeric"
          value={year}
          onChangeText={onYearChange}
          maxLength={4}
        />
        <TextInput
          style={styles.inputMonth}
          placeholder="月"
          keyboardType="numeric"
          value={month}
          onChangeText={onMonthChange}
          maxLength={2}
        />
        <TextInput
          style={styles.inputDay}
          placeholder="日"
          keyboardType="numeric"
          value={day}
          onChangeText={onDayChange}
          maxLength={2}
        />
      </View>
      <DateTimePicker
        value={date}
        display="spinner"
        locale="ja-JP"
        onChange={onDateChange}
      />
      <Button title="追加"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
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
  inputYear: {
    width: "30%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  inputMonth: {
    width: "20%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  inputDay: {
    width: "20%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
