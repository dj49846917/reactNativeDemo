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
  account_category_arr: [
    { id: '0', icon_url: ENV_ICON.icon_zl, title: '我的资料' },
    { id: '1', icon_url: ENV_ICON.icon_tj, title: '我的推荐' },
    { id: '2', icon_url: ENV_ICON.icon_cj, title: '我的成交' },
    { id: '3', icon_url: ENV_ICON.icon_card, title: '我的银行卡' },
    { id: '4', icon_url: ENV_ICON.icon_sy, title: '我的收益' },
    { id: '5', icon_url: ENV_ICON.icon_kefu, title: '联系客服' }
  ],
  collection_tab_arr: [
    { id: '0', val: '资产拍卖' },
    { id: '1', val: '司法拍卖' },
    { id: '2', val: '二手房' },
  ],
  recommend_tab_arr: [
    { id: '0', val: '客源' },
    { id: '1', val: '房源' },
  ]
}