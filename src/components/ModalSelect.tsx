import React, { Component } from 'react'
import { Text, StyleSheet, View, ModalProps } from 'react-native'
import Modal from 'react-native-modalbox'
import Picker, { PickerOptions } from 'react-native-picker'
import { UnitConvert } from '@/utils/unitConvert'

interface Iprops {
  cancelCallback: Function;                                             // 点击取消按钮的回调
  okCallback: Function;                                                 // 点击确定按钮的回调
  pickerData: any[];                                                    // 数据源不能为空数组，不然也会报错
}
type modalType = Iprops & ModalProps & PickerOptions

interface IState {

}

export default class ModalSelect extends Component<modalType, IState> {
  static defaultProps = {
    pickerTitleText: '标题',
    pickerCancelBtnText: '取消',
    pickerConfirmBtnText: '确定',
    pickerBg: [255, 255, 255, 1],
    pickerConfirmBtnColor: [199, 22, 34, 1],
    pickerCancelBtnColor: [199, 22, 34, 1],
    pickerTitleColor: [0, 0, 0, 1],
    pickerToolBarBg: [255, 255, 255, 1],
  }

  constructor(props: modalType) {
    super(props)
    this.state = {}
  }

  modal: any = {}

  _showDatePicker = () => {
    Picker.init({
      pickerTitleText: '标题',
      pickerCancelBtnText: '取消',
      pickerConfirmBtnText: '确定',
      pickerBg: [255, 255, 255, 1],
      pickerConfirmBtnColor: [199, 22, 34, 1],
      pickerCancelBtnColor: [199, 22, 34, 1],
      pickerTitleColor: [0, 0, 0, 1],
      pickerToolBarBg: [255, 255, 255, 1],
      onPickerCancel: (data) => {
        this.props.cancelCallback(data)
      },
      onPickerConfirm: (data) => {
        this.props.okCallback(data)
      },
      ...this.props
    });
    Picker.show();
  }

  render() {
    return (
      <Modal
        {...this.props}
        ref={(ref) => {
          this.modal = ref
        }}
        position='bottom'
        style={styles.box}
      >
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(1)
  }
})
