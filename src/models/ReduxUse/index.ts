/*
 * @Author: your name
 * @Date: 2020-11-02 22:18:25
 * @LastEditTime: 2020-11-02 22:38:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeDemo\src\models\ReduxUse\index.ts
 */
import { Model, Effect } from 'dva-core-ts'
import { Reducer } from 'react'

const SecondHouseData = [{
  "ID": 10093,
  "CustomerName": "小鱼",
  "RegionId": 1110002,
  "AssetIntroduce": "欢乐谷   轻轨站  ",
  "AssetName": "华侨城",
  "PropertyAddress": "渝北区嘉吉路258号1幢5-2",
  "PropertyInsideArea": 100,
  "ProposalPrice": 1250000,
  "PropertyArea": 120,
  "State": 2008001,
  "AssetTypeSecondLevel": 1310001,
  "HuXingTypeF": 3,
  "HuXingTypeT": 2,
  "HuXingTypeW": 1,
  "HuXingTypeY": 1,
  "Orientations": -1,
  "FloorType": 2032002,
  "SellMoney": 0,
  "IsElevator": 1000001,
  "Keys": 1000002,
  "Renovation": 2004001,
  "SourceType": 2006001,
  "PropertyPurpose": 2003001,
  "ChannelBusinessID": 11,
  "Floor": 5,
  "MainFloor": 9,
  "Years": -1,
  "CreateUser": "mali1",
  "CreateUserName": "马丽总监",
  "CreateDate": "2020-09-18T16:00:09.297+08:00",
  "PropertyOwnershipNO": "渝（2020）渝北区002586号",
  "Remark": "",
  "Introduce": "",
  "TempCustomerName": "小鱼",
  "TempCustomerMobile": "15825865641",
  "APPHouseSourceID": null,
  "OldCreateUser": null,
  "OldCreateDate": null,
  "OldCreateUserName": null,
  "BorkerRegionUser": "dujiang",
  "DepartmentName": "重庆荣投房地产经纪有限公司",
  "EntrustSellAgreementPrice": 0,
  "EntrustSellAgreementAgreementDate": null,
  "EntrustSellAgreementAgreementEndDate": null,
  "EntrustSellAgreementAgreementType": "0",
  "BusinessTypeName": "房源渠道商家",
  "CompanyName": "个人",
  "PicUrl": "http://192.168.10.41/group1/M00/01/0F/wKgKKV9kaNCARxJ6AAAS1xwwcX8965.png"
}]

export interface ReduxUseState {
  list: any[]
}

interface ReduxUseModel extends Model {
  namespace: string;
  state: ReduxUseState;
  reducers: {
    // getBarHeight: Reducer<ReduxUseState, any>;
  }
  effects: {
    getList: Effect
  }
}

const initialState: ReduxUseState = {
  list: []
}

const ReduxUse: ReduxUseModel = {
  namespace: 'reduxUse',
  state: initialState,
  effects: {
    *getList({ payload }, { call, put }) {
      const data = SecondHouseData
      yield put({
        type: 'setList',
        payload: data,
      })
    }
  },
  reducers: {
    setList(state = initialState, { payload }) {
      console.log('payload', payload)
      return {
        ...state,
        list: payload
      }
    },
  }
}

export default ReduxUse