import * as React from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, TextInput, ScrollView } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import { UnitConvert } from '@/utils/unitConvert';

interface HouseProps { }

const House = (props: HouseProps) => {
  return (
    <View style={CommonStyle.content}>
      <View style={CommonStyle.sizedBox}></View>
      <Text>111</Text>
      <ScrollView style={{flex: 1}}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='position' keyboardVerticalOffset={200}>
          <TextInput
            style={{ height: UnitConvert.dpi(100) }}
            placeholder="请输入新密码"
            placeholderTextColor="#cccccc"
            maxLength={16}
            secureTextEntry={true}
            onChangeText={() => { }}
          />
          <TextInput
            style={{ height: UnitConvert.dpi(100) }}
            placeholder="请输入新密码"
            placeholderTextColor="#cccccc"
            maxLength={16}
            secureTextEntry={true}
            onChangeText={() => { }}
          />
          <TextInput
            style={{ height: UnitConvert.dpi(100) }}
            placeholder="请输入新密码"
            placeholderTextColor="#cccccc"
            maxLength={16}
            secureTextEntry={true}
            onChangeText={() => { }}
          />
          <TextInput
            style={{ height: UnitConvert.dpi(100) }}
            placeholder="请输入新密码"
            placeholderTextColor="#cccccc"
            maxLength={16}
            secureTextEntry={true}
            onChangeText={() => { }}
          />
          <TextInput
            style={{ height: UnitConvert.dpi(100) }}
            placeholder="请输入新密码"
            placeholderTextColor="#cccccc"
            maxLength={16}
            secureTextEntry={true}
            onChangeText={() => { }}
          />
          <TextInput
            style={{ height: UnitConvert.dpi(100) }}
            placeholder="请输入新密码"
            placeholderTextColor="#cccccc"
            maxLength={16}
            secureTextEntry={true}
            onChangeText={() => { }}
          />
          <TextInput
            style={{ height: UnitConvert.dpi(100) }}
            placeholder="请输入新密码"
            placeholderTextColor="#cccccc"
            maxLength={16}
            secureTextEntry={true}
            onChangeText={() => { }}
          />
          <TextInput
            style={{ height: UnitConvert.dpi(100) }}
            placeholder="请输入新密码"
            placeholderTextColor="#cccccc"
            maxLength={16}
            secureTextEntry={true}
            onChangeText={() => { }}
          />
          <TextInput
            style={{ height: UnitConvert.dpi(100) }}
            placeholder="请输入新密码"
            placeholderTextColor="#cccccc"
            maxLength={16}
            secureTextEntry={true}
            onChangeText={() => { }}
          />
        </KeyboardAvoidingView>
      </ScrollView>

    </View>
  );
};

export default House;

const styles = StyleSheet.create({
  container: {}
});
