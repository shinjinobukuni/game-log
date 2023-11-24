import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/HomeScreen';
import { GameLogScreen } from './src/GameLogScreen';
import { GameList } from './src/GameList';
import { SetGame } from './src/SetGame';

/* function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
} */


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GameLogScreen">
        <Stack.Screen name="GameLogScreen" component={GameLogScreen} />
        <Stack.Screen name="SetGame" component={SetGame} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;