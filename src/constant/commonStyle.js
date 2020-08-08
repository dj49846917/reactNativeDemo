import { StyleSheet } from 'react-native'
import { Constant } from '@/constant/index'

export const commonStyle = StyleSheet.create({
  icon: {
    width: Constant.iconWidth,
    height: Constant.iconWidth,
  },
  commonBorder: {
    borderBottomColor: Constant.borderBottomColor,
    borderBottomWidth: Constant.borderBottomWidth
  }
})
