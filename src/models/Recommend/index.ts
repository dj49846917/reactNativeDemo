import { Model, Effect } from 'dva-core-ts'
import { Reducer } from 'react'
import { RecommendDicArr } from '@/assets/data/Recommend'

export interface dicType {
  DicCode?: number | undefined
  DicName?: string
  SubTypeCode?: number | undefined
  BaseTypeCode?: number | undefined
  AreaMin?: number
  AreaMax?: number
  select?: boolean
}

// 定义 state的类型
export interface RecommendState {
  UserName: string,                             // 客户名称
  MobilePhone: string,                          // 客户电话
  IDCard: string,                               // 身份证号
  RegionId: number | undefined,                 // 意向区域
  ViewingDate: string,                          // 看房日期
  Remark: string,                               // 备注
  visible: boolean                              // 打开下拉框弹窗
  dateVisible: boolean                          // 看房日期弹窗状态
  moreCustVisible: boolean                      // 更多需求弹窗状态
  title: string                                 // 标题
  list: dicType[]                               // 数据源
  defaultValue: string | number | undefined     // 初始值
  key: string                                   // 字段名
  dicArr: dicType[]                             // 数据字典 
  SourceByOwner: number | undefined             // 房屋来源
  OwnerName: string                             // 业主姓名
  OwnerPhone: string                            // 业主电话
  AssetName: string                             // 小区名称
  PropertyAddress: string                       // 房屋座落
  ProposalPrice: string | undefined             // 意向卖价
  PropertyArea: string                          // 建筑面积
  PropertyInsideArea: string                    // 套内面积
  PropertyUsufructGetType: number | undefined   // 土地性质
  HuXingTypeF: number | undefined               // 户型房
  HouseTypeHouse: number | undefined            // 房屋类型
  RegionIdHouse: number | undefined             // 房屋区域
  Renovation: number | undefined                // 装修情况
  Floor: number | undefined                     // 房屋楼层
  isElevator: number | undefined                // 有无电梯
  isMortgage: number | undefined                // 有无抵押
  DebtMoney: string                             // 抵押金额
  mortgageBank: string                          // 抵押银行/公司
  RemarkHouse: string                           // 备注(房源)
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
  Remark: '',
  visible: false,
  dateVisible: false,
  moreCustVisible: false,
  title: '',
  list: [],
  defaultValue: undefined,
  key: '',
  dicArr: [],
  SourceByOwner: undefined,
  OwnerName: '',
  OwnerPhone: '',
  AssetName: '',
  PropertyAddress: '',
  ProposalPrice: undefined,
  PropertyArea: '',
  PropertyInsideArea: '',
  PropertyUsufructGetType: undefined,
  HuXingTypeF: undefined,
  HouseTypeHouse: undefined,
  RegionIdHouse: undefined,
  Renovation: undefined,
  Floor: undefined,
  isElevator: undefined,
  isMortgage: undefined,
  DebtMoney: '',
  mortgageBank: '',
  RemarkHouse: ''
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
