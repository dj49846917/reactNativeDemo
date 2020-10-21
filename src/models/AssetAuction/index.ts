import { Model, Effect } from 'dva-core-ts'
import { Reducer } from 'react'
import { AssetDic } from '@/assets/data/AssetAuction'
import { dicType } from '../Recommend'

// 定义 state的类型
export interface AssetAuctionState {
  dicArr: dicType[]                             // 数据字典
}

// 定义model的类型
interface AssetAuctionModel extends Model {
  namespace: string
  state: AssetAuctionState
  effects: {
    getSysDic: Effect
  }
  reducers: {
    setSysDic: Reducer<AssetAuctionState, any>,       // 数据字典赋值
  }
}

// 初始值
const initailState: AssetAuctionState = {
  dicArr: [],
}

const AssetAuction: AssetAuctionModel = {
  namespace: 'assetAuction',
  state: initailState,
  effects: {
    *getSysDic({ payload }, { call, put }) {
      let arr: { DicCode: number; DicName: string; SubTypeCode: number; BaseTypeCode: number }[] = []
      if (payload.params.length > 0) {
        AssetDic.forEach(item => {
          payload.params.forEach((it: number) => {
            if (item.SubTypeCode === it) {
              arr.push(item)
            }
          })
        })
      }
      yield put({
        type: 'setSysDic',
        payload: arr,
      })
    }
  },
  reducers: {
    // 给数据字典赋值
    setSysDic(state = initailState, { payload }) {
      return {
        ...state,
        dicArr: payload
      }
    },
  }
}
export default AssetAuction
