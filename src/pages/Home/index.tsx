import React, { Component } from 'react'
import { Text, View, StatusBar, SafeAreaView, StyleSheet, Button } from 'react-native'

import { RootStackNavigation } from '@/router/index'

interface homeProps {
  navigation: RootStackNavigation,
}

export default class Home extends Component<homeProps> {
  render() {
    return (
      <>
        <SafeAreaView style={styles.box}>
          <View>
            <Text>222</Text>
          </View>
          <Button title='更新' onPress={()=>{
            console.log(this.props.navigation, '2222')
            this.props.navigation.navigate('Detail', {id: '123'})
          }}></Button>
        </SafeAreaView>
      </>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

