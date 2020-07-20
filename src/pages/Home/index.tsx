import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { RootStackNavigation } from '@/router/index'

interface homeProps {
  navigation: RootStackNavigation
}

export default class Home extends Component<homeProps> {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
        <Button title='跳转到详情页面' onPress={()=>{
          this.props.navigation.navigate('Detail', {id: '123'})
        }} />
      </View>
    )
  }
}
