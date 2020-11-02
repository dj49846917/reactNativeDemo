import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import CommonStyle from '@/utils/constant/Style';
import { UnitConvert } from '@/utils/unitConvert';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Text, StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface TemplateProps { }

const Template = (props: TemplateProps) => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={CommonStyle.container}>
      <DefaultNavigationHeader
        title='组件总览'
      />
      <ScrollView style={CommonStyle.content}>
        <View style={CommonStyle.list}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('TurnToPage')
            }}
            style={CommonStyle.list_item}
          >
            <Text style={CommonStyle.list_item_text}>跳转(react-navigation)</Text>
          </TouchableOpacity>
        </View>
        <View style={CommonStyle.list}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Modal')
            }}
            style={CommonStyle.list_item}
          >
            <Text style={CommonStyle.list_item_text}>Modal弹窗</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Template;

const styles = StyleSheet.create({
});
