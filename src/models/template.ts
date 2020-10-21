import { Model, Effect } from 'dva-core-ts'
import { Reducer } from 'react'

export interface TemplateState {
  num: number
}

interface TemplateModel extends Model {
  namespace: string;
  state: TemplateState;
  reducers: {
    add: Reducer<TemplateState, any>;
    asyncAddResult: Reducer<TemplateState, any>;
  }
  effects: {
    asyncAdd: Effect
  }
}

const initialState: TemplateState = {
  num: 0
}

type codeType = { // 定义页面传过来的对象类型
  num: number,
  initNumber: number
}

function delay(code: codeType) {
  return code.num + code.initNumber
}

const Template: TemplateModel = {
  namespace: 'template',
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

export default Template