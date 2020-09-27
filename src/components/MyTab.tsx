import * as React from 'react';
import { Text, View, StyleSheet, FlexStyle, TouchableOpacity } from 'react-native';
import { UnitConvert } from '@/utils/unitConvert';
import { Constant } from '@/utils/constant/Constant';

export type listType = {
  id: string,
  val: string
}

interface MyTabProps {
  list: Array<listType>          // 数据源
  height: number                 // tab的整体高度
  padding: number                // tab距左右两边的间距
  onChange: Function             // 点击的回调
  current: number                // 当前选中的下标
}

const MyTab = (props: MyTabProps) => {
  return (
    <View style={[styles.tab, { height: props.height, paddingHorizontal: props.padding }]}>
      <View style={styles.tab_box}>
        {
          props.list.map((item: listType, index: number) => (
            <TouchableOpacity
              onPress={() => {
                props.onChange(item, index)
              }}
              key={item.id}
              style={
                [{
                  width: props.padding ? (UnitConvert.w - props.padding * 2) / props.list.length : UnitConvert.w / props.list.length,
                  height: props.height
                }, props.current === index ? styles.cell_active : styles.cell]
              }>
              <Text style={props.current === index ? styles.cell_text_active : styles.cell_text}>{item.val}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    </View>
  );
};

MyTab.defaultProps = {
  height: UnitConvert.dpi(100),
  padding: 0,
  current: 0
}

export default MyTab;

const styles = StyleSheet.create({
  tab: {
    width: UnitConvert.w
  },
  tab_box: {
    flexDirection: 'row',
    alignItems: 'center'
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
