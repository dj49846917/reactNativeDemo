import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Config from 'react-native-config'
import 'react-native-gesture-handler'
import Home from '@/pages/Home'


class App extends Component {
  render() {
    return (
      <View>
        <Text> APP </Text>
        <Text>{Config.API_URL}</Text>
        <Home />
      </View>
    )
  }
}

const AppContainer = () => (
  <NavigationContainer>
    <App />
  </NavigationContainer>
)

export default AppContainer
