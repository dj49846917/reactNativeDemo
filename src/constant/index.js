import { UnitConvert } from "@/utils/unitConvert";

export const Constant = {
  headerHeight: UnitConvert.dpi(90),
  borderBottomColor: '#f1f1f1',
  borderBottomWidth: UnitConvert.dpi(2),
  iconWidth: UnitConvert.dpi(60),
  headerTitleSize: UnitConvert.dpi(32),
  inputHeight: UnitConvert.dpi(90),
  commonColor: { // 颜色
    danger: '#c71622', 
    primary: '#639be7',
    success: '#288d65',
    warning: '#f7912b',
    default: '#8a8a8a'
  }
}