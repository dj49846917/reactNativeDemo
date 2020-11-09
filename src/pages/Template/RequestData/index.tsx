import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import { useNavigation } from '@react-navigation/native';

interface RequestDataProps { }

const RequestData = (props: RequestDataProps) => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={CommonStyle.container}>
      <DefaultNavigationHeader
        title="请求数据"
        showLeftIcon
        navigation={navigation}
      />
      <View style={CommonStyle.list}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('RequestDataWithoutRedux')
          }}
          style={CommonStyle.list_item}
        >
          <Text style={CommonStyle.list_item_text}>不走redux的请求</Text>
        </TouchableOpacity>
      </View>
      <View style={CommonStyle.list}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('RequestDataWithRedux')
          }}
          style={CommonStyle.list_item}
        >
          <Text style={CommonStyle.list_item_text}>走redux的请求</Text>
        </TouchableOpacity>
      </View>
      <View style={CommonStyle.list}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('FlatListRefresh')
          }}
          style={CommonStyle.list_item}
        >
          <Text style={CommonStyle.list_item_text}>上拉加载，下拉刷新</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RequestData;

const styles = StyleSheet.create({
  container: {}
});
