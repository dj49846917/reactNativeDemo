import React from 'react';
import { Text, View, StyleSheet, StyleProp, ViewStyle, Image, TextProps } from 'react-native';
import { UnitConvert } from '@/utils/unitConvert';
import { ENV_ICON } from '@/assets/styles/picUrl';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface MyDropdownListProps {
  width: number,                                            // 选择框的宽度
  height?: number,                                          // 选择框的高度
  showBorder?: boolean,                                     // 是否展示底部边框
  showLabel: boolean,                                       // 是否展示左侧的标题栏
  lableStyle?: StyleProp<ViewStyle>,                        // 左侧文字提示的样式
  placeHolder: string,                                      // 提示文字
  selectStyle?: StyleProp<ViewStyle>,                       // 选中区域的样式
  textStyle?: StyleProp<TextProps>,                         // 选中文字的样式
  placeHolderStyle?: StyleProp<TextProps>,                  // placeholder的样式
  required?: boolean,                                       // 是否必输
  labelWidth: number                                        // 标题栏的宽度
  flelds: string,                                           // 字段名
  defaultValue: string | Function | number | undefined,     // 初始值
  bgColor?: string,                                         // 背景颜色
  readonly?: boolean                                        // 是否只读
  callBack: Function                                        // 点击的回调
}

const MyDropdownList = (props: MyDropdownListProps) => {
  return (
    <View style={[styles.box, { height: props.height, width: props.width, backgroundColor: props.bgColor }]}>
      {props.showLabel ? (
        <View style={[styles.box_label, { width: props.labelWidth }, props.lableStyle]}>
          <Text style={styles.box_label_text}>{props.flelds}</Text>
          {props.required ? (
            <Text style={styles.box_lable_must}> *</Text>
          ) : null}
        </View>
      ) : null}
      {
        props.readonly ? (
          <View style={[styles.box_select, props.selectStyle]}>
            <Text style={[props.textStyle, styles.box_select_text]}>{props.defaultValue}</Text>
          </View>
        ) : (
            <TouchableOpacity onPress={()=>{props.callBack()}} style={[styles.box_select_btn, { width: props.width - props.labelWidth}]}>
              <View style={[styles.box_select, props.selectStyle]}>
                {
                  props.defaultValue ? (
                    <Text style={[props.textStyle, styles.box_select_text]}>{props.defaultValue}</Text>
                  ) : (
                      <Text style={[props.placeHolderStyle, styles.box_select_placeholder]}>{props.placeHolder}</Text>
                    )
                }
              </View>
              <Image source={ENV_ICON.icon_right} style={styles.icon} />
            </TouchableOpacity>
          )
      }
    </View>
  );
};

MyDropdownList.defaultProps = {
  width: UnitConvert.w,
  height: UnitConvert.dpi(90),
  showBorder: true,
  showLabel: true,
  required: false,
  labelWidth: UnitConvert.dpi(228),
  bgColor: '#fff',
  placeHolder: '请选择'
}

export default MyDropdownList;

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box_label: {
    flexDirection: 'row',
  },
  box_label_text: {
    fontSize: UnitConvert.dpi(30),
    color: '#333'
  },
  box_lable_must: {
    fontSize: UnitConvert.dpi(30),
    color: 'red'
  },
  box_select_btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  box_select: {
    flex: 1
  },
  icon: {
    width: UnitConvert.dpi(60),
    height: UnitConvert.dpi(60)
  },
  box_select_text: {
    color: '#000',
    fontSize: UnitConvert.dpi(30),
  },
  box_select_placeholder: {
    fontSize: UnitConvert.dpi(30),
    color: '#999'
  }
});
