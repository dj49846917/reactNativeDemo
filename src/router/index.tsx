import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp, HeaderStyleInterpolators, CardStyleInterpolators } from '@react-navigation/stack'
import Template from '@/pages/Template'
import TurnToPage from '@/pages/Template/TurnToPage'
import PassParam from '@/pages/Template/TurnToPage/PassParam'
import ResetRouter from '@/pages/Template/TurnToPage/ResetRouter'
import Modal from '@/pages/Template/Modal'
import ModalSelect from '@/pages/Template/Modal/ModalSelect'
import ModalBox from '@/pages/Template/Modal/ModalBox'
import ModalComfirm from '@/pages/Template/Modal/ModalComfirm'
import ModalTip from '@/pages/Template/Modal/ModalTip'
import DatePicker from '@/pages/Template/DatePicker'
import Tab from '@/pages/Template/Tab'
import Input from '@/pages/Template/Input'
import Swiper from '@/pages/Template/Swiper'

export type RootStackList = { // 定义类型别名，用于约束navigator组件，在添加组件时，这里必须声明类型
  Template: { screen?: string },
  TurnToPage: { screen?: string },          // 跳转页面
  PassParam: { screen?: string },           // 跳转页面传参数
  ResetRouter: { screen?: string },         // 返回时重置路由
  Modal: { screen?: string },               // modal弹窗
  ModalSelect: { screen?: string },         // 下拉选择框
  ModalBox: { screen?: string },            // 普通的弹窗
  ModalComfirm: { screen?: string },        // 对话框
  ModalTip: { screen?: string },            // 提示框
  DatePicker: { screen?: string },          // 时间选择器
  Tab: { screen?: string },                 // Tab选项卡
  Input: { screen?: string },               // 输入框
  Swiper: { screen?: string },              // 轮播图
}

// 该类型申明约束每一个页面组件的props
export type RootStackNavigation = StackNavigationProp<RootStackList>

let Stack = createStackNavigator<RootStackList>()

export default function Navigator () {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode='none'
        screenOptions={{
          headerTitleAlign: 'center', // 标题内容居中
          // 下面两句是统一ios和安卓的页面切换效果
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          // 开启安卓的切换手势
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
        initialRouteName='Template'
      >
        <Stack.Screen name="Template" component={Template} />
        <Stack.Screen name="TurnToPage" component={TurnToPage} />
        <Stack.Screen name="PassParam" component={PassParam} />
        <Stack.Screen name="ResetRouter" component={ResetRouter} />
        <Stack.Screen name="Modal" component={Modal} />
        <Stack.Screen name="ModalSelect" component={ModalSelect} />
        <Stack.Screen name="ModalBox" component={ModalBox} />
        <Stack.Screen name="ModalComfirm" component={ModalComfirm} />
        <Stack.Screen name="ModalTip" component={ModalTip} />
        <Stack.Screen name="DatePicker" component={DatePicker} />
        <Stack.Screen name="Tab" component={Tab} />
        <Stack.Screen name="Input" component={Input} />
        <Stack.Screen name="Swiper" component={Swiper} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
