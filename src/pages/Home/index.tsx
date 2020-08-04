import React, { Component } from 'react'
import { Text, View, StatusBar, SafeAreaView, StyleSheet } from 'react-native'

export default class Home extends Component {
  render() {
    return (
      <>
        <SafeAreaView style={styles.box}>
          <View>
            <Text>222</Text>
          </View>
        </SafeAreaView>
      </>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: 'red'
  }
})

