import React, { useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import Search from '@/pages/Home/Search';
import Swiper from '@/pages/Home/Swiper';
import Category from '@/pages/Home/Category';
import { Constant } from '@/utils/constant/Constant';
import Addvertisement from '@/pages/Home/Addvertisement';
import SwitchTab from '@/pages/Home/SwitchTab';
import CommonAssetAuction from '@/components/CommonAssetAuction';
import { AssetAutionData, AssetDic, JudicialAuctionData } from '@/assets/data/AssetAuction';
import { SecondHouseData } from '@/assets/data/SecondHouse'
import { ScrollView } from 'react-native-gesture-handler';
import CommonSecondHouseList from '@/components/CommonSecondHoseList';

interface HomeProps {

}

const Home = (props: HomeProps) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* 顶部搜索 */}
      <Search />
      {/* banner图 */}
      <ScrollView style={styles.container}>
        <Swiper />
        {/* 分类 */}
        <Category list={Constant.home_category_arr} />
        {/* 广告 */}
        <Addvertisement />
        {/* 选项卡 */}
        <SwitchTab list={Constant.home_tab_arr} />
        {/* 列表 */}
        {/* <CommonAssetAuction list={AssetAutionData} comDic={AssetDic} /> */}
        <CommonSecondHouseList list={SecondHouseData} comDic={AssetDic} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
