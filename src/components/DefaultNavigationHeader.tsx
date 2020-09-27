import React from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import CommonStyle from '@/utils/constant/Style'
import { RootStackNavigation } from '../router'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ENV_ICON } from '@/assets/styles/picUrl'
import { UnitConvert } from '@/utils/unitConvert'

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

const DefaultNavigationHeader = (props: IProps) => {
  return (
    <View style={[styles.header, props.showBorder ? CommonStyle.commonBorder : null]}>
      {props.showLeftIcon ? (
        <TouchableOpacity
          onPress={() => {
            if (props.navigation) {
              props.navigation.goBack()
            }
            props.leftCallBack()
          }}
          style={styles.header_left}
        >
          {/* @ts-ignore */}
          <Image source={props.leftIconSource} style={[CommonStyle.img]} />
        </TouchableOpacity>
      ) : (
        <View style={styles.header_left}></View>
      )}
      <Text style={styles.header_title}> {props.title} </Text>
      <View style={styles.header_right}>
        {
          props.showRightFirstIcon ? (
            <TouchableOpacity onPress={() => props.rightFirstCallBack()}>
              {/* @ts-ignore */}
              <Image source={props.rightFirstIconSource} style={CommonStyle.img} />
            </TouchableOpacity>
          ) : null
        }
        {
          props.showRightSecondIcon ? (
            <TouchableOpacity onPress={() => props.rightSecondCallBack()}>
              {
                props.rightSecondIconType === 'img' ? (
                  // @ts-ignore
                  <Image source={props.rightSecondIconSource} style={[styles.header_right_second_img, CommonStyle.img]} />
                ) : (
                    <Text style={styles.header_right_second_text}>{props.rightSecondIconText}</Text>
                  )
              }
            </TouchableOpacity>
          ) : null
        }
      </View>
    </View>
  )
}

DefaultNavigationHeader.defaultProps = {
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

export default DefaultNavigationHeader

const styles = StyleSheet.create({
  header: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(90),
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
    fontSize: UnitConvert.dpi(36),
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
