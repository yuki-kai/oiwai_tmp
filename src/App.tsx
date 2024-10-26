import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { registerRootComponent } from "expo";
import ListScreen from "./screens/ListScreen";
import CalendarScreen from "./screens/CalendarScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddScreen from "./screens/AddScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ unmountOnBlur: true }}>
      <Tab.Screen
        name="リスト"
        component={ListStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="カレンダー"
        component={CalendarStackNavigator}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

function ListStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen name="Add" component={AddScreen} />
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
