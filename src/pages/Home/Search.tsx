import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { UnitConvert } from '@/utils/unitConvert';
import { ENV_ICON } from '@/assets/styles/picUrl'
import CommonStyle from '@/utils/constant/Style';
import { Constant } from '@/utils/constant/Constant';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface SearchProps { }

const Search = (props: SearchProps) => {
  return (
    <View style={styles.home_search}>
      <View style={styles.home_search_left}>
        <Text style={styles.home_search_left_text} numberOfLines={1}>{Constant.locName}</Text>
        <Image source={ENV_ICON.icon_down} style={[CommonStyle.img, Constant.locName.length === 2 ? styles.home_search_left_icon : styles.home_search_left_icon2]} />
      </View>
      <TouchableOpacity 
        style={Constant.locName.length === 2 ? styles.home_search_center : styles.home_search_center2}
        onPress={()=>{}}
      >
        <Image source={ENV_ICON.input_search} style={[CommonStyle.img, styles.home_search_center_img]} />
        <View style={styles.home_search_center_box}>
          <Text style={styles.home_search_center_text}>请输入小区名</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.home_search_right}>
        <Image source={ENV_ICON.icon_top_msg} style={CommonStyle.img} />
        {
          Constant.messageCount ? (
            <View style={Number(Constant.messageCount) < 10 ? styles.home_search_right_numbox : styles.home_search_right_numbox2}>
              <Text style={styles.home_search_right_num}>{Number(Constant.messageCount) > 99 ? 99 : Constant.messageCount}</Text>
            </View>
          ) : null
        }
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  home_search: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(66),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
    width: UnitConvert.dpi(514),
    height: UnitConvert.dpi(66),
    backgroundColor: '#f7f7f7',
    borderRadius: UnitConvert.dpi(4),
    flexDirection: 'row',
    alignItems: 'center'
  },
  home_search_center2: {
    width: UnitConvert.dpi(494),
    height: UnitConvert.dpi(66),
    backgroundColor: '#f7f7f7',
    borderRadius: UnitConvert.dpi(4),
    flexDirection: 'row',
    alignItems: 'center'
  },
  home_search_center_img: {
    marginHorizontal: UnitConvert.dpi(6)
  },
  home_search_center_box: {
    flex: 1,
    justifyContent: 'center'
  },
  home_search_center_text: {
    fontSize: UnitConvert.dpi(28),
    color: '#999'
  },
  home_search_right: {
    flexDirection: 'row',
    width: UnitConvert.dpi(60),
    height: UnitConvert.dpi(60),
    marginRight: UnitConvert.dpi(30)
  },
  home_search_right_numbox: {
    width: UnitConvert.dpi(24),
    height: UnitConvert.dpi(24),
    backgroundColor: Constant.CommonColor.danger,
    borderRadius: UnitConvert.dpi(12),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: UnitConvert.dpi(5)
  },
  home_search_right_numbox2: {
    width: UnitConvert.dpi(30),
    height: UnitConvert.dpi(30),
    backgroundColor: Constant.CommonColor.danger,
    borderRadius: UnitConvert.dpi(15),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: UnitConvert.dpi(0)
  },
  home_search_right_num: {
    fontSize: UnitConvert.dpi(22),
    color: '#fff',
  }
});
