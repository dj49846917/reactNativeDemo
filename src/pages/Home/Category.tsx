import * as React from 'react';
import { Text, View, StyleSheet, Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { UnitConvert } from '@/utils/unitConvert';
import { useNavigation } from '@react-navigation/native';

type listType = {
  url: ImageSourcePropType,
  text: string
}

interface CategoryProps {
  list: Array<listType>,
}

const Category = (props: CategoryProps) => {
  const navigation = useNavigation()
  const handleChange = (item: listType) => {
    switch (item.text) {
      case '司法拍卖':
        navigation.navigate('AssetAuction', { title: item.text })
        break;
      case '资产拍卖':
        navigation.navigate('AssetAuction', { title: item.text })
        break;
      default:
        break;
    }
  }

  return (
    <View style={styles.home_category}>
      {props.list.map(item => (
        <TouchableOpacity style={styles.home_category_list} key={item.text} onPress={() => handleChange(item)}>
          <Image style={styles.home_category_list_img} source={item.url} />
          <Text style={styles.home_category_list_text}>{item.text}</Text>
        </TouchableOpacity>
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
