import { Model, Effect } from 'dva-core-ts'
import { Reducer } from 'react'

// 定义 state的类型
export interface RecommendState {
  UserName: string,                         // 客户名称
  MobilePhone: string,                      // 客户电话
  IDCard: string,                           // 身份证号
  RegionId: number,                         // 意向区域
  ViewingDate: string,                      // 看房日期
  needs: string,                            // 购房需求        
  Remark: string,                           // 备注
  visible: boolean                          // 打开弹窗
}

// 定义model的类型
interface RecommendModel extends Model {
  namespace: string
  state: RecommendState
  effects: {

  }
  reducers: {
    setFields: Reducer<RecommendState, any>,
    closeModal: Reducer<RecommendState, any>,
    openModal: Reducer<RecommendState, any>,
  }
}

// 初始值
const initailState: RecommendState = {
  UserName: '',         
  MobilePhone: '',     
  IDCard: '',           
  RegionId: 0,          
  ViewingDate: '',      
  needs: '',                 
  Remark: '',           
  visible: false        
}

const Recommend: RecommendModel = {
  namespace: 'recommend',
  state: initailState,
  effects: {},
  reducers: {
    // 表单赋值
    setFields(state = initailState, {payload}) {
      return {
        ...state,
        [payload.key]: payload.val
      }
    },
    // 打开弹窗
    openModal(state = initailState, {payload}) {
      return {
        ...state,
        visible: payload.val
      }
    },
    // 关闭弹窗
    closeModal(state = initailState, {payload}) {
      return {
        ...state,
        visible: payload.val
      }
    }
  }
}
export default Recommend
