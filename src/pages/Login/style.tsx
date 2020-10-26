import { StyleSheet } from "react-native";
import { UnitConvert } from "@/utils/unitConvert";

const loginStyle = StyleSheet.create({
  head: {
    width: UnitConvert.w,
    flexDirection: 'row',
    alignItems: 'center',
  },
  head_left: {
    height: UnitConvert.dpi(90),
    justifyContent: 'center',
    flex: 0.5,
    paddingLeft: UnitConvert.dpi(20)
  },
  header_center_text: {
    fontSize: UnitConvert.dpi(36),
    color: '#000',
  },
  head_center: {
    flex: 2,
    alignItems: 'center',
  },
  head_right: {
    flex: 0.5,
    alignItems: 'flex-end',
    paddingRight: UnitConvert.dpi(30)
  },
  head_right_text: {
    fontSize: UnitConvert.dpi(32),
    color: '#000'
  },
  logo: {
    width: UnitConvert.w,
    marginTop: UnitConvert.dpi(40),
    marginBottom: UnitConvert.dpi(70),
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo_icon: {
    width: UnitConvert.dpi(126),
    height: UnitConvert.dpi(126)
  },
  content: {
    width: UnitConvert.w,
    paddingHorizontal: UnitConvert.dpi(54)
  },
  form_item: {
    borderBottomWidth: UnitConvert.dpi(2),
    borderBottomColor: '#f1f1f1',
    height: UnitConvert.dpi(110),
  },
  rightInputContainer: {
    fontSize: UnitConvert.dpi(32),
    flex: 1
  },
  form_item2: {
    height: UnitConvert.dpi(100),
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  forget_pass_text: {
    fontSize: UnitConvert.dpi(28),
    color: '#999'
  },
  login_btn: {
    height: UnitConvert.dpi(80),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: UnitConvert.dpi(4),
    backgroundColor: '#c71622'
  },
  top40: {
    marginTop: UnitConvert.dpi(40)
  },
  login_text: {
    fontSize: UnitConvert.dpi(32),
    color: '#fff'
  },
  command_tip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: UnitConvert.dpi(-20),
    marginTop: UnitConvert.dpi(20)
  },
  command_tip_item: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  choose: {
    position: 'relative',
    top: UnitConvert.dpi(2),
    left: UnitConvert.dpi(10)
  },
  command_tip_red: {
    color: '#c71623',
    fontSize: UnitConvert.dpi(26)
  },
  command_tip_text: {
    fontSize: UnitConvert.dpi(26),
    color: '#666'
  },
  sizeBox: {
    height: UnitConvert.dpi(120),
    width: UnitConvert.w
  },
  code_box: {
    width: UnitConvert.dpi(200),
    height: UnitConvert.dpi(110),
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  code_text: {
    fontSize: UnitConvert.dpi(28),
    color: '#666'
  },
  form_phone: {
    flexDirection: 'row'
  }
})

export default loginStyle
