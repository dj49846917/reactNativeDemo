import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import MyTextInput from '@/components/MyTextInput';
import CommonStyle from '@/utils/constant/Style';
import { UnitConvert } from '@/utils/unitConvert';
import { validFieldsDefault } from '@/utils/utils';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Keyboard } from 'react-native';

interface InputProps { }

const Input = (props: InputProps) => {
  const navigation = useNavigation()
  const [ UserName, setUserName ] = useState('')
  return (
    <>
      <SafeAreaView style={CommonStyle.container}>
        <DefaultNavigationHeader
          title='输入框'
          showLeftIcon
          navigation={navigation}
        />
        <View style={CommonStyle.sizedBox}></View>
        <MyTextInput
          flelds='客户姓名'
          required
          placeholder='请输入推荐人姓名'
          defaultValue={UserName}
          lableStyle={{
            paddingLeft: UnitConvert.dpi(30)
          }}
          onBlur={() => {
            validFieldsDefault(UserName, '被推荐人姓名不能为空')
          }}
          getFieldsValue={(code: string) => {
            setUserName(code)
          }}
        />
        <View style={CommonStyle.list}>
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss()
            }}
            style={CommonStyle.list_item}
          >
            <Text style={CommonStyle.list_item_text}>点击</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {}
});
