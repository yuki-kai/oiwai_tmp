import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AddButton from "../components/AddButton";
import useAddaddCelebration from "../hooks/useAddCelebration";
import { Celebration } from "../models/Celebration";
import { convertDateString } from "../utils/dateFormat";
import { useForm, Controller } from "react-hook-form";
import { InputCelebration } from "../types/celebration";
// import TextForm from "../components/TextForm";
// import DateForm from "../components/DateForm";

export default function AddScreen() {
  const { addCelebration } = useAddaddCelebration();
  const { control, handleSubmit, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      dayName: "",
      date: new Date(),
    },
  });

  const handleAddCelebration = (data: InputCelebration) => {
    const dateString = convertDateString(data.date);
    const celebration = Celebration.create({ dayName: data.dayName, date: dateString });
    addCelebration(celebration);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.formWrapper}>
            <Text style={styles.label}>お祝いする日</Text>
            <Controller
              control={control}
              name="dayName"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  value={value}
                  placeholder="お祝いしたい日を入力してください"
                  onChangeText={onChange}
                />
              )}
              rules={{
                required: "入力が必要です。",
                maxLength: { value: 20, message: "20文字以内で入力してください" },
              }}
            />
            {formState.errors.dayName && typeof formState.errors.dayName.message === "string" && (
              <Text style={styles.errorMessage}>{formState.errors.dayName.message}</Text>
            )}
          </View>

          <View style={styles.formWrapper}>
            <Text style={styles.label}>年月日</Text>
            <Controller
              control={control}
              name="date"
              render={({ field: { onChange, value } }) => (
                <DateTimePicker
                  style={styles.input}
                  value={value}
                  display="spinner"
                  locale="ja-JP"
                  onChange={(event, value) => {
                    onChange(value);
                  }}
                />
              )}
              rules={{ required: "入力が必要です。" }}
            />
            {formState.errors.date && typeof formState.errors.date.message === "string" && (
              <Text style={styles.errorMessage}>{formState.errors.date.message}</Text>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>

      <AddButton
        label="追加する"
        handleButtonPress={handleSubmit(handleAddCelebration)}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  formWrapper: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 12,
    marginBottom: 2,
  },
  input: {
    borderColor: "#969696",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  errorMessage: {
    color: "red",
  },
});
