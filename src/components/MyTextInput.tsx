import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, TextInputProps, Image, TouchableHighlight, StyleProp, ViewStyle, Keyboard, TextStyle } from 'react-native'
import { UnitConvert } from '@/utils/unitConvert'
import CommonStyle from '@/utils/constant/Style'
import { ENV_ICON } from '@/assets/styles/picUrl'

export interface Iprops {
  height: number,                            // 输入框的高度
  width: number,                             // 输入框的宽度
  showBorder: boolean,                       // 是否展示底部边框
  showLabel: boolean,                        // 是否展示左侧的标题栏
  labelWidth: number                         // 标题栏的宽度
  lableStyle: StyleProp<ViewStyle>,          // 文字提示的样式
  inputStyle: StyleProp<TextStyle>,          // 输入框区域的样式
  required: boolean,                         // 是否必输
  flelds: string,                            // 字段名
  defaultValue: string | Function,          // 初始值 
  getFieldsValue: Function,                  // 在onChangeText里的回调用来覆盖onChangeText事件
  showClearIcon: boolean,                   // 是否展示清除按钮
  clearIconSource: number,                   // 清除按钮的图标路径
  bgColor: string,                            // 背景颜色
  readOnly: boolean,                        // 是否只读
}

type inputProps = Iprops & TextInputProps // TextInputProps为textInput的所有属性类型

interface IState { // state的定义
  isClear: boolean,
  value?: string | Function
}

export default class MyTextInput extends Component<inputProps, IState> {
  static defaultProps = {
    height: UnitConvert.dpi(90),
    width: UnitConvert.w,
    showBorder: true,
    showLabel: true,
    readOnly: false,
    labelWidth: UnitConvert.dpi(228),
    lableStyle: {},
    required: false,
    inputStyle: {},
    defaultValue: '',
    showClearIcon: false,
    clearIconSource: ENV_ICON.icon_off,
    bgColor: '#fff'
  }

  constructor(props: inputProps) {
    super(props)
    this.state = {
      isClear: false,
      value: props.defaultValue, // 输入框里的值
    }
  }

  inputRef: any = {} // 输入框的ref

  // 渲染清除按钮图标
  showClearComponent = () => {
    if (this.props.showClearIcon) {
      if (this.state.value) {
        return (
          <TouchableHighlight
            underlayColor='transparent'
            style={[styles.box_ipnut_clear, CommonStyle.img]}
            onPress={() => {
              this.inputRef.clear() // 清除数据
              this.setState({
                value: '',
              })
              this.props.getFieldsValue('')
            }}
          >
            <Image source={this.props.clearIconSource} style={CommonStyle.img} />
          </TouchableHighlight>
        )
      }
    }
  }

  render() {
    return (
      <View style={[styles.box, { height: this.props.height, width: this.props.width, backgroundColor: this.props.bgColor }, this.props.showBorder ? CommonStyle.commonBorder : null]}>
        {this.props.showLabel ? (
          <View style={[styles.box_label, { width: this.props.labelWidth }, this.props.lableStyle]}>
            <Text style={styles.box_label_text}>{this.props.flelds}</Text>
            {this.props.required ? (
              <Text style={styles.box_lable_must}> *</Text>
            ) : null}
          </View>
        ) : null}
        {
          this.props.readOnly ? (
            <View style={styles.box_input}>
              <Text style={[this.props.inputStyle, styles.box_input_select]}>{this.props.defaultValue}</Text>
            </View>
          ) : (
              <View style={styles.box_input}>
                <TextInput
                  placeholderTextColor='#999'
                  ref={(ref) => {
                    this.inputRef = ref
                  }}
                  {...this.props}
                  onChangeText={(val) => {
                    this.setState({
                      value: val,
                    })
                    this.props.getFieldsValue(val)
                  }}
                  style={[{
                    width: this.props.showClearIcon ? this.props.width - this.props.labelWidth - UnitConvert.dpi(60) : this.props.width - this.props.labelWidth,
                    fontSize: UnitConvert.dpi(30),
                    padding: 0,
                    textAlignVertical: 'center'
                  }, this.props.inputStyle]}
                />
                {this.showClearComponent()}
              </View>
            )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box_label: {
    flexDirection: 'row',
  },
  box_label_text: {
    fontSize: UnitConvert.dpi(30),
    color: '#333'
  },
  box_lable_must: {
    fontSize: UnitConvert.dpi(30),
    color: 'red'
  },
  box_input: {
    flex: 1,
    position: 'relative',
  },
  box_ipnut_clear: {
    position: 'absolute',
    right: UnitConvert.dpi(0),
    top: UnitConvert.dpi(16),
  },
  box_input_select: {
    fontSize: UnitConvert.dpi(30),
    color: '#000'
  }
})
