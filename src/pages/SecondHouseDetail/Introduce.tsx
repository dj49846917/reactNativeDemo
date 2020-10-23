import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { UnitConvert } from '@/utils/unitConvert';

interface IntroduceProps {
  data: any
}

const Introduce = (props: IntroduceProps) => {
  return (
    <View style={styles.intro_box}>
        <Text style={styles.intro_title}>房源介绍</Text>
        <View style={styles.intro_content}>
          <Text style={styles.intro_text}>核心卖点：</Text>
          <Text style={styles.intro_text2}>{props.data.Introduce_SellingPoint}</Text>
        </View>
        <View style={styles.intro_content}>
          <Text style={styles.intro_text}>小区介绍：</Text>
          <Text style={styles.intro_text2}>{props.data.Introduce_Village}</Text>
        </View>
        <View style={styles.intro_content}>
          <Text style={styles.intro_text}>交通出行：</Text>
          <Text style={styles.intro_text2}>{props.data.Introduce_Traffic}</Text>
        </View>
        <View style={styles.intro_content}>
          <Text style={styles.intro_text}>周边配套：</Text>
          <Text style={styles.intro_text2}>{props.data.Introduce_Periphery}</Text>
        </View>
      </View>
  );
};

export default Introduce;

const styles = StyleSheet.create({
  intro_box: {
    backgroundColor: '#fff',
    paddingLeft: UnitConvert.dpi(30),
    paddingRight: UnitConvert.dpi(60),
    paddingBottom: UnitConvert.dpi(200),
  },
  intro_title: {
    fontSize: UnitConvert.dpi(36),
    color: '#000',
    marginBottom: UnitConvert.dpi(10),
  },
  intro_text: {
    fontSize: UnitConvert.dpi(28),
    color: '#999'
  },
  intro_text2: {
    fontSize: UnitConvert.dpi(28),
    color: '#000'
  },
  intro_content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: UnitConvert.dpi(13)
  }
});
