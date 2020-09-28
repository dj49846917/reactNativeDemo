import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CommonStyle from '@/utils/constant/Style';

interface CustomerProps { }

const Customer = (props: CustomerProps) => {
  return (
    <View style={CommonStyle.content}>
      <View style={CommonStyle.sizedBox}></View>
      <Text>222</Text>
    </View>
  );
};

export default Customer;

const styles = StyleSheet.create({
  
});
