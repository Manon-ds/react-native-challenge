/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { AppVersion } from './src/modules';
import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RestaurantListScreen from './src/screens/RestaurantList/RestaurantList';

function App() {
  const version = AppVersion.getFullVersion();

  return (
    <SafeAreaProvider>
      <AppContent />
      <Text style={styles.versionText}>Version: {version}</Text>
    </SafeAreaProvider>
  );
}

function AppContent() {
  return (
    <View style={styles.container}>
      <RestaurantListScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  versionText: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    fontSize: 12,
    opacity: 0.6,
  },
});

export default App;
