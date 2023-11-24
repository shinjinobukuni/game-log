import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { loadAll, clearAllDate } from '../service/GameService';
import { List, FAB } from 'react-native-paper';

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
        <FlatList
          data={list}
          keyExtractor={(item) => item.createdAt}
          style={{width: '80%'}}
          renderItem={ ({ item }) => (
            <List.Item
            title={item.gameName}
            descriptionNumberOfLines={7}
            description={
              `目的地: ${item.destination}` +
              `　情報入手場所: ${item.infoGatherPlace}` +
              `\nクリア: ${item.isclear ? "OK" : ""}` +
              `\n内容:\n${item.memo}`
            }
            onPress={() => transDetail(item)}
            descriptionStyle={{ textAlign: 'left'}}
            style={{ borderBottomWidth: 1, borderBottomColor: 'black'}}
            />
          )}
        />
        <FAB
        style={{
          position: 'absolute',
          right: 16,
          bottom: 16,
        }}
        icon="plus"
        onPress={() => navigation.navigate('SetGame')}
      />
      <FAB
        style={{
          position: 'absolute',
          right: 80,
          bottom: 16,
        }}
        icon="trash-can-outline"
        onPress={() => clearAllDate()}
      />
      </View>
    );
  }