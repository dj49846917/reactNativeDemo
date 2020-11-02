import CommonBanner from '@/components/CommonBanner';
import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import CommonStyle from '@/utils/constant/Style';
import { UnitConvert } from '@/utils/unitConvert';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';

interface SwiperProps { }

const arr = [{
  "ID": 459,
  "BigImgUrl": "http://192.168.10.41/group1/M00/01/22/wKgKKV-OlFmAVOAEAAjz2DlbHlo624.JPG",
}, {
  "ID": 454,
  "BigImgUrl": "http://183.230.176.174:8989/group1/M00/01/22/wKgKKV-Oku-ASvS0AAS61nIadjY866.JPG",
}, {
  "ID": 455,
  "BigImgUrl": "http://183.230.176.174:8989/group1/M00/01/22/wKgKKV-Oku-AWtewAAaOlhDF0vM188.JPG",
}, {
  "ID": 456,
  "BigImgUrl": "http://183.230.176.174:8989/group1/M00/01/22/wKgKKV-Oku-AJpOFAAYeMTXU8EE434.JPG",
}, {
  "ID": 458,
  "BigImgUrl": "http://192.168.10.41/group1/M00/01/22/wKgKKV-OlE2AJNt1AAjz2DlbHlo912.JPG",
}]

const Swiper = (props: SwiperProps) => {
  const navigation = useNavigation()
  return (
    <>
      <SafeAreaView style={CommonStyle.container}>
        <DefaultNavigationHeader
          title='轮播图'
          showLeftIcon
          navigation={navigation}
        />
        <View style={styles.banner}>
          <CommonBanner
            list={arr}
            showsButtons={false}
            dot={<View style={styles.swiper_dot} />}
            activeDot={<View style={styles.swiper_dot_active} />}
            paginationStyle={{ bottom: 10 }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Swiper;

const styles = StyleSheet.create({
  banner: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(400)
  },
  swiper_dot: {
    width: UnitConvert.dpi(12),
    height: UnitConvert.dpi(12),
    borderRadius: UnitConvert.dpi(12),
    backgroundColor: '#fff',
    marginLeft: UnitConvert.dpi(10),
  },
  swiper_dot_active: {
    width: UnitConvert.dpi(12),
    height: UnitConvert.dpi(12),
    borderRadius: UnitConvert.dpi(12),
    backgroundColor: '#c81621',
    marginLeft: UnitConvert.dpi(10),
  },
});
