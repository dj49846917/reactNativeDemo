import { ENV_ICON } from "@/assets/styles/picUrl";

export const Constant = {
  locName: '重庆',                    // 地址
  commonBorderColor: '#f1f1f1',      // 边框
  defaultBgColor: '#f4f4f4',         // 页面背景色
  CommonColor: {                     // 公共颜色
    default: '#8a8a8a',
    success: '#288d65',
    danger: '#c71622',
    primary: '#639be7'
  },
  messageCount: '9',                 // 未读消息
  home_category_arr: [               // 首页分类
    { url: ENV_ICON.icon_sf, text: '司法拍卖' },
    { url: ENV_ICON.icon_zc, text: '资产拍卖' },
    { url: ENV_ICON.icon_es, text: '二手房源' },
    { url: ENV_ICON.icon_jjr, text: '置业经理' },
    { url: ENV_ICON.icon_pg, text: '评估服务' },
  ],
  home_tab_arr: [                    // 首页tab
    { id: '1', text: '资产拍卖' },
    { id: '2', text: '司法拍卖' },
    { id: '3', text: '二手房' },
  ],
  account_category_arr: [ // 我的
    { id: '0', icon_url: ENV_ICON.icon_zl, title: '我的资料' },
    { id: '1', icon_url: ENV_ICON.icon_tj, title: '我的推荐' },
    { id: '2', icon_url: ENV_ICON.icon_cj, title: '我的成交' },
    { id: '3', icon_url: ENV_ICON.icon_card, title: '我的银行卡' },
    { id: '4', icon_url: ENV_ICON.icon_sy, title: '我的收益' },
    { id: '5', icon_url: ENV_ICON.icon_kefu, title: '联系客服' }
  ],
  collection_tab_arr: [ // 收藏
    { id: '0', val: '资产拍卖' },
    { id: '1', val: '司法拍卖' },
    { id: '2', val: '二手房' },
  ],
  recommend_tab_arr: [ // 我的推荐
    { id: '0', val: '客源' },
    { id: '1', val: '房源' },
  ],
  recommend_area_arr: [
    { DicCode: 0, DicName: '小于60㎡', AreaMin: 0, AreaMax: 60 },
    { DicCode: 1, DicName: '60-80㎡', AreaMin: 60, AreaMax: 80 },
    { DicCode: 2, DicName: '80-100㎡', AreaMin: 80, AreaMax: 100 },
    { DicCode: 3, DicName: '100-120㎡', AreaMin: 100, AreaMax: 120 },
    { DicCode: 4, DicName: '120-140㎡', AreaMin: 120, AreaMax: 140 },
    { DicCode: 5, DicName: '140㎡以上', AreaMin: 140, AreaMax: undefined },
  ],
  houseTypeArr: [ // 户型多选框的数据源
    { Value: 'HuXingTypeF eq 1', DicName: '一室', DicCode: 1, select: false, id: 0 },
    { Value: 'HuXingTypeF eq 2', DicName: '二室', DicCode: 2, select: false, id: 1 },
    { Value: 'HuXingTypeF eq 3', DicName: '三室', DicCode: 3, select: false, id: 2 },
    { Value: 'HuXingTypeF eq 4', DicName: '四室', DicCode: 4, select: false, id: 3 },
    { Value: 'HuXingTypeF eq 5', DicName: '五室', DicCode: 5, select: false, id: 4 },
    { Value: 'HuXingTypeF gt 5', DicName: '五室以上', DicCode: 6, select: false, id: 5 },
  ],
}