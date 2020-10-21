import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp, HeaderStyleInterpolators, CardStyleInterpolators } from '@react-navigation/stack'
import BottomTabs from '@/router/BottomTabs'
import Demo from '@/pages/demo'
import AssetAuction from '@/pages/AssetAuction'
import SecondHouse from '@/pages/SecondHouse'

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
  }
}

// 该类型申明约束每一个页面组件的props
export type RootStackNavigation = StackNavigationProp<RootStackList>

let Stack = createStackNavigator<RootStackList>()

export default class Navigator extends Component {
  render() {
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
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
