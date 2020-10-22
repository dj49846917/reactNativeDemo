import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Constant } from '@/utils/constant/Constant';
import { UnitConvert } from '@/utils/unitConvert';

interface TabProps {
  tabType: string                       // 选中的id
  tabCallBack: Function                 // 点击的回调
}

const Tab = (props: TabProps) => {
  return (
    <View style={styles.tab}>
      {
        Constant.home_tab_arr.map(item=>(
          <TouchableOpacity
          key={item.id}
          style={[props.tabType === item.id ? styles.tab_item_active : styles.tab_item, styles.tab_border]}
          onPress={() => {
            props.tabCallBack(item.id)
          }}
        >
          <Text style={props.tabType === item.id ? styles.tab_item_text_active : styles.tab_item_text}>{item.val}</Text>
        </TouchableOpacity>
        ))
      }
      </View>
  );
};

Tab.defaultProps = {
  tabType: '1'
}

export default Tab;

const styles = StyleSheet.create({
  tab: {
    width: UnitConvert.dpi(650),
    marginLeft: UnitConvert.dpi(50),
    height: UnitConvert.dpi(64),
    marginTop: UnitConvert.dpi(80),
    borderColor: '#e1e1e1',
    flexDirection: 'row',
    marginBottom: UnitConvert.dpi(20)
  },
  tab_item: {
    width: UnitConvert.dpi(650) / 3,
    height: UnitConvert.dpi(64),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab_item_active: {
    width: UnitConvert.dpi(650) / 3,
    height: UnitConvert.dpi(64),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c71622'
  },
  tab_border: {
    borderColor: '#e1e1e1',
    borderWidth: UnitConvert.dpi(2),
    borderRadius: UnitConvert.dpi(4),
    borderRightWidth: 0
  },
  tab_border2: {
    borderColor: '#e1e1e1',
    borderWidth: UnitConvert.dpi(2),
  },
  tab_border3: {
    borderColor: '#e1e1e1',
    borderWidth: UnitConvert.dpi(2),
    borderRadius: UnitConvert.dpi(4),
    borderLeftWidth: 0
  },
  tab_item_text: {
    fontSize: UnitConvert.dpi(26),
    color: '#000'
  },
  tab_item_text_active: {
    color: '#fff',
    fontSize: UnitConvert.dpi(24)
  },
  content_tabpane: {
    marginTop: UnitConvert.dpi(20),
    flex: 1,
  },
});
