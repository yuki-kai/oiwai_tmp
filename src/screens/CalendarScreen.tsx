import { View, Text, StyleSheet } from 'react-native';


export default function CalendarScreen() {
	return (
		<View style={styles.container}>
      <Text>カレンダー画面</Text>
    </View>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
