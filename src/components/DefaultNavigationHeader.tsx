import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import { commonStyle } from '@/constant/commonStyle'
import { RootStackNavigation } from '../router'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ENV_ICON } from '@/constant/image/icon'
import { UnitConvert } from '@/utils/unitConvert'
import { Constant } from '../constant'

interface IProps {
  navigation?: RootStackNavigation,
  title?: string | Function | undefined,      // 标题
  showBorder?: boolean,                       // 是否展示border
  showLeftIcon?: boolean,                     // 是否展示左边的图标
  showRightFirstIcon?: boolean,               // 是否展示右侧第一个按钮
  showRightSecondIcon?: boolean,              // 是否展示右侧第二个图标
  leftIconSource?: number,                    // 自定义左边的图标
  rightFirstIconSource?: number,              // 自定义右侧第一个图标
  rightSecondIconSource?: number,             // 自定义右侧第二个图标
  leftCallBack: Function,                     // 左侧按钮的回调
  rightFirstCallBack: Function,               // 右侧第一个按钮的回调
  rightSecondCallBack: Function,              // 右侧第二个按钮的回调
  rightSecondIconType?: string,                // 右侧第二个按钮的类型(img,text)
  rightSecondIconText?: string                 
}

export default class DefaultNavigationHeader extends Component<IProps> {
  static defaultProps = {
    title: '标题',
    leftIconSource: ENV_ICON.icon_top_left,
    showBorder: true,
    leftCallBack: () => { },
    showLeftIcon: false,
    showRightFirstIcon: false,
    showRightSecondIcon: false,
    rightFirstIconSource: ENV_ICON.icon_top_screen,
    rightFirstCallBack: () => {},
    rightSecondCallBack: () => {},
    rightSecondIconType: 'img',
    rightSecondIconText: '保存',
    rightSecondIconSource: ENV_ICON.icon_top_search
  }

  render() {
    return (
      <View style={[styles.header, this.props.showBorder ? commonStyle.commonBorder : null]}>
        {this.props.showLeftIcon ? (
          <TouchableOpacity
            onPress={() => {
              if (this.props.navigation) {
                this.props.navigation.goBack()
              }
              this.props.leftCallBack()
            }}
            style={styles.header_left}
          >
            {/* @ts-ignore */}
            <Image source={this.props.leftIconSource} style={[commonStyle.icon]} />
          </TouchableOpacity>
        ) : (
          <View style={styles.header_left}></View>
        )}
        <Text style={styles.header_title}> {this.props.title} </Text>
        <View style={styles.header_right}>
          {
            this.props.showRightFirstIcon ? (
              <TouchableOpacity onPress={() => this.props.rightFirstCallBack()}>
                {/* @ts-ignore */}
                <Image source={this.props.rightFirstIconSource} style={commonStyle.icon} />
              </TouchableOpacity>
            ) : null
          }
          {
            this.props.showRightSecondIcon ? (
              <TouchableOpacity onPress={() => this.props.rightSecondCallBack()}>
                {
                  this.props.rightSecondIconType === 'img' ? (
                    // @ts-ignore
                    <Image source={this.props.rightSecondIconSource} style={[styles.header_right_second_img, commonStyle.icon]} />
                  ) : (
                      <Text style={styles.header_right_second_text}>{this.props.rightSecondIconText}</Text>
                    )
                }
              </TouchableOpacity>
            ) : null
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    width: UnitConvert.w,
    height: Constant.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  header_left: {
    width: UnitConvert.dpi(140),
    height: UnitConvert.dpi(60),
  },
  header_title: {
    flex: 1,
    textAlign: 'center',
    fontSize: Constant.headerTitleSize,
    fontWeight: '600',
  },
  header_right: {
    width: UnitConvert.dpi(140),
    height: UnitConvert.dpi(60),
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  header_right_second_img: {
    marginRight: UnitConvert.dpi(10),
  },
  header_right_second_text: {
    fontSize: UnitConvert.dpi(30),
    color: '#000',
    marginRight: UnitConvert.dpi(30),
    marginTop: UnitConvert.dpi(8)
  }
})
