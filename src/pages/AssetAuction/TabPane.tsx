import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import CommonStyle from '@/utils/constant/Style'
import CommonAssetAuction from '@/components/CommonAssetAuction';
import { AssetAutionData, AssetDic, JudicialAuctionData } from '@/assets/data/AssetAuction';
import CommonNoData from '@/components/CommonNoData';
import { Constant } from '@/utils/constant/Constant';

interface TabPaneProps {
  title: string
}

const TabPane = (props: TabPaneProps) => {
  if (props.title === '司法拍卖') {
    if (Array.isArray(JudicialAuctionData) && JudicialAuctionData.length > 0) {
      return (
        <ScrollView style={CommonStyle.container}>
          <CommonAssetAuction list={JudicialAuctionData} comDic={AssetDic} />
        </ScrollView>
      )
    } else {
      return (
        <CommonNoData style={{ backgroundColor: Constant.defaultBgColor }} />
      )
    }
  } else {
    if (Array.isArray(AssetAutionData) && AssetAutionData.length > 0) {
      return (
        <ScrollView style={CommonStyle.container}>
          <CommonAssetAuction list={AssetAutionData} comDic={AssetDic} />
        </ScrollView>
      )
    } else {
      return (
        <CommonNoData style={{ backgroundColor: Constant.defaultBgColor }} />
      )
    }
  }
};

export default TabPane;

const styles = StyleSheet.create({
});
