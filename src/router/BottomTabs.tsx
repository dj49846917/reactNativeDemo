import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '@/pages/Home'
import Account from '@/pages/Account'
import Collection from '@/pages/Collection'
import Recommend from '@/pages/Recommend'
import { RootStackNavigation, RootStackList } from '@/router/index'
import { RouteProp, TabNavigationState } from '@react-navigation/native'
import { Image } from 'react-native'
import { ENV_ICON } from '@/assets/styles/picUrl'

export type BottomTabParamList = {
  Home: undefined,
  Recommend: undefined,
  Collection: undefined,
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
      <Tab.Navigator tabBarOptions={{ activeTintColor: '#c71622' }}
      >
        <Tab.Screen
          name='Home'
          component={Home}
          options={{
            tabBarLabel: '首页',
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Image source={focused ? ENV_ICON.icon_footer_home_red : ENV_ICON.icon_footer_home} />
              )
            }
          }}
        />
        <Tab.Screen
          name='Recommend'
          component={Recommend}
          options={{
            tabBarLabel: '推荐',
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Image source={focused ? ENV_ICON.icon_footer_recommend_red : ENV_ICON.icon_footer_recommend} />
              )
            }
          }}
        />
        <Tab.Screen
          name='Collection'
          component={Collection}
          options={{
            tabBarLabel: '收藏',
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Image source={focused ? ENV_ICON.icon_footer_collect_red : ENV_ICON.icon_footer_collect} />
              )
            }
          }}
        />
        <Tab.Screen
          name='Account'
          component={Account}
          options={{
            tabBarLabel: '用户',
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Image source={focused ? ENV_ICON.icon_footer_user_red : ENV_ICON.icon_footer_user} />
              )
            }
          }}
        />
      </Tab.Navigator>
      // <Tab.Navigator
      //   tabBarOptions={{
      //     activeTintColor: '#c71622'
      //   }}
      // >
      //   <Tab.Screen
      //     name='Home'
      //     component={Home}
      //     options={{
      //       tabBarLabel: '首页',
      //       tabBarIcon: ({ focused, color, size }) => {
      //         return (
      //           <Image source={focused ? ENV_ICON.icon_footer_home_red : ENV_ICON.icon_footer_home} />
      //         )
      //       }
      //     }}
      //   />
      //   <Tab.Screen
      //     name='Recommend'
      //     component={Recommend}
      //     options={{
      //       tabBarLabel: '推荐',
      //       tabBarIcon: ({ focused, color, size }) => {
      //         return (
      //           <Image source={focused ? ENV_ICON.icon_footer_recommend_red : ENV_ICON.icon_footer_recommend} />
      //         )
      //       }
      //     }}
      //   />
      //   <Tab.Screen
      //     name='Collection'
      //     component={Collection}
      //     options={{
      //       tabBarLabel: '收藏',
      //       tabBarIcon: ({ focused, color, size }) => {
      //         return (
      //           <Image source={focused ? ENV_ICON.icon_footer_collect_red : ENV_ICON.icon_footer_collect} />
      //         )
      //       }
      //     }}
      //   />
      //   <Tab.Screen
      //     name='Account'
      //     component={Account}
      //     options={{
      //       tabBarLabel: '用户',
      //       tabBarIcon: ({ focused, color, size }) => {
      //         return (
      //           <Image source={focused ? ENV_ICON.icon_footer_user_red : ENV_ICON.icon_footer_user} />
      //         )
      //       }
      //     }}
      //   />
      // </Tab.Navigator>
    )
  }
}


