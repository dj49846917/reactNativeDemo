import { StyleSheet } from "react-native";
import { UnitConvert } from "@/utils/unitConvert";
import { Constant } from "./Constant";

const CommonStyle = StyleSheet.create({
  sizedBox: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(20),
    backgroundColor: Constant.defaultBgColor
  },
  content: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  commonBorder: {
    borderBottomColor: Constant.commonBorderColor,
    borderBottomWidth: UnitConvert.dpi(2)
  },
  commonHeaderBox: {
    height: UnitConvert.dpi(90),
    width: UnitConvert.w,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center'
  },
  commonHeaderBox_title: {
    color: '#000',
    fontSize: UnitConvert.dpi(34),
    fontWeight: '700'
  },
  search_icon: {
    position: 'absolute',
    top: UnitConvert.dpi(4),
    left: UnitConvert.dpi(10),
    zIndex: 2,
    width: UnitConvert.dpi(60),
    height: UnitConvert.dpi(60)
  },
  img: {
    width: UnitConvert.dpi(60),
    height: UnitConvert.dpi(60)
  },
  left_img: {
    width: UnitConvert.dpi(220),
    height: UnitConvert.dpi(170)
  },
  list_tip_item: {
    position: 'absolute',
    left: UnitConvert.dpi(8),
    top: UnitConvert.dpi(8),
    fontSize: UnitConvert.dpi(26),
    color: '#fff',
    backgroundColor: '#c71622',
    paddingHorizontal: UnitConvert.dpi(4),
    paddingVertical: UnitConvert.dpi(2),
    borderRadius: UnitConvert.dpi(2),
  },
  list_right: {
    marginLeft: UnitConvert.dpi(30)
  },
  list_right_address: {
    width: UnitConvert.dpi(460),
    fontSize: UnitConvert.dpi(28),
    color: '#000',
    marginBottom: UnitConvert.dpi(10)
  },
  list_right_startbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: UnitConvert.dpi(12)
  },
  list_right_startbox_label: {
    fontSize: UnitConvert.dpi(24),
    color: '#666'
  },
  list_right_startbox_text: {
    fontSize: UnitConvert.dpi(36)
  },
  modal: {
    flex: 1,
    backgroundColor: '#f1f1f1'
  },

  type: {
    width: UnitConvert.w,
    paddingTop: UnitConvert.dpi(42),
    paddingHorizontal: UnitConvert.dpi(32)
  },
  type_title: {
    fontSize: UnitConvert.dpi(30),
    color: '#000',
    marginBottom: UnitConvert.dpi(34)
  },
  type_item: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  type_item_text: {
    fontSize: UnitConvert.dpi(26),
    width: UnitConvert.dpi(150),
    backgroundColor: '#f5f5f5',
    color: '#666',
    height: UnitConvert.dpi(44),
    lineHeight: UnitConvert.dpi(44),
    marginRight: UnitConvert.dpi(21),
    textAlign: 'center',
    marginBottom: UnitConvert.dpi(26),
    borderRadius: UnitConvert.dpi(4)
  },
  type_item_text_active: {
    fontSize: UnitConvert.dpi(26),
    width: UnitConvert.dpi(150),
    backgroundColor: '#ffeced',
    color: '#c71622',
    height: UnitConvert.dpi(44),
    lineHeight: UnitConvert.dpi(44),
    marginRight: UnitConvert.dpi(21),
    textAlign: 'center',
    marginBottom: UnitConvert.dpi(26),
    borderRadius: UnitConvert.dpi(4)
  },
  sec_price_input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: UnitConvert.dpi(30)
  },

  commonListMarginTop: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(20),
    backgroundColor: Constant.defaultBgColor
  },

  modalContainer: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(290)
  },
  modal_icon_box: {
    width: UnitConvert.w,
    paddingHorizontal: UnitConvert.dpi(20),
    paddingTop: UnitConvert.dpi(50),
    height: UnitConvert.dpi(208),
    borderBottomWidth: UnitConvert.dpi(2),
    borderBottomColor: '#F1F1F1',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  modal_icon_item: {
    width: UnitConvert.dpi(80),
    alignItems: 'center'
  },
  modal_icon: {
    width: UnitConvert.dpi(80),
    height: UnitConvert.dpi(80)
  },
  modal_icon_text: {
    marginTop: UnitConvert.dpi(10),
    fontSize: UnitConvert.dpi(26),
    color: '#666'
  },
  modal_close_box: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(80),
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal_close_text: {
    fontSize: UnitConvert.dpi(28),
    color: '#000'
  }
})

export default CommonStyle
