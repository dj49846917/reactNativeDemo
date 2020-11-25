import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { UnitConvert } from '@/utils/unitConvert';
import { ENV_IMAGE } from '@/assets/styles/picUrl';

interface AddvertisementProps { }

const Addvertisement = (props: AddvertisementProps) => {
  return (
    <View style={styles.home_add}>
      <Image source={ENV_IMAGE.p1} style={styles.home_add_left} />
      <View style={styles.home_add_right}>
        <Image source={ENV_IMAGE.p2} style={styles.home_add_right_img} />
        <Image source={ENV_IMAGE.p3} style={styles.home_add_right_img} />
      </View>
    </View>
  );
};

export default Addvertisement;

const styles = StyleSheet.create({
  home_add: {
    width: UnitConvert.w,
    paddingHorizontal: UnitConvert.dpi(36),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  home_add_left: {
    width: UnitConvert.dpi(330),
    height: UnitConvert.dpi(330)
  },
  home_add_right: {
    justifyContent: 'space-between'
  },
  home_add_right_img: {
    width: UnitConvert.dpi(330),
    height: UnitConvert.dpi(155)
  }
});
