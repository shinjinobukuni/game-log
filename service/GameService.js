import AsyncStorage from '@react-native-async-storage/async-storage';

export const gameSave = async (createdAt, gameName, endtryDate, eventCls, memo, infoGatherPlace, destination, isclear) => {
  const key = `${createdAt}`;

  const value = JSON.stringify({
    gameName,
    endtryDate,
    eventCls,
    memo,
    infoGatherPlace, 
    destination,
    isclear,
    createdAt,
  });

  await AsyncStorage.setItem(key, value);
};


export const updateGame = async (createdAt, gameName, endtryDate, eventCls, memo, infoGatherPlace, destination, isclear) => {
  const key = `${createdAt}`;

  // 古いアイテムを削除する
  await AsyncStorage.removeItem(key);

  const value = JSON.stringify({
    gameName,
    endtryDate,
    eventCls,
    memo,
    infoGatherPlace, 
    destination,
    isclear,
    createdAt,
  });

  await AsyncStorage.setItem(key, value);

  
  await AsyncStorage.setItem(itemKey, value);
};

export const loadAll = async () => {
  const keys = await AsyncStorage.getAllKeys();  //1
  console.log(keys);
  keys.sort();  //2
  const entryList = await AsyncStorage.multiGet(keys);  //3
  const retunrList = entryList.map(entry => JSON.parse(entry[1]));  //4
  for (let item of retunrList) {
    console.log("⭐️⭐️⭐️")
    console.log(item)
  }
return retunrList
};

export const loadItem = async (key) => {
  console.log("loadItem call duarign")
  console.log(key)
  const rowValue = await AsyncStorage.getItem(key);  //1
  return JSON.parse(rowValue)
};



export const clearAllDate = async () => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
    // clear error
  }

  console.log('Done.')
}