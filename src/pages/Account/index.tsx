import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { RootStackNavigation } from '@/router/index'

interface homeProps {
  navigation: RootStackNavigation
}

export default class Account extends Component<homeProps> {
  render() {
    return (
      <View>
        <Text> Account </Text>
      </View>
    )
  }
}
