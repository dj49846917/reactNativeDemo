import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { ENV_IMAGE } from '@/assets/styles/picUrl';
import { UnitConvert } from '@/utils/unitConvert';

interface SwiperProps { }

const Swiper = (props: SwiperProps) => {
  return (
    <View style={styles.home_swiper}>
      <Image source={ENV_IMAGE.banner1} style={styles.home_swiper_img} />
    </View>
  );
};

export default Swiper;

const styles = StyleSheet.create({
  home_swiper: {
    width: UnitConvert.dpi(690),
    height: UnitConvert.dpi(226),
    marginLeft: UnitConvert.dpi(30),
    marginTop: UnitConvert.dpi(30)
  },
  home_swiper_img: {
    width: UnitConvert.dpi(690),
    height: UnitConvert.dpi(226),
    borderRadius: UnitConvert.dpi(2)
  }
});
