import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import AddButton from "../components/AddButton";
import useEditCelebration from "../hooks/useEditCelebration";
import { Celebration } from "../models/Celebration";
import { convertDateString, dateFromString } from "../utils/dateFormat";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/route";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useForm, Controller } from "react-hook-form";
import { InputCelebration } from "../types/celebration";
// import TextForm from "../components/TextForm";
// import DateForm from "../components/DateForm";

export default function EditScreen() {
  const { editCelebration } = useEditCelebration();
  const route = useRoute<RouteProp<RootStackParamList, "Detail">>();
  const [showPicker, setShowPicker] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date>(
    new Date(dateFromString(route.params.celebration.date)),
  );
  const { control, handleSubmit, reset, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      dayName: route.params.celebration.dayName,
      date: currentDate,
    },
  });

  const toggleDatetimePicker = () => {setShowPicker(!showPicker);};

  const handleEditCelebration = (data: InputCelebration) => {
    const dateString = convertDateString(data.date);
    const celebration = Celebration.create({
      docId: route.params.celebration.docId,
      dayName: data.dayName,
      date: dateString,
    });
    editCelebration(celebration);
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
                  keyboardType="default"
                  returnKeyType="done"
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
                <View>
                  {!showPicker && (
                    <Pressable onPress={toggleDatetimePicker}>
                      <TextInput
                        style={styles.input}
                        value={convertDateString(value)}
                        placeholder="年月日"
                        editable={false}
                        onPressIn={() => {
                          toggleDatetimePicker();
                          setCurrentDate(value);
                        }}
                      />
                    </Pressable>
                  )}
                  {showPicker && (
                    <View>
                      <DateTimePicker
                        style={styles.datetimeInput}
                        mode="date"
                        value={value}
                        display="spinner"
                        locale="ja-JP"
                        onChange={(event, value) => onChange(value)}
                      />
                      <View style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}>
                        <TouchableOpacity
                          onPress={() => {
                            reset({ date: currentDate });
                            toggleDatetimePicker();
                          }}
                          style={styles.smallButton}
                        >
                          <Text>閉じる</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={toggleDatetimePicker}
                          style={{...styles.smallButton, backgroundColor: "#c9a333"}}
                        >
                          <Text style={{ color: "white", fontWeight: "600" }}>決定</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
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
        label="更新する"
        handleButtonPress={handleSubmit(handleEditCelebration)}
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
  datetimeInput: {
    height: 140,
    marginTop: -10,
  },
  smallButton: {
    backgroundColor: "#f0f0f0",
    width: 100,
    height: 40,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessage: {
    color: "red",
  },
});
