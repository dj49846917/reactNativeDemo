import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import MyTab from '@/components/MyTab';
import CommonStyle from '@/utils/constant/Style';
import { UnitConvert } from '@/utils/unitConvert';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';

interface TabProps { }

type tabItemType = {
  id: string,
  val: string
}

const collection_tab_arr = [ // 收藏
  { id: '0', val: '资产拍卖' },
  { id: '1', val: '司法拍卖' },
  { id: '2', val: '二手房' },
]

const Tab = (props: TabProps) => {
  const navigation = useNavigation()
  const [tab, setTab] = useState({
    current: 0,
    row: collection_tab_arr[0]
  })

  return (
    <SafeAreaView style={CommonStyle.container}>
      <DefaultNavigationHeader
        title='Tab选项卡'
        showLeftIcon
        navigation={navigation}
      />
      <View style={styles.list}>
        <MyTab
          current={tab.current}
          list={collection_tab_arr}
          onChange={(item: tabItemType, index: number) => {
            setTab({
              current: index,
              row: item
            })
          }}
        />
      </View>
      <View style={styles.list}>
        <MyTab
          current={tab.current}
          list={collection_tab_arr}
          showUnderLine={false}
          height={UnitConvert.dpi(80)}
          tabStyle={{
            paddingLeft: UnitConvert.dpi(50),
            paddingRight: UnitConvert.dpi(20),
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: UnitConvert.dpi(80)
          }}
          cellStyle={{}}
          mode='icon'
          onChange={(item: tabItemType, index: number) => {
            if (tab.current === index) {
              setTab({
                current: -1,
                row: {
                  id: '',
                  val: ''
                }
              })
            } else {
              setTab({
                current: index,
                row: item
              })
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Tab;

const styles = StyleSheet.create({
  list: {
    marginTop: UnitConvert.dpi(30),
    backgroundColor: '#fff'
  }
});
