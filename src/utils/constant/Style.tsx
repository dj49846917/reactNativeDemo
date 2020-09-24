import { StyleSheet } from "react-native";
import { UnitConvert } from "@/utils/unitConvert";

const CommonStyle = StyleSheet.create({
  img: {
    width: UnitConvert.dpi(60),
    height: UnitConvert.dpi(60)
  }
})

export default CommonStyle
