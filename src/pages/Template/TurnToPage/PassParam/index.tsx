import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface PassParamProps { }

const PassParam = (props: PassParamProps) => {
  const route = useRoute<any>()
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <DefaultNavigationHeader 
        title='传递和接收参数'
        showLeftIcon
        navigation={navigation}
      />
      <Text>{`姓名：${route.params.name}`}</Text>
      <Text>{`年龄：${route.params.age}`}</Text>
    </View>
  );
};

export default PassParam;

const styles = StyleSheet.create({
  container: {}
});
