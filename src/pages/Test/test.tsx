import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Keyboard } from 'react-native'
import MyTextInput from '@/components/MyTextInput'
import { UnitConvert } from '@/utils/unitConvert'
import { ErrorNotice } from '@/utils/errorNotice'
import { VerifyUtil } from '@/utils/verifyUtil'
import ModalComfirm from '@/components/ModalComfirm'
import ModalTip from '@/components/ModalTip'

interface Iprops { }
interface IState {
  name: string
}

export default class Test extends Component<Iprops, IState> {
  constructor(props: Iprops) {
    super(props)
    this.state = {
      name: '',
    }
  }
  child: any = {}
  modalRef: any = {} // 对话框的ref
  modalTip: any = {} // 提示框的ref

  render() {
    return (
      <>
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
          <TouchableOpacity
            style={styles.modal_box}
            onPress={() => {
              this.modalRef.modal.open()
            }}
          >
            <Text style={styles.modal_box_text}>点击对话框ModalComfirm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modal_box}
            onPress={() => {
              this.modalTip.modal.open()
            }}
          >
            <Text style={styles.modal_box_text}>点击提示框ModalTip</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <ModalComfirm
          ref={(ref) => { this.modalRef = ref }}
        />
        <ModalTip
          ref={(ref) => { this.modalTip = ref }}
        />
      </>
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
  },
  modal_box: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(80),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c71622',
    marginTop: UnitConvert.dpi(30)
  },
  modal_box_text: {
    fontSize: UnitConvert.dpi(28),
    color: '#fff'
  }
})
