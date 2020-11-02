import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import MyDatePicker from '@/components/MyDatePicker';
import MyDropdownList from '@/components/MyDropdownList';
import CommonStyle from '@/utils/constant/Style';
import { UnitConvert } from '@/utils/unitConvert';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';

interface DatePickerProps { }

const DatePicker = (props: DatePickerProps) => {
  const navigation = useNavigation()
  const [ ViewingDate, setViewingDate ] = useState('')
  const [ visible, setVisible ] = useState(false)

  return (
    <>
      <SafeAreaView style={CommonStyle.container}>
        <DefaultNavigationHeader
          title='时间选择器'
          showLeftIcon
          navigation={navigation}
        />
        <View style={CommonStyle.sizedBox}></View>
        <MyDropdownList
          showLabel
          flelds='看房日期'
          placeHolder='请选择看房日期'
          defaultValue={ViewingDate}
          lableStyle={{
            paddingLeft: UnitConvert.dpi(30)
          }}
          callBack={() => {
            setVisible(true)
          }}
        />
      </SafeAreaView>
      <MyDatePicker
        onOk={(val: any) => {
          const date = moment(val).format('YYYY-MM-DD')
          setViewingDate(date)
          setVisible(false)
        }}
        onCancel={() => {
          setVisible(false)
        }}
        title='看房日期'
        isOpen={visible}
        defaultDate={ViewingDate}
      />
    </>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {}
});
