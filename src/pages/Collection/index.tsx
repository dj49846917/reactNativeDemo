import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { RootStackNavigation } from '@/router/index'

interface homeProps {
  navigation: RootStackNavigation,
}

export default class Collection extends Component<homeProps> {
  render() {
    return (
      <View>
        <Text> Collection </Text>
      </View>
    )
  }
}
