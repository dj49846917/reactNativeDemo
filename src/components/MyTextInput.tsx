import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, TextInputProps } from 'react-native'
import { RootStackNavigation } from '../router'
import { Constant } from '../constant'
import { UnitConvert } from '@/utils/unitConvert'
import { commonStyle } from '@/constant/commonStyle'

interface Iprops {
  navigation?: RootStackNavigation,
  height: number,                            // 输入框的高度
  width: number,                             // 输入框的宽度
  showBorder: boolean,                       // 是否展示底部边框
  showLabel: boolean,                        // 是否展示左侧的标题栏
  labelWidth: number                         // 标题栏的宽度
}

type inputProps = Iprops & TextInputProps

export default class MyTextInput extends Component<inputProps> {
  static defaultProps = {
    height: Constant.inputHeight,
    width: UnitConvert.w,
    showBorder: true,
    showLabel: true,
    labelWidth: UnitConvert.dpi(228)
  }

  constructor(props: Readonly<Iprops>) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <View style={[styles.box, { height: this.props.height, width: this.props.width }, this.props.showBorder ? commonStyle.commonBorder : null]}>
        {this.props.showLabel ? (
          <View style={[styles.box_label, { width: this.props.labelWidth, justifyContent: 'center' }]}>
            <Text style={styles.box_label_text}>标题</Text>
          </View>
        ) : null}
        <TextInput
          {...this.props}
          style={{ width: this.props.width - this.props.labelWidth }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  box_label: {
    backgroundColor: 'yellow'
  },
  box_label_text: {
    fontSize: UnitConvert.dpi(30),
    color: '#333'
  }
})
