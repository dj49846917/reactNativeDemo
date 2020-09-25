import * as React from 'react';
import { Text, View, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { UnitConvert } from '@/utils/unitConvert';

type listType = {
  url: ImageSourcePropType,
  text: string
}

interface CategoryProps {
  list: Array<listType>
}

const Category = (props: CategoryProps) => {
  return (
    <View style={styles.home_category}>
      {props.list.map(item => (
        <View style={styles.home_category_list} key={item.text}>
          <Image style={styles.home_category_list_img} source={item.url} />
          <Text style={styles.home_category_list_text}>{item.text}</Text>
        </View>
      ))}
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  home_category: {
    width: UnitConvert.w,
    paddingHorizontal: UnitConvert.dpi(36),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  home_category_list: {
    alignItems: 'center',
    marginTop: UnitConvert.dpi(32),
    marginBottom: UnitConvert.dpi(54)
  },
  home_category_list_img: {
    width: UnitConvert.dpi(60),
    height: UnitConvert.dpi(60)
  },
  home_category_list_text: {
    marginTop: UnitConvert.dpi(12),
    fontSize: UnitConvert.dpi(24),
    color: '#000'
  }
});
