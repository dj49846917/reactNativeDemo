import { UnitConvert } from "@/utils/unitConvert";

export const Constant = {
  headerHeight: UnitConvert.dpi(90),
  borderBottomColor: '#f1f1f1',
  borderBottomWidth: UnitConvert.dpi(2),
  iconWidth: UnitConvert.dpi(60),
  headerTitleSize: UnitConvert.dpi(32),
  inputHeight: UnitConvert.dpi(90),
  commonColor: { // 颜色
    danger: '#c71622',  // rgba(199, 22, 34, 1)
    primary: '#639be7', // rgba(99, 155, 231, 1)
    success: '#288d65', // rgba(40, 141, 101, 1)
    warning: '#f7912b', // rgba(247, 145, 43, 1)
    default: '#8a8a8a'  // rgba(138, 138, 138, 1)
  }
}