/*
 * @Author: your name
 * @Date: 2020-11-08 13:49:35
 * @LastEditTime: 2020-11-08 14:13:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeDemo\src\models\RequestData\index.ts
 */
import { Model, Effect } from 'dva-core-ts'
import { Reducer } from 'react'
import { getMyList } from '../../service/requestData'

export interface RequestDataState {
  list: any[]
}

interface RequestDataModel extends Model {
  namespace: string;
  state: RequestDataState;
  reducers: {
    setList: Reducer<RequestDataState, any>;
  }
  effects: {
    getList: Effect
  }
}

const initialState: RequestDataState = {
  list: []
}

const RequestData: RequestDataModel = {
  namespace: 'requestData',
  state: initialState,
  effects: {
    *getList({ payload }, { call, put }) {
      console.log('payload', payload)
      const res = yield call(getMyList, payload)
      if (res.code === 200) {
        yield put({
          type: 'setList',
          payload: res.value,
        })
      }
    }
  },
  reducers: {
    setList(state = initialState, { payload }) {
      return {
        ...state,
        list: payload
      }
    },
  }
}

export default RequestData