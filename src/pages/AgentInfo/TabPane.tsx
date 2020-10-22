import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import CommonStyle from '@/utils/constant/Style'
import CommonAssetAuction from '@/components/CommonAssetAuction';
import { AssetAutionData, AssetDic, JudicialAuctionData } from '@/assets/data/AssetAuction';
import { SecondHouseData } from '@/assets/data/SecondHouse';
import CommonSecondHouseList from '@/components/CommonSecondHoseList';
import { tabItemType } from '../Recommend';

interface TabPaneProps {
  tabType: string                       // 选中的id
}

const TabPane = (props: TabPaneProps) => {
  if (props.tabType === '1') {
    return (
      <ScrollView style={CommonStyle.container}>
        <CommonAssetAuction list={AssetAutionData} comDic={AssetDic} />
      </ScrollView>
    )
  } else if (props.tabType === '2') {
    return (
      <ScrollView style={CommonStyle.container}>
        <CommonAssetAuction list={JudicialAuctionData} comDic={AssetDic} />
      </ScrollView>
    )
  } else {
    return (
      <ScrollView style={CommonStyle.container}>
        <CommonSecondHouseList list={SecondHouseData} comDic={AssetDic} />
      </ScrollView>
    )
  }
};

export default TabPane;

const styles = StyleSheet.create({
});
