import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Platform, StatusBar, NativeModules } from 'react-native';
import Search from '@/pages/Home/Search';
import Swiper from '@/pages/Home/Swiper';
import Category from '@/pages/Home/Category';
import { Constant } from '@/utils/constant/Constant';
import Addvertisement from '@/pages/Home/Addvertisement';
import { ScrollView } from 'react-native-gesture-handler';
import CommonStyle from '@/utils/constant/Style';
import { UnitConvert } from '@/utils/unitConvert';
import MyTab from '@/components/MyTab';
import TabPane from '@/pages/Home/TabPane';
import { tabType, tabItemType } from '../Recommend';
import { RootState } from '@/models/index';
import { ConnectedProps, connect } from 'react-redux';

function mapStateToProps(state: RootState) {
  return {
    barHeight: state.home.barHeight
    // loading: state.loading.effects['home/asyncAdd']
  }
}

const connector = connect(mapStateToProps)
type ModelState = ConnectedProps<typeof connector> // 定义connect的类型

interface HomeProps extends ModelState {
}

const Home = (props: HomeProps) => {
  const [tab, setTab] = useState<tabType>({
    current: 0,
    row: Constant.collection_tab_arr[0]
  })

  useEffect(()=>{
    getStatusBarHeight()
  }, [])

  // 获取导航栏的高度
  const getStatusBarHeight = () => {
    if (Platform.OS === 'android') {
      props.dispatch({
        type: 'home/getBarHeight',
        payload: {
          barHeight: StatusBar.currentHeight
        }
      })
    } else {
      const { StatusBarManager } = NativeModules;
      StatusBarManager.getHeight((statusBarHeight: { height: number }) => {
        props.dispatch({
          type: 'home/getBarHeight',
          payload: {
            barHeight: statusBarHeight.height
          }
        })
      });
    }
  }

  return (
    <SafeAreaView style={CommonStyle.container}>
      {/* 顶部搜索 */}
      <Search />
      {/* banner图 */}
      <ScrollView style={CommonStyle.container}>
        <Swiper />
        {/* 分类 */}
        <Category list={Constant.home_category_arr} />
        {/* 广告 */}
        <Addvertisement />
        {/* 选项卡 */}
        <View style={styles.home_tab}>
          <Text style={styles.home_tab_left}>为你推荐</Text>
          <MyTab
            width={UnitConvert.dpi(300)}
            height={UnitConvert.dpi(130)}
            cellTextStyle={{
              fontSize: UnitConvert.dpi(24)
            }}
            tabStyle={{
              justifyContent: 'space-between'
            }}
            cellStyle={{
              height: UnitConvert.dpi(130)
            }}
            showUnderLine={false}
            current={tab.current}
            list={Constant.collection_tab_arr}
            onChange={(item: tabItemType, index: number)=>{
              setTab({
                current: index,
                row: item
              })
            }}
          />
        </View>
        {/* 列表 */}
        <TabPane row={tab.row} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default connector(Home);

const styles = StyleSheet.create({
  home_tab: {
    width: UnitConvert.w,
    paddingHorizontal: UnitConvert.dpi(36),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: UnitConvert.dpi(0),
  },
  home_tab_left: {
    fontSize: UnitConvert.dpi(36),
    color: '#000'
  },
});
