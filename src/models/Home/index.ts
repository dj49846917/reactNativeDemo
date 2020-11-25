import { Model, Effect } from 'dva-core-ts'
import { Reducer } from 'react'

export interface HomeState {
  barHeight: number
}

interface HomeModel extends Model {
  namespace: string;
  state: HomeState;
  reducers: {
    getBarHeight: Reducer<HomeState, any>;
  }
  effects: {}
}

const initialState: HomeState = {
  barHeight: 0
}

const Home: HomeModel = {
  namespace: 'home',
  state: initialState,
  effects: {},
  reducers: {
    getBarHeight(state = initialState, { payload }) {
      console.log('payload', payload)
      return {
        ...state,
        barHeight: payload.barHeight
      }
    },
  }
}

export default Home