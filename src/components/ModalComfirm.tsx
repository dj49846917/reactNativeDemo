import React, { Component } from 'react'
import { Text, StyleSheet, View, ModalProps, TouchableHighlight } from 'react-native'
import Modal from 'react-native-modalbox'
import { UnitConvert } from '@/utils/unitConvert'
import { commonStyle } from '@/constant/commonStyle'
import { Constant } from '@/constant/index'

interface Iprops {
  headerView?: React.ComponentType<any> | React.ReactElement | null,    // 头部自定义布局
  headerHeight?: string,                                                // 头部的高度
  title?: string,                                                       // 标题
  content?: string,                                                     // 内容文字
  footerView?: React.ComponentType<any> | React.ReactElement | null,    // 底部自定义布局
  footerHeight?: string,                                                // 底部高度
  cancelText?: string,                                                  // 底部左侧的按钮文字
  okText?: string,                                                      // 底部右侧的按钮文字
  cancelCallback: Function,                                             // 点击取消按钮的回调  
  okCallback: Function,                                                 // 点击确定按钮的回调     
}

interface Istate { }

type modalProps = Iprops & ModalProps

export default class ModalComfirm extends Component<modalProps, Istate> {
  static defaultProps = {
    style: {
      width: UnitConvert.dpi(580),
      height: UnitConvert.dpi(260),
      borderRadius: UnitConvert.dpi(4)
    },
    headerHeight: UnitConvert.dpi(80),
    title: '标题',
    content: '是否确认删除本条信息？',
    footerHeight: UnitConvert.dpi(80),
    cancelText: '取消',
    okText: '确定',
    cancelCallback: ()=>{},
    okCallback: ()=>{}
  }

  constructor(props: modalProps) {
    super(props)
    this.state = {

    }
  }

  modal: any = {}

  render() {
    return (
      <Modal
        ref={(ref) => {
          this.modal = ref
        }}
        {...this.props}
        swipeToClose={false}
      >
        <View style={styles.modal_box}>
          {this.props.headerView ? this.props.headerView : (
            <View style={[styles.modal_header, commonStyle.commonBorder, { height: this.props.headerHeight }]}>
              <Text style={styles.modal_header_title}>{this.props.title}</Text>
            </View>
          )}
          <View style={styles.modal_content}>
            <Text style={styles.modal_content_text}>{this.props.content}</Text>
          </View>
          {this.props.footerView ? this.props.footerView : (
            <View style={[styles.modal_footer, {height: this.props.footerHeight}]}>
              <TouchableHighlight
                underlayColor='transparent'
                onPress={()=>{
                  this.modal.close()
                  this.props.cancelCallback()
                }}
                style={styles.modal_footer_cancer}
              >
                <Text style={styles.modal_footer_text}>{this.props.cancelText}</Text>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor='transparent'
                onPress={()=>{
                  this.modal.close()
                  this.props.okCallback()
                }}
                style={styles.modal_footer_ok}
              >
                <Text style={styles.modal_footer_text}>{this.props.okText}</Text>
              </TouchableHighlight>
            </View>
          )}
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal_box: {
    flex: 1
  },
  modal_header: {
    height: UnitConvert.dpi(80),
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal_header_title: {
    fontSize: UnitConvert.dpi(30),
    color: '#000'
  },
  modal_content: {
    flex: 1,
    paddingHorizontal: UnitConvert.dpi(30),
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal_content_text: {
    fontSize: UnitConvert.dpi(28),
    color: '#888'
  },
  modal_footer: {
    height: UnitConvert.dpi(80),
    borderTopColor: Constant.borderBottomColor,
    borderTopWidth: Constant.borderBottomWidth,
    flexDirection: 'row'
  },
  modal_footer_cancer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: Constant.borderBottomColor,
    borderRightWidth: Constant.borderBottomWidth
  },
  modal_footer_ok: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal_footer_text: {
    fontSize: UnitConvert.dpi(30),
    color: Constant.commonColor.primary
  }
})
