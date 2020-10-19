import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackNavigation } from '@/router/index';
import { ENV_ICON, ENV_IMAGE } from '@/assets/styles/picUrl';
import { UnitConvert } from '@/utils/unitConvert';
import { Constant } from '@/utils/constant/Constant';
import MyTab from '@/components/MyTab';
import { tabItemType } from '../Recommend';
import TabPane from './TabPane';
import MyModalSelect from '@/components/MyModalSelect';

interface AssetAuctionProps {
  navigation: RootStackNavigation
}

type IrouteTypes = {
  title: string
}

const AssetAuction = (props: AssetAuctionProps) => {
  const route = useRoute<RouteProp<Record<string, IrouteTypes>, string>>()
  const [AssetName, setAssetName] = React.useState('')
  const [tab, setTab] = React.useState({
    current: -1,
    title: '',
    modalVisible: false
  })

  // 展示导航栏
  const showNav = () => {
    return (
      <DefaultNavigationHeader
        title={route.params.title ? route.params.title : '司法拍卖'}
        showLeftIcon
        showRightFirstIcon
        showRightSecondIcon
        rightFirstIconSource={ENV_ICON.icon_top_loc}
        rightSecondIconSource={ENV_ICON.icon_top_msg}
        mode='input'
        defaultValue={AssetName}
        placeholder='请输入小区或商圈名'
        navigation={props.navigation}
        getSearchData={(v: string) => {
          setAssetName(v)
        }}
      />
    )
  }

  // 展示tab
  const showTab = () => {
    return (
      <MyTab
        current={tab.current}
        list={Constant.assetAuction_tab_arr}
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
          console.log(item, index)
          if (tab.current === index) {
            setTab({
              current: -1,
              title: '',
              modalVisible: false
            })
          } else {
            setTab({
              current: index,
              title: item.val,
              modalVisible: true
            })
          }
        }}
      />
    )
  }

  // 展示弹窗
  const showModal = () => {
    return (
      <MyModalSelect
        visible={tab.modalVisible}
        position='top'
        height={UnitConvert.dpi(800)}
        custormAllView={
          <SafeAreaView style={CommonStyle.container}>
            {showNav()}
            {showTab()}
          </SafeAreaView>
        }
      />
    )
  }

  return (
    <SafeAreaView style={CommonStyle.container}>
      {/* 顶部搜索 */}
      {showNav()}
      {/* banner图 */}
      <View style={styles.asset_banner_box}>
        <Image source={ENV_IMAGE.banner2} style={styles.asset_banner} />
      </View>
      {/* 选项卡 */}
      {showTab()}
      <View style={CommonStyle.sizedBox}></View>
      <TabPane title={route.params.title ? route.params.title : '司法拍卖'} />
      {showModal()}
    </SafeAreaView>
  );
};

export default AssetAuction;

const styles = StyleSheet.create({
  asset_banner_box: {
    backgroundColor: '#fff',
    height: UnitConvert.dpi(280)
  },
  asset_banner: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(280)
  },
});
