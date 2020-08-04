import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Image } from 'react-native'
import { RootStackNavigation, RootStackList } from '@/router/index'
import { RouteProp, TabNavigationState } from '@react-navigation/native'
import Home from '@/pages/Home'
import Account from '@/pages/Account'
import Collection from '@/pages/Collection'
import Recommend from '@/pages/Recommend'
import { ENV_ICON } from '@/constant/image/icon'

export type BottomTabParamList = {
  Home: undefined,
  Collection: undefined,
  Recommend: undefined,
  Account: undefined
}

const Tab = createBottomTabNavigator<BottomTabParamList>()

type Route = RouteProp<RootStackList, 'Tab'> & {
  state?: TabNavigationState
}

interface IProps {
  navigation: RootStackNavigation,
  route: Route
}

// 动态获取底部导航栏的标题
function getHeaderTitle(route: Route) {
  const routeName = route.state ? route.state.routes[route.state.index].name : route.params?.screen || 'Home';
  switch (routeName) {
    case 'Home':
      return '首页';
    case 'Recommend':
      return '推荐';
    case 'Collection':
      return '收藏';
    default:
      return '我的';
  }
}


export default class BottomTabs extends Component<IProps> {
  componentDidMount() {
    const { navigation, route } = this.props;
    console.log('route', route)
    navigation.setOptions({
      headerTitle: getHeaderTitle(route)
    })
  }

  componentDidUpdate() {
    const { navigation, route } = this.props;
    navigation.setOptions({
      headerTitle: getHeaderTitle(route)
    })
  }

  render() {
    return (
      <Tab.Navigator
        lazy
        tabBarOptions={{
          activeTintColor: '#c71622',
          inactiveTintColor: '#666',
          labelStyle: { fontSize: 14, position: 'relative', top: -4 }
        }}
      >
        <Tab.Screen
          name='Home'
          component={Home}
          options={{
            tabBarLabel: '首页',
            tabBarIcon: ({ focused, color, size }) => (
              <Image source={focused ? ENV_ICON.icon_footer_home_red : ENV_ICON.icon_footer_home} />
            ),
          }}
        />
        <Tab.Screen
          name='Recommend'
          component={Recommend}
          options={{
            tabBarLabel: '推荐',
            tabBarIcon: ({ focused, color, size }) => (
              <Image source={focused ? ENV_ICON.icon_footer_recommend_red : ENV_ICON.icon_footer_recommend} />
            )
          }}
        />
        <Tab.Screen
          name='Collection'
          component={Collection}
          options={{
            tabBarLabel: '收藏',
            tabBarIcon: ({ focused, color, size }) => (
              <Image source={focused ? ENV_ICON.icon_footer_collect_red : ENV_ICON.icon_footer_collect} />
            )
          }}
        />
        <Tab.Screen
          name='Account'
          component={Account}
          options={{
            tabBarLabel: '我的',
            tabBarIcon: ({ focused, color, size }) => (
              <Image source={focused ? ENV_ICON.icon_footer_user_red : ENV_ICON.icon_footer_user} />
            )
          }}
        />
      </Tab.Navigator>
    )
  }
}


