import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { RootStackList, RootStackNavigation } from '@/router/index'
import { RouteProp } from '@react-navigation/native'
import DefaultNavigationHeader from '@/components/DefaultNavigationHeader'

interface Iprops {
  route: RouteProp<RootStackList, 'Detail'>,
  navigation: RootStackNavigation,
}

export default class Detail extends Component<Iprops> {
  componentDidMount() {
    this.props.navigation.setOptions({
        header: () => {
          return (
            <DefaultNavigationHeader 
              title='详情'
            />
          )
        },
    })
  }

  render() {
    console.log(this.props)
    return (
      <View>
        <Text> {this.props.route.params.id} </Text>
      </View>
    )
  }
}
