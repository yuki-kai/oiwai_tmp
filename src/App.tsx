import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import ListScreen from './screens/ListScreen';
import CalendarScreen from './screens/CalendarScreen';

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator>
        <Tab.Screen name="リスト" component={ ListScreen } />
        <Tab.Screen name="カレンダー" component={ CalendarScreen } />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);
