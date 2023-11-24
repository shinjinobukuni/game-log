import React, { useState, useEffect }  from 'react';
import { View, Text, Button, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Checkbox from 'expo-checkbox';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import format from 'date-fns/format';
import DropDownPicker from 'react-native-dropdown-picker';
import { gameSave, loadItem } from '../service/GameService';
import { useRoute } from '@react-navigation/native';

export const SetGame = ({navigation}) => {
    const [isclear, setClear] = useState(false);
    const [gameName, onChangeGameName] = useState('');
    const [memo, onChangeMemo] = useState('');
    const [infoGatherPlace, onChangeInfoGatherPlace] = useState('');
    const [destination, setDestination] = useState('');
    const [endtryDate, setEndtryDate] = useState(null)
    const [eventCls, setEventCls] = useState(1);
    const [createdAt, setCreatedAt] = useState(null);

    const route = useRoute();

    useEffect(() => {
      const initialize = async () =>  {
      console.log("遷移パラメータ")
      if (route.params && route.params.itemKey) {
        console.log(route.params.itemKey);
        const selectedItem = await loadItem(`${route.params.itemKey}`)
        setClear(selectedItem.isclear);
        onChangeGameName(selectedItem.gameName);
        onChangeMemo(selectedItem.memo);
        onChangeInfoGatherPlace(selectedItem.infoGatherPlace);
        setDestination(selectedItem.destination);
        setEndtryDate(new Date(selectedItem.endtryDate));
        setEventCls(selectedItem.eventCls);
        setCreatedAt(route.params.itemKey)
      }
      
    }
  
    const unsubscribe = navigation.addListener('focus', initialize);
    return unsubscribe;
      
    }, [navigation]);

    // dropdown
    const [open, setOpen] = React.useState(false);
    const [items, setItems] = React.useState([
      {label: '本編', value: 1},
      {label: 'サブクエスト', value: 2},
      {label: '隠しアイテム', value: 3},
      {label: 'その他', value: 4}
    ]);

    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date) => {
      setEndtryDate(date);
      hideDatePicker();
    };

    const dataSave = () => {
      console.log("gameName:" + gameName);
      console.log("memo:" + memo);
      console.log("endtryDate:" + endtryDate);
      console.log("eventCls:" + eventCls);

      if (!createdAt) {
        // レコード追加
        gameSave(Date.now(), gameName, endtryDate, eventCls, memo, infoGatherPlace, destination, isclear);
      } else {
        // レコード更新
        gameSave(createdAt, gameName, endtryDate, eventCls, memo, infoGatherPlace, destination, isclear);
      }
      navigation.goBack();

    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.header}>Game Info</Text>
        <View style={styles.checkboxSection}>
          <Checkbox
            value={isclear}
            onValueChange={setClear}
          />
          <Text>済</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangeGameName(text)}
          value={gameName}
          placeholder="ゲーム名"
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        {!endtryDate &&<Text style={styles.inputEmpty} onPress={showDatePicker}>記入日</Text>}
        {endtryDate && <Text style={styles.input} onPress={showDatePicker}>{format(endtryDate, 'yyyy/MM/dd')}</Text>}
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangeInfoGatherPlace(text)}
          value={infoGatherPlace}
          placeholder="情報入手場所"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setDestination(text)}
          value={destination}
          placeholder="目的地"
        />
        <TextInput
          style={styles.inputMemo}
          multiline={true}
          numberOfLines={4}
          onChangeText={(text) => onChangeMemo(text)}
          value={memo}
          placeholder="メモ"
        />
        <DropDownPicker
          open={open}
          value={eventCls}
          items={items}
          setOpen={setOpen}
          setValue={setEventCls}
          setItems={setItems}
          style={styles.inputDropdown}
        />
        <Button title="保存" onPress={dataSave} />
      </View>
      </TouchableWithoutFeedback>
      
    );
  }

const styles = StyleSheet.create({
  header: {
    marginBottom: 10,
    fontSize: 24
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width:200,
  },
  inputMemo: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width:200,
    height: 100,
  },
  inputEmpty: {
    color:'#a9a9a9',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width:200,
  },
  inputDropdown: {
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 1,
    padding: 10,
    width:200,
    backgroundColor: 'transparent'
  },
  checkboxSection: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});