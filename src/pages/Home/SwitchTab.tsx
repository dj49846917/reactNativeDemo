import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { UnitConvert } from '@/utils/unitConvert';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Constant } from '@/utils/constant/Constant';

type homeTabType = {
  id: string,
  text: string
}

interface SwitchTabProps {
  list: Array<homeTabType>
}

const SwitchTab = (props: SwitchTabProps) => {
  const [row, setRow] = React.useState<homeTabType>(Constant.home_tab_arr[0])
  return (
    <View style={styles.home_tab}>
      <Text style={styles.home_tab_left}>为你推荐</Text>
      <View style={styles.home_tab_right}>
        {
          props.list.map(item => (
            <TouchableOpacity 
              key={item.id}
              onPress={() => {
                setRow(item)
              }} 
            >
              <Text style={row.id === item.id ? styles.home_tab_right_text_active : styles.home_tab_right_text}>{item.text}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    </View>
  );
};

export default SwitchTab;

const styles = StyleSheet.create({
  home_tab: {
    width: UnitConvert.w,
    paddingHorizontal: UnitConvert.dpi(36),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: UnitConvert.dpi(50)
  },
  home_tab_left: {
    fontSize: UnitConvert.dpi(36),
    color: '#000'
  },
  home_tab_right: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    width: UnitConvert.dpi(300)
  },
  home_tab_right_text: {
    fontSize: UnitConvert.dpi(24),
    color: '#666'
  },
  home_tab_right_text_active: {
    fontSize: UnitConvert.dpi(24),
    color: Constant.CommonColor.danger
  }
});
