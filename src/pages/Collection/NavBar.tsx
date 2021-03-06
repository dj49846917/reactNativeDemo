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
          <DefaultNavigationHeader
            showLeftIcon={false}
            mode='input'
            showRightSecondIcon
            rightSecondIconType='text'
            rightSecondIconText='取消'
            placeholder='请输入小区名或商圈名'
            inputWidth={UnitConvert.dpi(624)}
            rightSecondCallBack={() => {
              setVisible(false)
            }}
          />
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
