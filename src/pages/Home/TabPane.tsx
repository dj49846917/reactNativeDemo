import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import CommonStyle from '@/utils/constant/Style'
import CommonAssetAuction from '@/components/CommonAssetAuction';
import { AssetAutionData, AssetDic, JudicialAuctionData } from '@/assets/data/AssetAuction';
import { SecondHouseData } from '@/assets/data/SecondHouse';
import CommonSecondHouseList from '@/components/CommonSecondHoseList';
import { tabItemType } from '../Recommend';

interface TabPaneProps {
  row: tabItemType
}

const TabPane = (props: TabPaneProps) => {
  if(props.row.val === '资产拍卖') {
    return (
      <ScrollView style={CommonStyle.container}>
        <CommonAssetAuction list={AssetAutionData} comDic={AssetDic} />
      </ScrollView>
    )
  } else if(props.row.val === '司法拍卖') {
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
