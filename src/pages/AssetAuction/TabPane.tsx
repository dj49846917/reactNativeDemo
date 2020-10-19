import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import CommonStyle from '@/utils/constant/Style'
import CommonAssetAuction from '@/components/CommonAssetAuction';
import { AssetAutionData, AssetDic, JudicialAuctionData } from '@/assets/data/AssetAuction';

interface TabPaneProps {
  title: string
}

const TabPane = (props: TabPaneProps) => {
  if (props.title === '司法拍卖') {
    return (
      <ScrollView style={CommonStyle.container}>
        <CommonAssetAuction list={JudicialAuctionData} comDic={AssetDic} />
      </ScrollView>
    )
  } else {
    return (
      <ScrollView style={CommonStyle.container}>
        <CommonAssetAuction list={AssetAutionData} comDic={AssetDic} />
      </ScrollView>
    )
  }
};

export default TabPane;

const styles = StyleSheet.create({
});
