import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextStyle, StyleProp, ViewStyle, Image } from 'react-native';
import { UnitConvert } from '@/utils/unitConvert';
import { Constant } from '@/utils/constant/Constant';
import { tabItemType } from '@/pages/Recommend';
import { ENV_ICON } from '@/assets/styles/picUrl';
import CommonStyle from '@/utils/constant/Style';

interface MyTabProps {
  showBorder: boolean,                        // 是否展示底部border
  list: tabItemType[]                         // 数据源
  width: number                               // tab整体的宽度
  height: number                              // tab的整体高度
  padding: number                             // tab距左右两边的间距
  onChange: Function                          // 点击的回调
  current: number                             // 当前选中的下标
  cellStyle?: StyleProp<ViewStyle>            // 每一项的样式
  cellTextStyle?: StyleProp<TextStyle>        // 每一项的文字样式
  showUnderLine: boolean                      // 是否展示选中时底部的线条
  tabStyle?: StyleProp<ViewStyle>             // tab盒子的样式
  mode: string                                // tab的模式(text, icon)
}

const MyTab = (props: MyTabProps) => {
  // 根据tab的模式判断是否展示底部
  const showUnderLineStyle = (index: number) => {
    if(props.mode === 'text') {
      if(props.showUnderLine) {
        if(props.current === index) {
          return styles.cell_active
        } else {
          return styles.cell
        }
      } else {
        return styles.cell
      }
    } else {
      return styles.cell
    }
  }

  return (
    <View style={{ width: props.width, height: props.height, paddingHorizontal: props.padding }}>
      <View style={[styles.tab_box, props.tabStyle, props.showBorder ? CommonStyle.commonBorder : null,]}>
        {
          props.list.map((item: tabItemType, index: number) => (
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
                  showUnderLineStyle(index)
                ]
              }>
              {
                props.mode === 'text' ? (
                  <Text style={[props.current === index ? styles.cell_text_active : styles.cell_text, props.cellTextStyle]}>{item.val}</Text>
                ) : (
                    <View style={styles.cell_box}>
                      <Text style={[props.current === index ? styles.cell_text_active : styles.cell_text, props.cellTextStyle]}>{item.val}</Text>
                      <Image source={props.current === index ? ENV_ICON.icon_up : ENV_ICON.icon_down} style={styles.cell_box_icon} />
                    </View>
                  )
              }
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
  showUnderLine: true,
  mode: 'text',
  showBorder: true
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
  },
  cell_box: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cell_box_icon: {
    position: 'relative',
    left: UnitConvert.dpi(-10)
  }
});
