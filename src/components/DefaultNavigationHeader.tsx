import React from 'react'
import { Text, StyleSheet, View, Image, StyleProp, ViewStyle } from 'react-native'
import CommonStyle from '@/utils/constant/Style'
import { RootStackNavigation } from '../router'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ENV_ICON } from '@/assets/styles/picUrl'
import { UnitConvert } from '@/utils/unitConvert'
import MyTextInput from './MyTextInput'

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
  rightSecondIconType?: string,               // 右侧第二个按钮的类型(img,text)
  rightSecondIconText?: string,               // 右侧第二个按钮的内容
  mode: string,                               // 导航的类型(input, text)
  changeSearchValue: Function                 // 点击搜索按钮的回调
  getSearchData: Function                     // 输入的值
  defaultValue: string | undefined            // 输入框初始值
  placeholder?: string                        // input的提示
  inputWidth?: number                         // input的宽度   
  rightSecondStyle?: StyleProp<ViewStyle>     // 右侧第二个按钮的样式    
}

const DefaultNavigationHeader = (props: IProps) => {
  // 中间的样式
  const centerStyle = () => {
    if(props.showRightFirstIcon && props.showRightSecondIcon) {
      if(props.showLeftIcon) {
        return styles.header_center
      } else {
        return styles.header_center_withoutleft
      }
    } else if(props.showRightFirstIcon || props.showRightSecondIcon) {
      if(props.showLeftIcon) {
        return styles.header_center_one
      } else {
        return styles.header_center_withoutleft
      }
    }
  }

  // 输入框的宽度计算
  const centerInputStyle = () => {
    if(props.showRightFirstIcon && props.showRightSecondIcon) {
      return UnitConvert.dpi(440)
    } else if(props.showRightFirstIcon || props.showRightSecondIcon) {
      return UnitConvert.dpi(500)
    }
  }

  // 右侧的样式
  const rightStyle = () => {
    if (props.mode === 'text') {
      return styles.header_right
    } else if (props.showRightFirstIcon && props.showRightSecondIcon) {
      return styles.header_right2
    } else if (props.showRightFirstIcon || props.showRightSecondIcon) {
      return styles.header_right_one
    } else {
      return null
    }
  }

  return (
    <View style={[styles.header, props.showBorder ? CommonStyle.commonBorder : null, {justifyContent: props.mode === 'text' ? 'space-between' : 'flex-start'}]}>
      {props.showLeftIcon ? (
        <TouchableOpacity
          onPress={() => {
            if (props.navigation) {
              props.navigation.goBack()
            }
            props.leftCallBack()
          }}
          style={props.mode === 'text' ? styles.header_left : styles.header_left_input}
        >
          {/* @ts-ignore */}
          <Image source={props.leftIconSource} style={[styles.left_img]} />
        </TouchableOpacity>
      ) : (
          <>
            {props.mode === 'text' ? <View style={styles.header_left}></View> : null}
          </>
        )}
      {
        props.mode === 'text' ? (
          <Text style={styles.header_title}> {props.title} </Text>
        ) : (
          <View style={[centerStyle(), {width: props.inputWidth}]}>
            <TouchableOpacity onPress={()=>props.changeSearchValue()}>
              <Image source={ENV_ICON.input_search} style={styles.header_search_icon} />
            </TouchableOpacity>
            <MyTextInput
              defaultValue={props.defaultValue}
              flelds='小区名'
              placeholder={props.placeholder}
              getFieldsValue={(v: string)=>props.getSearchData(v)}
              keyboardType={'default'}
              bgColor={'#F7F7F7'}
              width={props.inputWidth ? (props.inputWidth - UnitConvert.dpi(60)) : centerInputStyle()}
              height={UnitConvert.dpi(56)}
              labelWidth={0}
              showLabel={false}
            />
          </View>
        )
      }
      <View style={rightStyle()}>
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
            <TouchableOpacity onPress={() => props.rightSecondCallBack()}
              style={props.rightSecondStyle}
            >
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
  rightFirstCallBack: () => { },
  rightSecondCallBack: () => { },
  rightSecondIconType: 'img',
  rightSecondIconText: '保存',
  rightSecondIconSource: ENV_ICON.icon_top_search,
  mode: 'text',
  changeSearchValue: ()=>{},
  defaultValue: '',
  getSearchData: ()=>{}
}

export default DefaultNavigationHeader

const styles = StyleSheet.create({
  header: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(90),
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  header_left: {
    width: UnitConvert.dpi(140),
    height: UnitConvert.dpi(60),

  },
  left_img: {
    width: UnitConvert.dpi(60),
    height: UnitConvert.dpi(60),
    marginLeft: UnitConvert.dpi(10)
  },
  header_left_input: {
    width: UnitConvert.dpi(80),
    height: UnitConvert.dpi(60),
  },
  header_title: {
    flex: 1,
    textAlign: 'center',
    fontSize: UnitConvert.dpi(36),
    fontWeight: '600',
  },
  header_center: {
    width: UnitConvert.dpi(500),
    height: UnitConvert.dpi(56),
    backgroundColor: '#f7f7f7',
    flexDirection: 'row'
  },
  header_center_withoutleft: {
    marginLeft: UnitConvert.dpi(30),
    width: UnitConvert.dpi(624),
    height: UnitConvert.dpi(56),
    backgroundColor: '#f7f7f7',
    flexDirection: 'row'
  },
  header_search_icon: {
    position: 'relative',
    top: UnitConvert.dpi(0),
    left: 0,
    zIndex: 200,
    width: UnitConvert.dpi(56),
    height: UnitConvert.dpi(56),
    backgroundColor: '#f7f7f7',
  },
  header_center_one: {
    width: UnitConvert.dpi(560),
    height: UnitConvert.dpi(56),
    flexDirection: 'row'
  },
  header_right: {
    width: UnitConvert.dpi(140),
    height: UnitConvert.dpi(60),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  header_right2: {
    flex: 1,
    height: UnitConvert.dpi(60),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  header_right_one: {
    width: UnitConvert.dpi(80),
    height: UnitConvert.dpi(60),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  header_right_second_img: {
    marginRight: UnitConvert.dpi(10),
  },
  header_right_second_text: {
    fontSize: UnitConvert.dpi(30),
    color: '#000',
    // marginRight: UnitConvert.dpi(20),
    // marginTop: UnitConvert.dpi(30)
  }
})
