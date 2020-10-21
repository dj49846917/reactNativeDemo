import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import CommonStyle from '@/utils/constant/Style'
import CommonSecondHouseList from '@/components/CommonSecondHoseList';
import { SecondHouseData, SecondHouseDic } from '@/assets/data/SecondHouse';

interface TabPaneProps {
  
}

const TabPane = (props: TabPaneProps) => {
  return (
    <ScrollView style={CommonStyle.container}>
        <CommonSecondHouseList list={SecondHouseData} comDic={SecondHouseDic} />
      </ScrollView>
  )
};

export default TabPane;

const styles = StyleSheet.create({
});
