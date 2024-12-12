import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { registerRootComponent } from "expo";
import ListScreen from "./screens/ListScreen";
import CalendarScreen from "./screens/CalendarScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddScreen from "./screens/AddScreen";
import DetailScreen from "./screens/DetailScreen";
import EditScreen from "./screens/EditScreen";
import { AuthProvider } from "./utils/Auth";
import { ThemeProvider } from "./utils/ThemeContext";
import { themes } from "./screens/theme";
import { useTheme } from "./hooks/useTheme";
import { StatusBar } from "react-native";
import { PaperProvider } from "react-native-paper";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// TODO: Android の場合は StatusBar.currentHeight で高さを調整する

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider initialTheme={themes.default}>
        <PaperProvider>
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </PaperProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

function TabNavigator() {
  const { theme } = useTheme();

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.Backgroud.primary }}
      >
        <StatusBar barStyle="light-content" />
        <Tab.Navigator screenOptions={{ unmountOnBlur: true }}>
          <Tab.Screen
            name="リスト"
            component={ListStackNavigator}
            options={{
              headerShown: false,
              tabBarActiveTintColor: theme.Text.secondary,
            }}
          />
          <Tab.Screen
            name="カレンダー"
            component={CalendarStackNavigator}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function ListStackNavigator() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.Backgroud.primary },
        headerTintColor: theme.Text.primary,
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen name="Add" component={AddScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Edit" component={EditScreen} />
    </Stack.Navigator>
  );
}

function CalendarStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="Add" component={AddScreen} />
    </Stack.Navigator>
  );
}

registerRootComponent(App);
