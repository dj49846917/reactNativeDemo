import { Model, Effect } from 'dva-core-ts'
import { Reducer } from 'react'

export interface HomeState {
  num: number
}

interface HomeModel extends Model {
  namespace: string;
  state: HomeState;
  reducers: {
    add: Reducer<HomeState, any>;
    asyncAddResult: Reducer<HomeState, any>;
  }
  effects: {
    asyncAdd: Effect
  }
}

const initialState: HomeState = {
  num: 0
}

type codeType = { // 定义页面传过来的对象类型
  num: number,
  initNumber: number
}

function delay(code: codeType) {
  return code.num + code.initNumber
}

const Home: HomeModel = {
  namespace: 'home',
  state: initialState,
  effects: {
    *asyncAdd({ payload }, { call, put }) {
      const res = yield call(delay, payload)
      yield put({
        type: 'asyncAddResult',
        payload: res,
      })
    }
  },
  reducers: {
    add(state = initialState, { payload }) {
      console.log('payload', payload)
      return {
        ...state,
        num: state.num + payload.num
      }
    },
    asyncAddResult(state = initialState, { payload }) {
      console.log('payload', payload)
      return {
        ...state,
        num: payload
      }
    }
  }
}

export default Home