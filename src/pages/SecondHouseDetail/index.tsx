import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import { useRoute, RouteProp } from '@react-navigation/native';

interface SecondHouseDetailProps {}

const SecondHouseDetail = (props: SecondHouseDetailProps) => {
  const route = useRoute<any>()
  return (
    <SafeAreaView style={CommonStyle.container}>
      <Text>222</Text>
    </SafeAreaView>
  );
};

export default SecondHouseDetail;

const styles = StyleSheet.create({
  container: {}
});
