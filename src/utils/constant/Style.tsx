import { StyleSheet } from "react-native";
import { UnitConvert } from "@/utils/unitConvert";

const CommonStyle = StyleSheet.create({
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
})

export default CommonStyle
