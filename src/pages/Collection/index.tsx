import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import MyTab, { listType } from '@/components/MyTab';
import { Constant } from '@/utils/constant/Constant';
import NavBar from '@/pages/Collection/NavBar';
import TabPane from './TabPane';

interface CollectionProps { }

const Collection = (props: CollectionProps) => {
  const [tab, setTab] = useState({
    current: 0,
    row: Constant.collection_tab_arr[0]
  })
  return (
    <SafeAreaView style={CommonStyle.container}>
      <NavBar />
      {/* 选项卡 */}
      <MyTab
        current={tab.current}
        list={Constant.collection_tab_arr}
        onChange={(item: listType, index: number)=>{
          setTab({
            current: index,
            row: item
          })
        }}
      />
      {/* 主体内容 */}
      <TabPane row={tab.row} />
    </SafeAreaView>
  );
};

export default Collection;

const styles = StyleSheet.create({
  
});
