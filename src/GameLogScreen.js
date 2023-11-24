import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { loadAll, clearAllDate } from '../service/GameService';

export const GameLogScreen = ({navigation}) => {

  const [list, setList] = useState([]);

  useEffect(() => {
    const initialize = async () => {
    let list = await loadAll();
    setList(list);
    console.log(list);
  }

  const unsubscribe = navigation.addListener('focus', initialize);
  return unsubscribe;
    
  }, [navigation]);

  const transDetail = (item) => {
    console.log(item);
    navigation.navigate('SetGame', {itemKey: item.createdAt})
  }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Game Log Screen</Text>
        <FlatList
          data={list}
          keyExtractor={(item) => item.createdAt}
          renderItem={ ({ item }) => (
            <View style={{ padding: 10 }}>
            <Text onPress={() => transDetail(item)}>{item.gameName}</Text>
            <Text>{item.destination}</Text>
          </View>
          )}
        />

        <Button
        title="edit Game"
        onPress={() => navigation.navigate('SetGame')}
      />
        <Button
        title="clear(test)"
        onPress={() =>clearAllDate()}
      />
      </View>
    );
  }