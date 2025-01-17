import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
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
import * as Notifications from "expo-notifications";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// TODO: Android の場合は StatusBar.currentHeight で高さを調整する

// プッシュ通知の受け取り方を設定
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const requestPushPermission = async () => {
    const { granted } = await Notifications.getPermissionsAsync();
    if (granted) return;
    await Notifications.requestPermissionsAsync();
  };

  useEffect(() => {
    requestPushPermission();
  }, []);

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
