import * as React from 'react';
import { Text, View, StyleSheet, FlexStyle, TouchableOpacity, TextStyle } from 'react-native';
import { UnitConvert } from '@/utils/unitConvert';
import { Constant } from '@/utils/constant/Constant';

export type listType = {
  id: string,
  val: string
}

interface MyTabProps {
  list: Array<listType>          // 数据源
  width: number                  // tab整体的宽度
  height: number                 // tab的整体高度
  padding: number                // tab距左右两边的间距
  onChange: Function             // 点击的回调
  current: number                // 当前选中的下标
  cellStyle?: FlexStyle           // 每一项的样式
  cellTextStyle?: TextStyle       // 每一项的文字样式
  showUnderLine: boolean          // 是否展示选中时底部的线条
  tabStyle?: FlexStyle            // tab盒子的样式
}

const MyTab = (props: MyTabProps) => {
  return (
    <View style={{ width: props.width, height: props.height, paddingHorizontal: props.padding }}>
      <View style={[styles.tab_box, props.tabStyle]}>
        {
          props.list.map((item: listType, index: number) => (
            <TouchableOpacity
              onPress={() => {
                props.onChange(item, index)
              }}
              key={item.id}
              style={
                [
                  props.cellStyle ? props.cellStyle : {
                    width: props.padding ? (props.width - props.padding * 2) / props.list.length : props.width / props.list.length,
                    height: props.height
                  }, 
                  props.showUnderLine ? (props.current === index ? styles.cell_active : styles.cell) : styles.cell,
                ]
              }>
              <Text style={[props.current === index ? styles.cell_text_active : styles.cell_text, props.cellTextStyle]}>{item.val}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    </View>
  );
};

MyTab.defaultProps = {
  width: UnitConvert.w,
  height: UnitConvert.dpi(100),
  padding: 0,
  current: 0,
  showUnderLine: true
}

export default MyTab;

const styles = StyleSheet.create({
  tab_box: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cell: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell_active: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Constant.CommonColor.danger,
    borderBottomWidth: UnitConvert.dpi(4)
  },
  cell_text_active: {
    fontSize: UnitConvert.dpi(32),
    color: Constant.CommonColor.danger
  },
  cell_text: {
    fontSize: UnitConvert.dpi(32),
    color: '#000'
  }
});
