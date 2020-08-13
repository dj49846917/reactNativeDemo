import React, { Component } from 'react'
import { Text, StyleSheet, View, ModalProps, TouchableHighlight, StyleProp, ViewStyle } from 'react-native'
import Modal from 'react-native-modalbox'
import { UnitConvert } from '@/utils/unitConvert'
import { commonStyle } from '@/constant/commonStyle'
import { Constant } from '@/constant/index'

interface Iprops {
  height?: number;                                                      // 模态框的高度
  width?: number;                                                       // 模态框的宽度
  headerView?: React.ComponentType<any> | React.ReactElement | null;    // 头部自定义布局
  headerHeight?: string;                                                // 头部的高度
  title?: string;                                                       // 标题
  content?: string;                                                     // 内容文字
  footerView?: React.ComponentType<any> | React.ReactElement | null;    // 底部自定义布局
  footerHeight?: string;                                                // 底部高度
  callback: Function;                                                   // 点击取消按钮的回调
  footerBtnWidth?: number;                                              // 底部按钮的宽度 
  footerBtnBgColor?: string;                                            // 底部按钮的背景颜色
  contentStyle?: StyleProp<ViewStyle>;                                  // 主体内容的布局
}

interface Istate { }

type modalProps = Iprops & ModalProps

export default class ModalTip extends Component<modalProps, Istate> {
  static defaultProps = {
    headerHeight: UnitConvert.dpi(80),
    title: '提示',
    content: '热无热无若翁绕弯儿热无热无若翁绕弯儿热无热无若翁绕弯儿热无热无若翁绕弯儿热无热无若翁绕弯儿',
    footerHeight: UnitConvert.dpi(110),
    callback: () => { },
    footerBtnWidth: UnitConvert.dpi(410),
    footerBtnBgColor: Constant.commonColor.danger,
    width: UnitConvert.dpi(580),
    height: UnitConvert.dpi(190),
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
        style={styles.modal_default}
      >
        <View style={[{ width: this.props.width, minHeight: this.props.height }, styles.modal_box]}>
          {this.props.headerView ? this.props.headerView : (
            <View style={[styles.modal_header, commonStyle.commonBorder, { height: this.props.headerHeight }]}>
              <Text style={styles.modal_header_title}>{this.props.title}</Text>
            </View>
          )}
          <View style={[styles.modal_content, this.props.contentStyle]}>
            <Text style={styles.modal_content_text}>{this.props.content}</Text>
          </View>
          {this.props.footerView ? this.props.footerView : (
            <View style={[styles.modal_footer, { height: this.props.footerHeight }]}>
              <TouchableHighlight
                underlayColor='transparent'
                onPress={() => {
                  this.modal.close()
                  this.props.callback()
                }}
                style={[styles.modal_footer_btn, { width: this.props.footerBtnWidth, backgroundColor: this.props.footerBtnBgColor }]}
              >
                <Text style={styles.modal_footer_btn_text}>我知道了</Text>
              </TouchableHighlight>
            </View>
          )}
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal_default: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal_box: {
    backgroundColor: '#fff',
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
    paddingHorizontal: UnitConvert.dpi(30),
    paddingVertical: UnitConvert.dpi(40),
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal_content_text: {
    fontSize: UnitConvert.dpi(28),
    color: '#000'
  },
  modal_footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modal_footer_btn: {
    height: UnitConvert.dpi(80),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: UnitConvert.dpi(4)
  },
  modal_footer_btn_text: {
    fontSize: UnitConvert.dpi(32),
    color: '#fff'
  }
})
