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
  }
})

export default CommonStyle
