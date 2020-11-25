import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { UnitConvert } from '@/utils/unitConvert';
import { dicType } from '@/models/Recommend';
import { ENV_ICON } from '@/assets/styles/picUrl';

interface CommonAreaProps {
  dicArr: dicType[],                              // 数据字典
  onChange: Function                              // 选中的回调
  defaultValue: dicType                           // 初始值
}

const CommonArea = (props: CommonAreaProps) => {
  return (
    <View style={styles.sec_area}>
      <View style={styles.sec_area_content}>
        <View style={styles.sec_area_left}>
          <TouchableOpacity style={styles.sec_area_item} onPress={()=>{}}>
            <Text style={styles.sec_area_text_active}>区域</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sec_area_right}>
          <ScrollView style={{ flex: 1 }}>
            <TouchableOpacity
              style={styles.sec_area_right_item}
              onPress={() => {
                props.onChange({}, 0)
              }}
            >
              <Text style={JSON.stringify(props.defaultValue) === '{}' ? styles.sec_area_text_active : styles.sec_area_text}>不限</Text>
              <Image source={JSON.stringify(props.defaultValue) === '{}' ? ENV_ICON.icon_gou_red : null} style={styles.sec_area_right_icon} />
            </TouchableOpacity>
            {props.dicArr && props.dicArr.map((item, index) => (
              <TouchableOpacity
                style={styles.sec_area_right_item}
                key={item.DicCode}
                onPress={() => {
                  props.onChange(item, index);
                }}
              >
                <Text style={props.defaultValue.DicCode === item.DicCode ? styles.sec_area_text_active : styles.sec_area_text}>{item.DicName}</Text>
                <Image 
                  source={props.defaultValue.DicCode === item.DicCode ? ENV_ICON.icon_gou_red : null} 
                  style={styles.sec_area_right_icon} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

CommonArea.defaultPorps = {
  
}

export default CommonArea;

const styles = StyleSheet.create({
  sec_area: {
    height: UnitConvert.dpi(630),
    width: UnitConvert.w,
    borderTopColor: '#f1f1f1',
    borderTopWidth: UnitConvert.dpi(2)
  },
  sec_area_btn: {
    paddingLeft: UnitConvert.dpi(28)
  },
  sec_area_content: {
    flexDirection: "row",
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: UnitConvert.dpi(2)
  },
  sec_area_left: {
    width: UnitConvert.w / 2,
    paddingLeft: UnitConvert.dpi(28),
    height: UnitConvert.dpi(630),
    borderRightColor: '#f1f1f1',
    borderRightWidth: UnitConvert.dpi(2),
  },
  sec_area_right: {
    width: UnitConvert.w / 2,
    paddingLeft: UnitConvert.dpi(28),
    height: UnitConvert.dpi(630),
    backgroundColor: '#FBFAFA'
  },
  sec_area_item: {
    width: UnitConvert.w / 2 - UnitConvert.dpi(28),
    height: UnitConvert.dpi(90),
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: UnitConvert.dpi(2),
    borderBottomColor: '#f1f1f1',
    borderRightColor: '#f1f1f1',
    borderRightWidth: UnitConvert.dpi(2),
  },
  sec_area_right_item: {
    width: UnitConvert.w / 2 - UnitConvert.dpi(28),
    height: UnitConvert.dpi(90),
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: UnitConvert.dpi(2),
    borderBottomColor: '#f1f1f1',
    position: 'relative'
  },
  sec_area_text_active: {
    color: '#c71622',
    fontSize: UnitConvert.dpi(28)
  },
  sec_area_text: {
    color: '#666',
    fontSize: UnitConvert.dpi(28)
  },
  sec_area_right_icon: {
    position: 'absolute',
    right: 0,
    top: UnitConvert.dpi(12)
  },
  sec_price_input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: UnitConvert.dpi(30)
  },
});
