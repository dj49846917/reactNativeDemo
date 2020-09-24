import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { UnitConvert } from '@/utils/unitConvert';
import { ENV_ICON } from '@/assets/styles/picUrl'
import CommonStyle from '@/utils/constant/Style';
import { Constant } from '@/utils/constant/Constant';

interface SearchProps { }

// 展示定位的文字
const showLocNameComponent = () => {
  if (Constant.locName.length === 2) {
    return (
      <Image source={ENV_ICON.icon_down} style={[CommonStyle.img, styles.home_search_left_icon]} />
    )
  } else if (Constant.locName.length === 3) {
    return (
      <Image source={ENV_ICON.icon_down} style={[CommonStyle.img, styles.home_search_left_icon2]} />
    )
  } else {
    return (
      <Image source={ENV_ICON.icon_down} style={[CommonStyle.img, styles.home_search_left_icon2]} />
    )
  }
}

const Search = (props: SearchProps) => {
  return (
    <View style={styles.home_search}>
      <View style={styles.home_search_left}>
        <Text style={styles.home_search_left_text} numberOfLines={1}>{Constant.locName}</Text>
        {showLocNameComponent()}
      </View>
      <View style={styles.home_search_center}>
        
      </View>
      <View style={styles.home_search_right}></View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  home_search: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(66),
    flexDirection: 'row',
    alignItems: 'center'
  },
  home_search_left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  home_search_left_text: {
    fontSize: UnitConvert.dpi(26),
    width: UnitConvert.dpi(90),
    color: '#000',
    position: 'absolute',
    left: UnitConvert.dpi(30),
  },
  home_search_left_icon: {
    marginLeft: UnitConvert.dpi(70)
  },
  home_search_left2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  home_search_left_text2: {
    fontSize: UnitConvert.dpi(26),
    color: '#000',
    position: 'absolute',
    left: UnitConvert.dpi(30),
  },
  home_search_left_icon2: {
    marginLeft: UnitConvert.dpi(95)
  },
  home_search_center: {
    width: UnitConvert.dpi(534),
    height: UnitConvert.dpi(66),
    backgroundColor: '#f7f7f7',
    borderRadius: UnitConvert.dpi(4)
  },
  home_search_right: {
    
  }
});
