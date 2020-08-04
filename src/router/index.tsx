import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp, HeaderStyleInterpolators, CardStyleInterpolators } from '@react-navigation/stack'
import Detail from '@/pages/Home/Detail'
import BottomTabs from '@/router/BottomTabs'
import { View, Text } from 'react-native'

export type RootStackList = { // 定义类型别名，用于约束navigator组件，在添加组件时，这里必须声明类型
  Tab: {
    screen?: string
  },
  Detail: {
    id: string
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
            gestureDirection: 'horizontal'
          }}
        >
          <Stack.Screen
            name="Tab"
            component={BottomTabs}
            options={{
              header: ({scene, previous, navigation}) => {
                return (
                  <View>
                    <Text>首页</Text>
                  </View>
                )
              },
            }}
          />
          <Stack.Screen 
            name="Detail" 
            component={Detail}
            options={{
              headerTitle: '详情'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
