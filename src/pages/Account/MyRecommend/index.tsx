import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import { useNavigation } from '@react-navigation/native';
import MyTab from '@/components/MyTab';
import { Constant } from '@/utils/constant/Constant';
import { tabItemType, tabType } from '@/pages/Recommend';
import { UnitConvert } from '@/utils/unitConvert';
import TabPane from './TabPane';
import { SecondHouseData } from '@/assets/data/SecondHouse';
import { AssetAutionData } from '@/assets/data/AssetAuction';
import { commendCustList, CommendHouseList } from '@/assets/data/MyCommend';

interface MyRecommendProps { }

type custIstate = any[]

const MyRecommend = (props: MyRecommendProps) => {
  const navigation = useNavigation()

  // tab切换
  const [tab, setTab] = useState<tabType>({
    current: 0,
    row: Constant.recommend_tab_arr[0]
  })

  const [custList, setCustList] = useState<custIstate>([])
  const [houseList, setHoustList] = useState<custIstate>([])

  useEffect(() => {
    initData(Constant.recommend_tab_arr[0].val)
  }, [])

  // 初始化数据
  const initData = (type: string) => {
    if (type === '客源') {
      const res = commendCustList
      setCustList(res)
    } else {
      const res = CommendHouseList
      setHoustList(res)
    }
  }

  return (
    <SafeAreaView style={CommonStyle.container}>
      <DefaultNavigationHeader
        title='我的推荐'
        showLeftIcon
        showRightFirstIcon
        showRightSecondIcon
        leftCallBack={() => {
          navigation.goBack()
        }}
      />
      <MyTab
        current={tab.current}
        cellTextStyle={{
          fontSize: UnitConvert.dpi(32)
        }}
        list={Constant.recommend_tab_arr}
        onChange={(item: tabItemType, index: number) => {
          initData(item.val)
          setTab({
            current: index,
            row: item
          })
        }}
      />
      <TabPane type={tab.row.val} list={tab.row.val === '客源' ? custList : houseList} />
    </SafeAreaView>
  );
};

export default MyRecommend;

const styles = StyleSheet.create({
  container: {}
});
