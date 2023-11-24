import React, { useState, useEffect }  from 'react';
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import format from 'date-fns/format';
import DropDownPicker from 'react-native-dropdown-picker';
import { gameSave, loadItem } from '../service/GameService';
import { useRoute } from '@react-navigation/native';
import { Switch, TextInput, Text, Button } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";

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

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);


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
      <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 200 }}>
        <Text style={styles.header}></Text>
        <View style={styles.checkboxSection}>
          <Switch
            value={isclear}
            onValueChange={setClear}
          />
          <Text style={{marginStart: 8}}>クリア</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangeGameName(text)}
          value={gameName}
          label="ゲーム名"
          mode="outlined"
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        {!endtryDate &&<TextInput style={styles.input} onPress={showDatePicker} onFocus={showDatePicker} mode="outlined" label="記入日"></TextInput>}
        {endtryDate && <TextInput style={styles.input} onPress={showDatePicker} onFocus={showDatePicker} mode="outlined"　label="記入日" value={format(endtryDate, 'yyyy/MM/dd')}></TextInput>}
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangeInfoGatherPlace(text)}
          value={infoGatherPlace}
          mode="outlined"
          label="情報入手場所"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setDestination(text)}
          value={destination}
          label="目的地"
          mode="outlined"
        />
        <TextInput
          style={styles.inputMemo}
          multiline={true}
          numberOfLines={4}
          onChangeText={(text) => onChangeMemo(text)}
          value={memo}
          label="内容"
          mode="outlined"
        />
        <DropDown
          label="ステータス"
          visible={open}
          showDropDown={() => setOpen(true)}
          onDismiss={() => setOpen(false)}
          value={eventCls}
          setValue={setEventCls}
          list={items}
          inputProps={{style:{width: 200, margin:12}}}          
          mode="outlined"
        />
        <Button mode="contained" onPress={dataSave} style={styles.regButton}>保存</Button>
      </View>
      </ScrollView>
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
    padding: 10,
    width:200,
  },
  inputMemo: {
    height: 40,
    margin: 12,
    padding: 10,
    width:200,
    height: 100,
  },
  inputDropdown: {
    minWidth:500,
    margin: 60,
  },
  checkboxSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  regButton: {
    margin: 20
  }
});