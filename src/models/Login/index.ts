import { Model, Effect } from 'dva-core-ts'
import { Reducer } from 'react'

// 定义 state的类型
export interface LoginState {
  userData: any,
  password: string
}

// 定义model的类型
interface LoginModel extends Model {
  namespace: string
  state: LoginState
  effects: {
    
  }
  reducers: {
    setLoginInfo: Reducer<LoginState, any>;
  }
}

// 初始值
const initialState: LoginState = {
  userData: {},
  password: ''
}

const Login: LoginModel = {
  namespace: 'login',
  state: initialState,
  effects: {
    
  },
  reducers: {
    setLoginInfo(state = initialState, { payload }) {
      console.log('payload.userData', payload.userData)
      return {
        ...state,
        userData: payload.userData ? JSON.parse(payload.userData) : {},
        password: payload.password
      }
    },
  }
}
export default Login
