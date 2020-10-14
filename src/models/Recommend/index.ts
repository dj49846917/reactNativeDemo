import { Model, Effect } from 'dva-core-ts'
import { Reducer } from 'react'
import { RecommendDicArr } from '@/assets/data/Recommend'

export interface dicType {
  DicCode: number
  DicName: string
  SubTypeCode?: number
  BaseTypeCode?: number
}

// 定义 state的类型
export interface RecommendState {
  UserName: string,                             // 客户名称
  MobilePhone: string,                          // 客户电话
  IDCard: string,                               // 身份证号
  RegionId: number | undefined,                 // 意向区域
  ViewingDate: string,                          // 看房日期
  needs: string,                                // 购房需求        
  Remark: string,                               // 备注
  visible: boolean                              // 打开下拉框弹窗
  dateVisible: boolean                          // 看房日期弹窗状态
  moreCustVisible: boolean                      // 更多需求弹窗状态
  title: string                                 // 标题
  list: dicType[]                               // 数据源
  defaultValue: string | number | undefined     // 初始值
  key: string                                  // 字段名
  dicArr: dicType[]                            // 数据字典   
}

// 定义model的类型
interface RecommendModel extends Model {
  namespace: string
  state: RecommendState
  effects: {
    getSysDic: Effect
  }
  reducers: {
    setSysDic: Reducer<RecommendState, any>,       // 数据字典赋值
    setFields: Reducer<RecommendState, any>,       // 表单赋值
    setSelectFields: Reducer<RecommendState, any>, // 下拉框赋值
    setDateFields: Reducer<RecommendState, any>,    // 日期选择框赋值
    closeModal: Reducer<RecommendState, any>,
    openModal: Reducer<RecommendState, any>,
  }
}

// 初始值
const initailState: RecommendState = {
  UserName: '',
  MobilePhone: '',
  IDCard: '',
  RegionId: undefined,
  ViewingDate: '',
  needs: '',
  Remark: '',
  visible: false,
  dateVisible: false,
  moreCustVisible: false,
  title: '',
  list: [],
  defaultValue: undefined,
  key: '',
  dicArr: []
}

const Recommend: RecommendModel = {
  namespace: 'recommend',
  state: initailState,
  effects: {
    *getSysDic({ payload }, { call, put }) {
      let arr: { DicCode: number; DicName: string; SubTypeCode: number; BaseTypeCode: number }[] = []
      if (payload.params.length > 0) {
        RecommendDicArr.forEach(item => {
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

    // 表单赋值
    setFields(state = initailState, { payload }) {
      return {
        ...state,
        [payload.key]: payload.val,
      }
    },

    // 下拉框赋值
    setSelectFields(state = initailState, { payload }) {
      return {
        ...state,
        [payload.key]: payload.val,
        defaultValue: payload.val
      }
    },

    // 看房日期赋值
    setDateFields(state = initailState, { payload }) {
      return {
        ...state,
        ViewingDate: payload.ViewingDate,
        dateVisible: payload.dateVisible
      }
    },

    // 打开弹窗
    openModal(state = initailState, { payload }) {
      return {
        ...state,
        visible: payload.val,
        title: payload.title,
        list: payload.list,
        defaultValue: payload.defaultValue,
        key: payload.key
      }
    },
    // 关闭弹窗
    closeModal(state = initailState, { payload }) {
      return {
        ...state,
        visible: payload.val
      }
    }
  }
}
export default Recommend
