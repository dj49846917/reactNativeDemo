import React, { Component } from 'react'
import { Text, View, StyleSheet, StyleProp, ViewStyle, TouchableHighlight, Image, ImageSourcePropType } from 'react-native'
import Modal, { ModalProps } from 'react-native-modalbox'
import { UnitConvert } from '@/utils/unitConvert'
import { commonStyle } from '@/constant/commonStyle'
import { Constant } from '../constant'
import { ENV_ICON } from '@/constant/image/icon'

interface Iprops {
  contentStyle?: StyleProp<ViewStyle>,                                  // 内容区域的样式
  headerView?: React.ComponentType<any> | React.ReactElement | null,    // 头部自定义布局
  headerHeight?: string,                                                // 头部的高度
  title?: string,                                                       // 标题
  modalType?: string,                                                   // 弹窗的类型('select', 'tip', 'comfirm')
  headerTitleStyle?: StyleProp<ViewStyle>,                              // 顶部标题的样式
  closeIconSource?: any,                                                // 自定义关闭图标
  showCloseIcon?: boolean,                                              // 是否展示关闭按钮图标
  onCancel: Function,                                                   // 点击取消按钮的回调
  onOk: Function,                                                       // 点击确定时的回调
  content?: string | Function,                                          // 主体内容文字
  contentView?: React.ComponentType<any> | React.ReactElement | null,   // 自定义主体内容
  footerView?: React.ComponentType<any> | React.ReactElement | null,    // 底部自定义内容
  showFooter?: boolean,                                                 // 是否展示底部
}

interface Istate {

}

type modalProps = Iprops & ModalProps

export default class ModalBox extends Component<modalProps, Istate> {
  static defaultProps = {
    style: {
      width: UnitConvert.dpi(580),
      height: UnitConvert.dpi(450)
    },
    title: '标题',
    headerHeight: UnitConvert.dpi(80),
    modalType: 'tip', // 默认展示tip弹窗
    showCloseIcon: true,
    closeIconSource: ENV_ICON.icon_top_off,
    onCancel: () => { },
    onOk: () => { },
    content: '这是一段示例文字',
    showFooter: true
  }

  modal: any = {}

  showHeaderComponent = () => {
    if (this.props.headerView) {
      return this.props.headerView
    } else {
      if (this.props.modalType === 'select') {
        return (
          <View style={[commonStyle.commonBorder, styles.modal_header, { height: this.props.headerHeight }]}>
            <TouchableHighlight
              style={styles.modal_header_left}
              onPress={() => {
                this.modal.close()
                this.props.onCancel()
              }}
            >
              <Text style={styles.modal_header_left_text}>取消</Text>
            </TouchableHighlight>
            <Text style={[styles.modal_title, this.props.headerTitleStyle]}>{this.props.title}</Text>
            <TouchableHighlight
              style={styles.modal_header_right}
              onPress={() => {
                this.modal.close()
              }}
            >
              <Text style={styles.modal_header_right_text}>确定</Text>
            </TouchableHighlight>
          </View>
        )
      } else if (this.props.modalType === 'tip') {
        return (
          <View style={[commonStyle.commonBorder, styles.modal_header, { height: this.props.headerHeight }]}>
            <View style={styles.modal_header_left}></View>
            <Text style={[styles.modal_title, this.props.headerTitleStyle]}>{this.props.title}</Text>
            <View style={styles.modal_header_right_tip}>
              {this.props.showCloseIcon ? (
                <TouchableHighlight
                  onPress={() => {
                    this.modal.close()
                    this.props.onCancel()
                  }}
                >
                  <Image source={this.props.closeIconSource} style={commonStyle.icon} />
                </TouchableHighlight>
              ) : null}
            </View>
          </View>
        )
      } else {

      }
    }
  }

  showFooterComponent = () => {
    if(this.props.showFooter) {
      
    }
  }

  render() {
    return (
      <Modal
        ref={(ref) => {
          this.modal = ref
        }}
        {...this.props}
        swipeToClose={false}
      >
        <View style={[styles.modal_box, this.props.contentStyle]}>
          {this.showHeaderComponent()}
          {
            this.props.contentView ? this.props.contentView : (
              <View style={styles.modal_content}>
                <Text>{this.props.content}</Text>
              </View>
            )
          }
          { this.showFooterComponent() }
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modal_title: {
    fontSize: UnitConvert.dpi(30),
    color: '#000'
  },
  modal_header_left: {
    width: UnitConvert.dpi(120),
    alignItems: 'flex-start',
    paddingLeft: UnitConvert.dpi(30)
  },
  modal_header_left_text: {
    fontSize: UnitConvert.dpi(30),
    color: Constant.commonColor.danger
  },
  modal_header_right: {
    width: UnitConvert.dpi(120),
    alignItems: 'flex-end',
    paddingRight: UnitConvert.dpi(30)
  },
  modal_header_right_tip: {
    width: UnitConvert.dpi(120),
    alignItems: 'flex-end',
    paddingRight: UnitConvert.dpi(10)
  },
  modal_header_right_text: {
    fontSize: UnitConvert.dpi(30),
    color: Constant.commonColor.danger
  },
  modal_content: {
    flex: 1,
    paddingHorizontal: UnitConvert.dpi(30)
  }
})
