'use strict';
import {
  Dimensions,
  PixelRatio,
  Platform,
  StatusBar,
  NativeModules
} from 'react-native';
// import { getStatusBarHeight } from '@/utils/utils'

// 手机屏幕的宽高
const { height, width } = Dimensions.get('window');

//UI设计图的宽度
const designWidth = 750
//UI设计图的高度
const designHeight = 1334

// 定义UnitConvert的类型
type UnitConvertType = { 
  px1: number,
  dpi: Function,
  w: number,
  h: number,
  ToDeviceWidth: Function,
  ToDeviceHeight: Function,
  // statusBarHeight: number | undefined
}

//屏幕单位转换
export let UnitConvert:UnitConvertType = {
  px1: 1 / PixelRatio.get(),
  dpi: (w: number) => {
    return w / designWidth * width;
  },
  w: width,
  h: height,
  ToDeviceWidth: (w: number) => { return w * designWidth / width; },
  ToDeviceHeight: (h: number) => { return h * designHeight / height; },
  // statusBarHeight: getStatusBarHeight(),
}
