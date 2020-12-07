import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Swiper, { SwiperProps } from 'react-native-swiper';
import { UnitConvert } from '@/utils/unitConvert';
import { ENV_IMAGE } from '@/assets/styles/picUrl';

interface CommonBannerProps {
  list: any[],
  openLookModal: Function
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
          props.list.map((item, index) => (
            <TouchableOpacity
              key={item.ID}
              onPress={() => {
                props.openLookModal(index)
              }}
            >
              <Image source={{ uri: item.BigImgUrl }} style={styles.list_item} />
            </TouchableOpacity>
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

CommonBanner.defaultPorps = {
  openLookModal: () => { }
}

const styles = StyleSheet.create({
  list_item: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(490),
  }
})
