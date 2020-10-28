import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import CommonStyle from '@/utils/constant/Style'
import CommonAssetAuction from '@/components/CommonAssetAuction';
import { AssetAutionData, AssetDic, JudicialAuctionData } from '@/assets/data/AssetAuction';
import { SecondHouseData } from '@/assets/data/SecondHouse';
import CommonSecondHouseList from '@/components/CommonSecondHoseList';
import { tabItemType } from '../Recommend';
import CommonNoData from '@/components/CommonNoData';

interface TabPaneProps {
  row: tabItemType
}

const TabPane = (props: TabPaneProps) => {
  if(props.row.val === '资产拍卖') {
    if(Array.isArray(AssetAutionData) && AssetAutionData.length > 0) {
      return (
        <ScrollView style={CommonStyle.container}>
          <CommonAssetAuction list={AssetAutionData} comDic={AssetDic} />
        </ScrollView>
      )
    } else {
      return (
        <CommonNoData style={CommonStyle.content2} />
      )
    }
  } else if(props.row.val === '司法拍卖') {
    if(Array.isArray(JudicialAuctionData) && JudicialAuctionData.length > 0) {
      return (
        <ScrollView style={CommonStyle.container}>
          <CommonAssetAuction list={JudicialAuctionData} comDic={AssetDic} />
        </ScrollView>
      )
    } else {
      return (
        <CommonNoData style={CommonStyle.content2} />
      )
    }
  } else {
    if(Array.isArray(SecondHouseData) && SecondHouseData.length > 0) {
      return (
        <ScrollView style={CommonStyle.container}>
          <CommonSecondHouseList list={SecondHouseData} comDic={AssetDic} />
        </ScrollView>
      )
    } else {
      return (
        <CommonNoData style={CommonStyle.content2} />
      )
    }
  }
};

export default TabPane;

const styles = StyleSheet.create({
});
