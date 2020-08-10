import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Keyboard } from 'react-native'
import MyTextInput from '@/components/MyTextInput'
import { UnitConvert } from '@/utils/unitConvert'
import { ErrorNotice } from '@/utils/errorNotice'
import { VerifyUtil } from '@/utils/verifyUtil'

interface Iprops { }
interface IState {
  name: string
}

export default class Test extends Component<Iprops, IState> {
  constructor(props: Iprops) {
    super(props)
    this.state = {
      name: ''
    }
  }
  child: any = {}

  render() {
    return (
      <TouchableOpacity
        style={styles.box}
        onPress={() => {
          Keyboard.dismiss()
        }}
      >
        <View style={styles.item}>
          <MyTextInput
            ref={(ref) => {
              this.child = ref
            }}
            width={UnitConvert.w - UnitConvert.dpi(60)}
            placeholder='请输入姓名'
            flelds='姓名'
            getFieldsValue={(val: any) => {
              this.setState({
                name: val
              })
            }}
            onBlur={() => {
              if (!VerifyUtil.isNumber(this.state.name)) {
                ErrorNotice('输入的内容有误')
              }
            }}
            showClearIcon
          />
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    // backgroundColor: 'red'
  },
  item: {
    paddingHorizontal: UnitConvert.dpi(30),
    backgroundColor: '#fff'
  }
})
