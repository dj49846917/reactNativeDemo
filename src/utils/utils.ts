'use strict';
import {
  Platform,
  StatusBar,
  NativeModules
} from 'react-native';
import { UnitConvert } from '@/utils/unitConvert'

// 获取顶部状态栏的高度
export function getStatusBarHeight() {
  if (Platform.OS === 'android') {
    return StatusBar.currentHeight
  } else {
    const { StatusBarManager } = NativeModules;
    StatusBarManager.getHeight((statusBarHeight: { height: number }) => {
      return statusBarHeight.height
    });
  }
}