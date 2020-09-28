import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import MyTab, { listType } from '@/components/MyTab';
import { Constant } from '@/utils/constant/Constant';
import { UnitConvert } from '@/utils/unitConvert';
import Customer from './Customer';
import House from './House';

interface RecommendProps {}

const Recommend = (props: RecommendProps) => {
  const [tab, setTab] = useState({
    current: 0,
    row: Constant.recommend_tab_arr[0]
  })
  return (
    <SafeAreaView style={CommonStyle.container}>
      {/* 导航栏 */}
      <DefaultNavigationHeader 
        title='推荐'
      />
      {/* 选项卡 */}
      <MyTab
        current={tab.current}
        cellTextStyle={{
          fontSize: UnitConvert.dpi(32)
        }}
        list={Constant.recommend_tab_arr}
        onChange={(item: listType, index: number)=>{
          setTab({
            current: index,
            row: item
          })
        }}
      />
      {/* 主体内容 */}
      {tab.row.val === '客源' ? <Customer /> : <House />}
    </SafeAreaView>
  );
};

export default Recommend;

const styles = StyleSheet.create({
});
