import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '@/pages/Home'
import Account from '@/pages/Account'
import Found from '@/pages/Found'
import Listen from '@/pages/Listen'
import { RootStackNavigation, RootStackList } from '@/router/index'
import { RouteProp, TabNavigationState } from '@react-navigation/native'

export type BottomTabParamList = {
  Home: undefined,
  Found: undefined,
  Listen: undefined,
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
    case 'Listen':
      return '我听';
    case 'Found':
      return '发现';
    default:
      return '账户';
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
      <Tab.Navigator tabBarOptions={{
        activeTintColor: '#c71622'
      }}>
        <Tab.Screen name='Home' component={Home} options={{ tabBarLabel: '首页' }}></Tab.Screen>
        <Tab.Screen name='Listen' component={Listen} options={{ tabBarLabel: '我听' }}></Tab.Screen>
        <Tab.Screen name='Found' component={Found} options={{ tabBarLabel: '发现' }}></Tab.Screen>
        <Tab.Screen name='Account' component={Account} options={{ tabBarLabel: '用户' }}></Tab.Screen>
      </Tab.Navigator>
    )
  }
}


