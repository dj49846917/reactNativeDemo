import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Swiper, { SwiperProps } from 'react-native-swiper';
import { UnitConvert } from '@/utils/unitConvert';
import { ENV_IMAGE } from '@/assets/styles/picUrl';

interface CommonBannerProps {
  list: any[]
}

type Iprops = CommonBannerProps & SwiperProps

const CommonBanner = (props: Iprops) => {
  if (props.list.length > 0) {
    return (
      <Swiper
        {...props}
        loop
        autoplay
        autoplayTimeout={5}
        pagingEnabled
      >
        {
          props.list.map(item => (
            <Image source={{ uri: item.BigImgUrl }} style={styles.list_item} key={item.ID} />
          ))
        }
      </Swiper>
    );
  } else {
    return (
      <Image source={ENV_IMAGE.left_img} style={styles.list_item} />
    )
  }
};

export default CommonBanner;

const styles = StyleSheet.create({
  list_item: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(490),
  }
})
