import * as React from 'react';
import { Text, View, StyleSheet, Image, StyleProp, ViewStyle } from 'react-native';
import { Constant } from '@/utils/constant/Constant';
import { UnitConvert } from '@/utils/unitConvert';
import { ENV_ICON } from '@/assets/styles/picUrl';

interface CommonNoDataProps {
  style?: StyleProp<ViewStyle>                   // 盒子的样式
}

const CommonNoData = (props: CommonNoDataProps) => {
  return (
    <View style={[styles.content_nomsg, props.style]}>
      <Image source={ENV_ICON.no_msg_center} style={styles.icon_style} />
      <Text style={styles.content_msg}>暂无相关信息</Text>
    </View>
  );
};

export default CommonNoData;

const styles = StyleSheet.create({
  content_nomsg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content_msg: {
    fontSize: UnitConvert.dpi(28),
    color: '#666',
    marginTop: UnitConvert.dpi(30)
  },
  icon_style: {
    width: UnitConvert.dpi(181),
    height: UnitConvert.dpi(181)
  }
});
