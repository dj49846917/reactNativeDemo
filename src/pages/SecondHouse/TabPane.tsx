import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import CommonStyle from '@/utils/constant/Style'
import CommonSecondHouseList from '@/components/CommonSecondHoseList';
import { SecondHouseData, SecondHouseDic } from '@/assets/data/SecondHouse';
import CommonNoData from '@/components/CommonNoData';
import { Constant } from '@/utils/constant/Constant';

interface TabPaneProps {

}

const TabPane = (props: TabPaneProps) => {
  if (Array.isArray(SecondHouseData) && SecondHouseData.length > 0) {
    return (
      <ScrollView style={CommonStyle.container}>
        <CommonSecondHouseList list={SecondHouseData} comDic={SecondHouseDic} />
      </ScrollView>
    )
  } else {
    return (
      <CommonNoData style={{ backgroundColor: Constant.defaultBgColor }} />
    )
  }
  
};

export default TabPane;

const styles = StyleSheet.create({
});
