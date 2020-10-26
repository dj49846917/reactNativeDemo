import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import moment from 'moment';
import { UnitConvert } from '@/utils/unitConvert';
import { Constant } from '@/utils/constant/Constant';

interface TabPaneProps {
  type: string                            // tab的类型
  list: any[]
}

const TabPane = (props: TabPaneProps) => {
  if (props.type === '客源') {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.ass_list}>
          {props.list.map((item, index) => (
            <View style={styles.listItem_cust} key={index}>
              <Text style={styles.listItem_name}>{item.UserName}</Text>
              <Text style={styles.listItem_text}>{moment(item.ModifyDate).format('YYYY-MM-DD')}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.ass_list}>
          {props.list.map((item, index) => (
            <View style={styles.listItem_house} key={index}>
              <View style={styles.row}>
                <Text style={styles.listItem_name} numberOfLines={1}>{item.OwnerName}</Text>
                <Text style={styles.listItem_text} numberOfLines={1}>{moment(item.ModifyDate).format('YYYY-MM-DD')}</Text>
              </View>
              <Text style={styles.listItem_text2} numberOfLines={1}>{item.PropertyAddress}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
};

export default TabPane;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.defaultBgColor
  },
  ass_list: {
    paddingHorizontal: UnitConvert.dpi(30),
    backgroundColor: Constant.defaultBgColor
  },
  listItem_cust: {
    backgroundColor: '#fff',
    height: UnitConvert.dpi(100),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: UnitConvert.dpi(20),
    paddingHorizontal: UnitConvert.dpi(30),
    borderRadius: UnitConvert.dpi(6)
  },
  listItem_house: {
    backgroundColor: '#fff',
    height: UnitConvert.dpi(180),
    marginTop: UnitConvert.dpi(20),
    paddingHorizontal: UnitConvert.dpi(30),
    borderRadius: UnitConvert.dpi(6),
    justifyContent: 'space-evenly'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItem_name: {
    fontSize: UnitConvert.dpi(30),
    color: '#000'
  },
  listItem_text: {
    fontSize: UnitConvert.dpi(26),
    color: '#666'
  },
  listItem_text2: {
    fontSize: UnitConvert.dpi(28),
    color: '#666'
  },
  search_btn: {
    width: UnitConvert.dpi(80),
    height: UnitConvert.dpi(50),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Constant.CommonColor.danger,
    borderRadius: UnitConvert.dpi(4),
    position: 'absolute',
    top: UnitConvert.dpi(8),
    right: UnitConvert.dpi(10)
  },
  search_btn_text: {
    fontSize: UnitConvert.dpi(28),
    color: '#fff'
  }
});
