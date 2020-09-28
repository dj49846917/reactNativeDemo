import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import CommonStyle from '@/utils/constant/Style';
import { UnitConvert } from '@/utils/unitConvert';
import { ENV_ICON } from '@/assets/styles/picUrl';
import MyTextInput from '@/components/MyTextInput';

interface CollectionProps { }

const NavBar = (props: CollectionProps) => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      {
        visible ? (
          <View style={[CommonStyle.commonHeaderBox, styles.collection_header_box]}>
            <View style={styles.collection_header_nav}>
              <TouchableOpacity
                style={CommonStyle.search_icon}
                onPress={() => { }}
              >
                <Image source={ENV_ICON.input_search} />
              </TouchableOpacity>
              <MyTextInput
                flelds='name'
                showClearIcon
                width={UnitConvert.dpi(604)}
                height={UnitConvert.dpi(66)}
                inputStyle={{
                  width: UnitConvert.dpi(500),
                  marginLeft: UnitConvert.dpi(70)
                }}
                showLabel={false}
                getFieldsValue={(val: string) => {
                  console.log('val', val)
                }}
              />
            </View>
            <TouchableOpacity onPress={() => {
              setVisible(false)
            }}>
              <Text style={styles.collection_header_btn}>取消</Text>
            </TouchableOpacity>
          </View>
        ) : (
            <DefaultNavigationHeader
              showLeftIcon={false}
              title="收藏"
              showRightSecondIcon
              rightSecondCallBack={() => {
                setVisible(true)
              }}
            />
          )
      }
    </>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  collection_header_box: {
    paddingLeft: UnitConvert.dpi(30)
  },
  collection_header_nav: {
    height: UnitConvert.dpi(66),
    backgroundColor: '#f7f7f7',
  },
  collection_header_btn: {
    color: '#333',
    fontSize: UnitConvert.dpi(30),
    marginLeft: UnitConvert.dpi(20)
    // marginRight: UnitConvert.dpi(20)
  }
});
