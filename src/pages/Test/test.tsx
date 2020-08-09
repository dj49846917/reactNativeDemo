import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import MyTextInput from '@/components/MyTextInput'
import { UnitConvert } from '@/utils/unitConvert'

export default class Test extends Component {
  render() {
    return (
      <View>
        <View style={styles.item}>
          <MyTextInput 
            width={UnitConvert.w - UnitConvert.dpi(60)} 
            labelWidth={UnitConvert.dpi(100)}
            placeholder='123'
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: UnitConvert.dpi(30),
    backgroundColor: '#fff'
  }
})
