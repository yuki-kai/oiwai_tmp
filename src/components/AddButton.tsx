import {
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { useTheme } from "../hooks/useTheme";

type Props = {
  label: string;
  handleButtonPress: (event: GestureResponderEvent) => void;
};

export default function AddButton(props: Props) {
  const { label, handleButtonPress } = props;
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={{ ...styles.addButton, backgroundColor: theme.Backgroud.primary }}
      onPress={handleButtonPress}
    >
      <Text style={styles.addButtonLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    width: 140,
    height: 60,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 20,
    bottom: 20,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 8 },
    // Andoroid に shadow を当てるためのスタイル
    // elevation: 8,
  },
  addButtonLabel: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 48,
  },
});
