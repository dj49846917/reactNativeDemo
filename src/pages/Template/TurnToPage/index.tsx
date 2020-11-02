import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import CommonStyle from '@/utils/constant/Style';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';

interface TurnToPageProps { }

const data = {
  name: '张三',
  age: 18
}

const TurnToPage = (props: TurnToPageProps) => {
  const route = useRoute<any>()
  const navigation = useNavigation()
  return (
    <SafeAreaView style={CommonStyle.container}>
      <DefaultNavigationHeader
        title='跳转(react-navigation)'
        showLeftIcon
        navigation={navigation}
      />
      <ScrollView style={CommonStyle.content}>
        <View style={CommonStyle.list}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PassParam', data)
            }}
            style={CommonStyle.list_item}
          >
            <Text style={CommonStyle.list_item_text}>跳转并传值</Text>
          </TouchableOpacity>
        </View>
        <View style={CommonStyle.list}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ResetRouter')
            }}
            style={CommonStyle.list_item}
          >
            <Text style={CommonStyle.list_item_text}>重置路由</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TurnToPage;

const styles = StyleSheet.create({
  container: {}
});
