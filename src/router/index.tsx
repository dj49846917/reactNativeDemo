import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp, HeaderStyleInterpolators, CardStyleInterpolators } from '@react-navigation/stack'
import BottomTabs from '@/router/BottomTabs'
import Demo from '@/pages/demo'
import AssetAuction from '@/pages/AssetAuction'
import SecondHouse from '@/pages/SecondHouse'
import SecondHouseDetail from '@/pages/SecondHouseDetail'
import AgentList from '@/pages/AgentList'
import AgentInfo from '@/pages/AgentInfo'
import Assetment from '@/pages/Assetment'
import AssetAuctionDetail from '@/pages/AssetAuctionDetail'
import MyInfomation from '@/pages/Account/MyInfomation'
import MyRecommend from '@/pages/Account/MyRecommend'
import Login from '@/pages/Login'
import MyCard from '@/pages/Account/MyCard'
import AddCard from '@/pages/Account/MyCard/AddCard'
import EditInfo from '@/pages/Account/MyInfomation/EditInfo'
import Settings from '@/pages/Account/Settings'
import MessageAlert from '@/pages/Account/Settings/MessageAlert'
import ModifyPas from '@/pages/Account/Settings/ModifyPas'
import Default from '@/pages/Default'

export type RootStackList = { // 定义类型别名，用于约束navigator组件，在添加组件时，这里必须声明类型
  Tab: {
    screen?: string
  },
  Demo: {
    screen?: string
  },
  Recommend: { // 推荐
    screen?: string
  },
  AssetAuction: { // 资产拍卖
    screen?: string
  },
  SecondHouse: { // 二手房
    screen?: string
  },
  SecondHouseDetail: { // 二手房详情
    screen?: string
  },
  AgentList: { // 置业经理列表
    screen?: string
  },
  AgentInfo: { // 置业经理详情
    screen?: string
  },
  Assetment: { // 估值
    screen?: string
  },
  AssetAuctionDetail: { // 资产拍卖详情
    screen?: string
  },
  MyInfomation: { // 我的资料
    screen?: string
  },
  EditInfo: { // 修改我的资料
    screen?: string
  },
  MyRecommend: { // 我的推荐
    screen?: string
  },
  MyCard: { // 我的银行卡
    screen?: string
  },
  AddCard: { // 添加银行卡
    screen?: string
  },
  Settings: { // 添加银行卡
    screen?: string
  },
  MessageAlert: { // 消息提醒
    screen?: string
  },
  ModifyPas: { // 修改密码
    screen?: string
  },
  Login: { // 登录
    screen?: string
  },
  Default: { // 启动页
    screen?: string
  }
}

// 该类型申明约束每一个页面组件的props
export type RootStackNavigation = StackNavigationProp<RootStackList>

let Stack = createStackNavigator<RootStackList>()

export default function Navigator () {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode='screen'
        screenOptions={{
          headerTitleAlign: 'center', // 标题内容居中
          // 下面两句是统一ios和安卓的页面切换效果
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          // 开启安卓的切换手势
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
        initialRouteName='Default'
      >
        <Stack.Screen
          name="Tab"
          component={BottomTabs}
          options={{
            header: () => null
          }}
        />
        <Stack.Screen
          name="Demo"
          component={Demo}
        />
        <Stack.Screen
          name="AssetAuction"
          component={AssetAuction}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="SecondHouse"
          component={SecondHouse}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="SecondHouseDetail"
          component={SecondHouseDetail}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="AgentList"
          component={AgentList}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="AgentInfo"
          component={AgentInfo}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Assetment"
          component={Assetment}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="AssetAuctionDetail"
          component={AssetAuctionDetail}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="MyInfomation"
          component={MyInfomation}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="EditInfo"
          component={EditInfo}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="MyRecommend"
          component={MyRecommend}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="MyCard"
          component={MyCard}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="AddCard"
          component={AddCard}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="MessageAlert"
          component={MessageAlert}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="ModifyPas"
          component={ModifyPas}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Default"
          component={Default}
          options={{
            header: () => null
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
