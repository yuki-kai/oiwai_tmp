import { useContext, useMemo } from "react";
import { StyleSheet } from "react-native";
import { ColorTheme } from "../screens/theme";
import { ContextValue, ThemeContext } from "../utils/ThemeContext";

type Generator<T extends ColorTheme> = (theme: T) => ReturnType<typeof StyleSheet.create>;

export const useTheme = <T extends ColorTheme>(fn?: Generator<T>) => {
  const { theme, changeTheme }: ContextValue<T> = useContext(ThemeContext);
  const styles = useMemo<ReturnType<any>>(() => (fn ? fn(theme) : {}), [fn, theme]);
  
  return { styles, theme, changeTheme };
};
