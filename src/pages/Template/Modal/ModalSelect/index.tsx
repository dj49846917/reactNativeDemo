import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import MyDropdownList from '@/components/MyDropdownList';
import MyModalSelect, { MyModalSelectState } from '@/components/MyModalSelect';
import CommonStyle from '@/utils/constant/Style';
import { UnitConvert } from '@/utils/unitConvert';
import { findDicName } from '@/utils/utils';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import Picker from 'react-native-picker';

interface ModalSelectProps { }

const arr = [
  {
    "DicCode": 1110001,
    "DicName": "江北区",
    "SubTypeCode": 1110,
    "BaseTypeCode": 11
  }, {
    "DicCode": 1110002,
    "DicName": "渝北区",
    "SubTypeCode": 1110,
    "BaseTypeCode": 11
  }, {
    "DicCode": 1110003,
    "DicName": "渝中区",
    "SubTypeCode": 1110,
    "BaseTypeCode": 11
  }, {
    "DicCode": 1110004,
    "DicName": "北碚区",
    "SubTypeCode": 1110,
    "BaseTypeCode": 11
  }, {
    "DicCode": 1110005,
    "DicName": "九龙坡区",
    "SubTypeCode": 1110,
    "BaseTypeCode": 11
  }, {
    "DicCode": 1110006,
    "DicName": "沙坪坝区",
    "SubTypeCode": 1110,
    "BaseTypeCode": 11
  }, {
    "DicCode": 1110007,
    "DicName": "大渡口区",
    "SubTypeCode": 1110,
    "BaseTypeCode": 11
  }, {
    "DicCode": 1110008,
    "DicName": "南岸区",
    "SubTypeCode": 1110,
    "BaseTypeCode": 11
  }, {
    "DicCode": 1110009,
    "DicName": "巴南区",
    "SubTypeCode": 1110,
    "BaseTypeCode": 11
  }, {
    "DicCode": 1110010,
    "DicName": "永川区",
    "SubTypeCode": 1110,
    "BaseTypeCode": 11
  }, {
    "DicCode": 1110011,
    "DicName": "两江新区",
    "SubTypeCode": 1110,
    "BaseTypeCode": 11
  }, {
    "DicCode": 1110012,
    "DicName": "璧山区",
    "SubTypeCode": 1110,
    "BaseTypeCode": 11
  }, {
    "DicCode": 1110013,
    "DicName": "涪陵区",
    "SubTypeCode": 1110,
    "BaseTypeCode": 11
  }, {
    "DicCode": 1110014,
    "DicName": "綦江区",
    "SubTypeCode": 1110,
    "BaseTypeCode": 11
  }, {
    "DicCode": 1110015,
    "DicName": "江津区",
    "SubTypeCode": 1110,
    "BaseTypeCode": 11
  }, {
    "DicCode": 1110016,
    "DicName": "合川区",
    "SubTypeCode": 1110,
    "BaseTypeCode": 11
  }, {
    "DicCode": 1110017,
    "DicName": "大足区",
    "SubTypeCode": 1110,
    "BaseTypeCode": 11
  }, {
    "DicCode": 1110018,
    "DicName": "长寿区",
    "SubTypeCode": 1110,
    "BaseTypeCode": 11
  }, {
    "DicCode": 1110019,
    "DicName": "铜梁区",
    "SubTypeCode": 1110,
    "BaseTypeCode": 11
  }, {
    "DicCode": 1110020,
    "DicName": "南川区",
    "SubTypeCode": 1110,
    "BaseTypeCode": 11
  }, {
    "DicCode": 1110021,
    "DicName": "万盛区",
    "SubTypeCode": 1110,
    "BaseTypeCode": 11
  }, {
    "DicCode": 1110022,
    "DicName": "北部新区",
    "SubTypeCode": 1110,
    "BaseTypeCode": 11
  }
]

const ModalSelect = (props: ModalSelectProps) => {
  const navigation = useNavigation()

  const [RegionId, setReginId] = useState<number | string | undefined>(0)
  const [visible, setVisible] = useState(false)
  return (
    <>
      <SafeAreaView style={styles.container}>
        <DefaultNavigationHeader
          title='下拉选择框'
          showLeftIcon
          navigation={navigation}
        />
        <View style={CommonStyle.content}>
          <View style={CommonStyle.sizedBox}></View>
          <MyDropdownList
            showLabel
            required
            flelds='意向区域'
            placeHolder='请选择意向区域'
            defaultValue={findDicName(arr, RegionId)}
            lableStyle={{
              paddingLeft: UnitConvert.dpi(30)
            }}
            callBack={() => {
              setVisible(true)
            }}
          />
        </View>
      </SafeAreaView>
      <MyModalSelect
        position='bottom'
        onCancel={() => {
          setVisible(false)
        }}
        onOk={(v: MyModalSelectState) => {
          setReginId(v.val)
          setVisible(false)
        }}
        visible={visible}
        list={arr}
        defaultValue={RegionId}
        title='意向区域'
      />
    </>
  );
};

export default ModalSelect;

const styles = StyleSheet.create({
  container: {}
});
