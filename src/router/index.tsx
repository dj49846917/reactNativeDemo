import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp, HeaderStyleInterpolators, CardStyleInterpolators } from '@react-navigation/stack'
import Template from '@/pages/Template'
import TurnToPage from '@/pages/Template/TurnToPage'
import PassParam from '@/pages/Template/TurnToPage/PassParam'
import ResetRouter from '@/pages/Template/TurnToPage/ResetRouter'
import Modal from '@/pages/Template/Modal'
import ModalSelect from '@/pages/Template/Modal/ModalSelect'

export type RootStackList = { // 定义类型别名，用于约束navigator组件，在添加组件时，这里必须声明类型
  Template: { screen?: string },
  TurnToPage: { screen?: string },          // 跳转页面
  PassParam: { screen?: string },           // 跳转页面传参数
  ResetRouter: { screen?: string },         // 返回时重置路由
  Modal: { screen?: string },               // modal弹窗
  ModalSelect: { screen?: string },         // 下拉选择框
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}
