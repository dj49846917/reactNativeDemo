import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import { useNavigation } from '@react-navigation/native';
import { Constant } from '@/utils/constant/Constant';
import { UnitConvert } from '@/utils/unitConvert';
import MyTextInput from '@/components/MyTextInput';

interface ModifyPasProps { }

const ModifyPas = (props: ModifyPasProps) => {
  const navigation = useNavigation()

  const [ fields, setFields ] = useState({
    inputPassword: '', // 输入的密码
    newPassword: '', // 新密码
    confirmPassword: '', // 确认密码
  })

  const showContent = () => {
    return (
      <View style={styles.box}>
        <View style={styles.box_item}>
          <MyTextInput 
            flelds='原密码'
            placeholder='请输入原密码'
            getFieldsValue={(v: string)=>{
              setFields({
                ...fields,
                inputPassword: v
              })
            }}
            showLabel
            labelWidth={UnitConvert.dpi(208)}
            secureTextEntry={true}
            defaultValue={fields.inputPassword}
          />
          <MyTextInput 
            flelds='新密码'
            placeholder='请输入新密码'
            getFieldsValue={(v: string)=>{
              setFields({
                ...fields,
                newPassword: v
              })
            }}
            showLabel
            labelWidth={UnitConvert.dpi(208)}
            secureTextEntry={true}
            defaultValue={fields.newPassword}
          />
          <MyTextInput 
            flelds='确认密码'
            placeholder='请再次输入密码'
            getFieldsValue={(v: string)=>{
              setFields({
                ...fields,
                confirmPassword: v
              })
            }}
            showLabel
            labelWidth={UnitConvert.dpi(208)}
            secureTextEntry={true}
            defaultValue={fields.confirmPassword}
          />
        </View>
        <TouchableOpacity style={styles.box_btn} onPress={() => {}}>
          <Text style={styles.box_btn_text}>重置密码</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={CommonStyle.container}>
      <DefaultNavigationHeader
        title='修改密码'
        showLeftIcon
        navigation={navigation}
      />
      <View style={CommonStyle.sizedBox}></View>
      {showContent()}
    </SafeAreaView>
  );
};

export default ModifyPas;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: Constant.defaultBgColor
  },
  box_item: {
    backgroundColor: '#fff',
    paddingHorizontal: UnitConvert.dpi(30),
    width: UnitConvert.w,
  },
  box_btn: {
    width: UnitConvert.w - UnitConvert.dpi(60),
    marginLeft: UnitConvert.dpi(30),
    marginTop: UnitConvert.dpi(40),
    height: UnitConvert.dpi(80),
    borderRadius: UnitConvert.dpi(4),
    backgroundColor: '#c71622',
    justifyContent: 'center',
    alignItems: 'center'
  },
  box_btn_text: {
    fontSize: UnitConvert.dpi(32),
    color: '#fff'
  }
});
