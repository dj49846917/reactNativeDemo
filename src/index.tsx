import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Home from '@/pages/Home'

export default class App extends Component {
  render() {
    return (
      <View>
        <Text> APP </Text>
        <Home />
      </View>
    )
  }
}
