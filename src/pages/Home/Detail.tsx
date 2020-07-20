import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { RootStackList } from '@/router/index'
import { RouteProp } from '@react-navigation/native'

interface Iprops{
  route: RouteProp<RootStackList, 'Detail'>
}

export default class Detail extends Component<Iprops> {
  render() {
    console.log(this.props)
    return (
      <View>
        <Text> {this.props.route.params.id} </Text>
      </View>
    )
  }
}
