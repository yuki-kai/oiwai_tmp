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
  const [showPicker, setShowPicker] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const { control, handleSubmit, reset, watch, formState } = useForm<InputCelebration>({
    mode: "onChange",
    defaultValues: {
      dayName: "",
      date: currentDate,
      memo: "",
    },
  });
  const dayNameValue = watch("dayName", "");
  const memoValue = watch("memo", "");

  Keyboard.addListener("keyboardWillShow", () => {
    if (showPicker) {
      setShowPicker(!showPicker);
    }
  });

  const toggleDatetimePicker = () => {
    if (!showPicker) {
      Keyboard.dismiss();
    }
    setShowPicker(!showPicker);
  };

  const handleAddCelebration = (data: InputCelebration) => {
    const dateString = convertDateString(data.date);
    const celebration = Celebration.create({
      dayName: data.dayName,
      date: dateString,
      memo: data.memo,
    });
    addCelebration(celebration);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.formWrapper}>
            <View style={styles.formLabelWrapper}>
              <Text style={styles.label}>お祝いする日</Text>
              <Text style={styles.label}>{dayNameValue.length}/20</Text>
            </View>
            <Controller
              control={control}
              name="dayName"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[
                    styles.input,
                    formState.errors.dayName && styles.inputError,
                  ]}
                  value={value}
                  placeholder="お祝いしたい日"
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
            <View style={styles.errorMessageWrapper}>
              {formState.errors.dayName && typeof formState.errors.dayName.message === "string" && (
                <Text style={styles.errorMessage}>{formState.errors.dayName.message}</Text>
              )}
            </View>
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
            <View style={styles.errorMessageWrapper}>
              {formState.errors.date && typeof formState.errors.date.message === "string" && (
                <Text style={styles.errorMessage}>{formState.errors.date.message}</Text>
              )}
            </View>
          </View>

          <View style={styles.formWrapper}>
            <View style={styles.formLabelWrapper}>
              <Text style={styles.label}>メモ</Text>
              <Text style={styles.label}>{(memoValue && memoValue.length) || 0}/500</Text>
            </View>
            <Controller
              control={control}
              name="memo"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[
                    styles.multilineInput,
                    formState.errors.memo && styles.inputError,
                  ]}
                  value={value}
                  multiline={true}
                  numberOfLines={4}
                  placeholder="欲しがってたもの、贈るもの、行く場所など"
                  onChangeText={onChange}
                  keyboardType="default"
                  returnKeyType="done"
                />
              )}
              rules={{
                maxLength: { value: 500, message: "500文字以内で入力してください" },
              }}
            />
            <View style={styles.errorMessageWrapper}>
              {formState.errors.memo && typeof formState.errors.memo.message === "string" && (
                <Text style={styles.errorMessage}>{formState.errors.memo.message}</Text>
              )}
            </View>
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
    paddingTop: 8,
    paddingHorizontal: 20,
  },
  formLabelWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  multilineInput: {
    borderColor: "#969696",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    textAlignVertical: "top",
    height: 126,
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
  inputError: {
    borderColor: "red",
  },
  errorMessageWrapper: {
    height: 16,
  },
  errorMessage: {
    color: "red",
  },
});
