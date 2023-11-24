import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { clearAllDate } from '../service/GameService';

export const HomeScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="show game list"
        onPress={() => navigation.navigate('GameList')}
      />
      <Button
        title="clear(test)"
        onPress={() =>clearAllDate()}
      />
    </View>
  );
}
/* import React from 'react';
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';

export const HomeScreen =() => {
const [gameName, onChangeText] = React.useState('Useless Text');
const [number, onChangeNumber] = React.useState('');

return (
  <SafeAreaView>
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      value={gameName}
    />
    <TextInput
      style={styles.input}
      onChangeText={onChangeNumber}
      value={number}
      placeholder="useless placeholder"
      keyboardType="numeric"
    />
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
}); */