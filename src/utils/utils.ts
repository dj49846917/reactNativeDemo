'use strict';
import {
  Platform,
  StatusBar,
  NativeModules
} from 'react-native';
import { Constant } from './constant/Constant';
import moment from 'moment'
import MyErrorNotice from '@/components/MyErrorNotice';
import VerifyUtil from './VerifyUtil';

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

/**
 * 根据不同的拍卖状态返回不同的样式
 * 
 * @param {当前列的数据} item 
 * @param {根据字段来，看下面的注释} type 
 */
export function getStatusColor(item: any, type: Number | null) {
  if (item.Status === 4700001) { // 未开始
    if (item.AuctionPrice === type || item.Status === type) {// 当前价和状态文字
      return Constant.CommonColor.success
    }
    if (item.SaleStartTime === type) {
      return `${moment(item.SaleStartTime).format('MM月DD日 HH:mm')}开始`
    }
  } else if (item.Status === 4700002) { // 进行中
    if (item.AuctionPrice === type || item.Status === type) {// 当前价和状态文字
      return Constant.CommonColor.danger
    }
    if (item.SaleStartTime === type) {
      const timer = moment(item.SaleEndTime).valueOf() - moment(new Date()).valueOf()
      return `剩${moment(timer).format('DD天HH小时mm分钟')}`
    }
  } else { // 已拍卖， 已停拍， 已流拍
    if (item.AuctionPrice === type || item.Status === type) {// 当前价和状态文字
      return Constant.CommonColor.default
    }
    if (item.Status === 4700003 || item.Status === 4700004) { // 已拍卖或者已停拍
      if (item.SaleStartTime === type) {
        return `${moment(item.SaleEndTime).format('MM月DD日 HH:mm')}结束`
      }
    } else { // 已流拍
      if (item.SaleStartTime === type) {
        return `${moment(item.SaleStartTime).format('MM月DD日 HH:mm')}开始`
      }
    }
  }
}

// 筛选数据字典里指定key的value
export function filterDicName(arr: Array<any>, key: Number) {
  let res = ''
  if (arr.length > 0) {
    arr.forEach(item => {
      if (item.DicCode === key) {
        res = item.DicName
      }
    })
    return res
  } else {
    return null
  }
}

// 金额转换
export function parseMoney(data: String | Number, secondData?: String | Number | undefined | null) {
  if (Number(data) > 0) {
    return ` ¥ ${Number(data) / 10000}万`
  } else {
    return ` ¥ ${Number(secondData) / 10000}万`
  }
}

// 根据数据字典大类筛选数据字典
export function getSubTypeList(list: any[], subTypeCode: number) {
  try {
    return list.filter((x: { SubTypeCode: number; }) => x.SubTypeCode == subTypeCode)
  } catch (e) {
    return []
  }
}

//根据字典code获取字典名称
export function findDicName(list: any[], code: number | undefined, defaultVal = "") {
  try {
    return list.find(x => x.DicCode == code).DicName;
  } catch (e) {
    return defaultVal;
  }
}

// 校验是否为空
export function validFieldsDefault(value: string, title: string) {
  if (value) {
    return true
  } else {
    MyErrorNotice({ content: title });
    return false;
  }
}

// 校验电话的正确性
export function validFieldsPhone(value: string, isRequired: boolean, title: string, emptyTitle: string) {
  if (isRequired) { // 必输
    if (value) {
      if (!VerifyUtil.CanEmptyPhone(value)) {
        MyErrorNotice({ content: title });
        return false;
      } else {
        return true
      }
    } else {
      MyErrorNotice({ content: emptyTitle });
      return false;
    }
  } else {
    if (!VerifyUtil.CanEmptyPhone(value)) {
      MyErrorNotice({ content: title });
      return false;
    } else {
      return true
    }
  }
}

// 校验身份证的正确性
export function validFieldsIdCard(value: string, isRequired: boolean, title:string, emptyTitle:string) {
  if (isRequired) { // 必输
    if (value) {
      if (!VerifyUtil.CanEmptyPhone(value)) {
        MyErrorNotice({content: title});
        return false;
      } else {
        return true
      }
    } else {
      MyErrorNotice({content: emptyTitle});
      return false;
    }
  } else {
    if (!VerifyUtil.CanEmptyIDCard(value)) {
      MyErrorNotice({content: title});
      return false;
    } else {
      return true
    }
  }
}

// 校验数据为正数
export function validFieldsPosiveNumber(value: string | undefined, isRequired: boolean, title:string, emptyTitle:string) {
  if (isRequired) { // 必输
    if (value) {
      if (!VerifyUtil.isPosiveNumber(value)) {
        MyErrorNotice({content: title});
        return false;
      } else {
        return true
      }
    } else {
      MyErrorNotice({content: emptyTitle});
      return false;
    }
  } else {
    if (value) {
      if (!VerifyUtil.isPosiveNumber(value)) {
        MyErrorNotice({content: title});
        return false;
      } else {
        return true
      }
    } else {
      return true
    }
  }
}