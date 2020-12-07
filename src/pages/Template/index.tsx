import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import MyErrorNotice from '@/components/MyErrorNotice';
import MyToastShort from '@/components/MyToastShort';
import CommonStyle from '@/utils/constant/Style';
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
        <View style={CommonStyle.list}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DatePicker')
            }}
            style={CommonStyle.list_item}
          >
            <Text style={CommonStyle.list_item_text}>时间选择器</Text>
          </TouchableOpacity>
        </View>
        <View style={CommonStyle.list}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Tab')
            }}
            style={CommonStyle.list_item}
          >
            <Text style={CommonStyle.list_item_text}>Tab选项卡</Text>
          </TouchableOpacity>
        </View>
        <View style={CommonStyle.list}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Input')
            }}
            style={CommonStyle.list_item}
          >
            <Text style={CommonStyle.list_item_text}>输入框</Text>
          </TouchableOpacity>
        </View>
        <View style={CommonStyle.list}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ModalSelect')
            }}
            style={CommonStyle.list_item}
          >
            <Text style={CommonStyle.list_item_text}>下拉选择</Text>
          </TouchableOpacity>
        </View>
        <View style={CommonStyle.list}>
          <TouchableOpacity
            onPress={() => {
              MyErrorNotice({ content: '未录入XXXX' })
            }}
            style={CommonStyle.list_item}
          >
            <Text style={CommonStyle.list_item_text}>错误提示框</Text>
          </TouchableOpacity>
        </View>
        <View style={CommonStyle.list}>
          <TouchableOpacity
            onPress={() => {
              MyToastShort({ content: '点击成功' })
            }}
            style={CommonStyle.list_item}
          >
            <Text style={CommonStyle.list_item_text}>普通提示框toast</Text>
          </TouchableOpacity>
        </View>
        <View style={CommonStyle.list}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Swiper')
            }}
            style={CommonStyle.list_item}
          >
            <Text style={CommonStyle.list_item_text}>Swiper轮播图</Text>
          </TouchableOpacity>
        </View>
        <View style={CommonStyle.list}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PicLook')
            }}
            style={CommonStyle.list_item}
          >
            <Text style={CommonStyle.list_item_text}>预览图片</Text>
          </TouchableOpacity>
        </View>
        <View style={CommonStyle.list}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('WebView')
            }}
            style={CommonStyle.list_item}
          >
            <Text style={CommonStyle.list_item_text}>WebView的使用</Text>
          </TouchableOpacity>
        </View>
        <View style={CommonStyle.list}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ReduxUse')
            }}
            style={CommonStyle.list_item}
          >
            <Text style={CommonStyle.list_item_text}>redux的使用</Text>
          </TouchableOpacity>
        </View>
        <View style={CommonStyle.list}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Upload')
            }}
            style={CommonStyle.list_item}
          >
            <Text style={CommonStyle.list_item_text}>图片上传</Text>
          </TouchableOpacity>
        </View>
        <View style={CommonStyle.list}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('RequestData')
            }}
            style={CommonStyle.list_item}
          >
            <Text style={CommonStyle.list_item_text}>接口请求数据</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Template;

const styles = StyleSheet.create({
});
