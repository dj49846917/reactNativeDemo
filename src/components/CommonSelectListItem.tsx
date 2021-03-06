import * as React from 'react';
import { Text, View, StyleSheet, StyleProp, TextStyle, TouchableOpacity } from 'react-native';
import { UnitConvert } from '@/utils/unitConvert';
import { dicType } from '@/models/Recommend';

interface CommonSelectListItemProps {
  title: string                                     // 标题
  list: dicType[]                                   // 数据源
  titleStyle?: StyleProp<TextStyle>                 // 标题的样式
  defaultValue: dicType                              // 初始值
  callBack: Function                                // 选中的回调
}

const CommonSelectListItem = (props: CommonSelectListItemProps) => {

  return (
    <View style={styles.list_item}>
      <Text style={[styles.list_item_title, props.titleStyle]}>{props.title}</Text>
      <View style={styles.list_item_content}>
        {
          props.list && props.list.map(item => (
            <TouchableOpacity
              key={item.DicCode}
              style={props.defaultValue.DicCode === item.DicCode ? styles.list_item_content_box_active : styles.list_item_content_box}
              onPress={() => {
                if (props.defaultValue.DicCode === item.DicCode) {
                  props.callBack(undefined, {})
                } else {
                  props.callBack(item.DicCode, item)
                }
              }}
            >
              <Text style={props.defaultValue.DicCode === item.DicCode ? styles.list_item_content_text_active : styles.list_item_content_text}>{item.DicName}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    </View>
  );
};

export default CommonSelectListItem;

const styles = StyleSheet.create({
  list_item: {
    paddingLeft: UnitConvert.dpi(20)
  },
  list_item_title: {
    fontSize: UnitConvert.dpi(24),
    color: '#000',
    paddingTop: UnitConvert.dpi(30),
  },
  list_item_content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  list_item_content_box: {
    paddingHorizontal: UnitConvert.dpi(24),
    height: UnitConvert.dpi(56),
    backgroundColor: '#f4f4f4',
    marginRight: UnitConvert.dpi(26),
    marginTop: UnitConvert.dpi(24),
    alignItems: 'center',
    justifyContent: 'center'
  },
  list_item_content_box_active: {
    paddingHorizontal: UnitConvert.dpi(24),
    height: UnitConvert.dpi(56),
    backgroundColor: '#ffe8ea',
    marginRight: UnitConvert.dpi(26),
    marginTop: UnitConvert.dpi(24),
    alignItems: 'center',
    justifyContent: 'center'
  },
  list_item_content_text: {
    fontSize: UnitConvert.dpi(26),
  },
  list_item_content_text_active: {
    fontSize: UnitConvert.dpi(26),
    color: '#C71622'
  }
});
