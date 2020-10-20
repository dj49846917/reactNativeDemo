import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import Search from '@/pages/Home/Search';
import Swiper from '@/pages/Home/Swiper';
import Category from '@/pages/Home/Category';
import { Constant } from '@/utils/constant/Constant';
import Addvertisement from '@/pages/Home/Addvertisement';
import { ScrollView } from 'react-native-gesture-handler';
import CommonStyle from '@/utils/constant/Style';
import { UnitConvert } from '@/utils/unitConvert';
import MyTab from '@/components/MyTab';
import TabPane from '@/pages/Home/TabPane';
import { tabType, tabItemType } from '../Recommend';

interface HomeProps {
}

const Home = (props: HomeProps) => {
  const [tab, setTab] = useState<tabType>({
    current: 0,
    row: Constant.collection_tab_arr[0]
  })

  return (
    <SafeAreaView style={CommonStyle.container}>
      {/* 顶部搜索 */}
      <Search />
      {/* banner图 */}
      <ScrollView style={CommonStyle.container}>
        <Swiper />
        {/* 分类 */}
        <Category list={Constant.home_category_arr} />
        {/* 广告 */}
        <Addvertisement />
        {/* 选项卡 */}
        <View style={styles.home_tab}>
          <Text style={styles.home_tab_left}>为你推荐</Text>
          <MyTab
            width={UnitConvert.dpi(300)}
            height={UnitConvert.dpi(130)}
            cellTextStyle={{
              fontSize: UnitConvert.dpi(24)
            }}
            tabStyle={{
              justifyContent: 'space-between'
            }}
            cellStyle={{
              height: UnitConvert.dpi(130)
            }}
            showUnderLine={false}
            current={tab.current}
            list={Constant.collection_tab_arr}
            onChange={(item: tabItemType, index: number)=>{
              setTab({
                current: index,
                row: item
              })
            }}
          />
        </View>
        {/* 列表 */}
        <TabPane row={tab.row} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  home_tab: {
    width: UnitConvert.w,
    paddingHorizontal: UnitConvert.dpi(36),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: UnitConvert.dpi(0),
  },
  home_tab_left: {
    fontSize: UnitConvert.dpi(36),
    color: '#000'
  },
});
