import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { loadAll } from '../service/GameService';

export const GameList = ({navigation}) => {

  useEffect(() => {
    const initialize = async () => {
    let list = await loadAll();
    console.log(list);
    for (let item of list) {
      console.log("⭐️⭐️⭐️")
      console.log(item.gameName)
      console.log(item.memo)
      console.log(item.startDate)
      console.log(item.gameStatus)
    }
  }

  const unsubscribe = navigation.addListener('focus', initialize);
  return unsubscribe;
    
  }, [navigation]);

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Game List</Text>
        <Button
        title="edit Game"
        onPress={() => navigation.navigate('SetGame')}
      />
      </View>
    );
  }