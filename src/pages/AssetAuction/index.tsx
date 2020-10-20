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
import CommonArea from '@/components/CommonArea';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';
import { getSubTypeList } from '@/utils/utils';
import { dicType } from '@/models/Recommend';
import { AssetDic } from '@/assets/data/AssetAuction';
import CommonModalBottomBtn from '@/components/CommonModalBottomBtn';
import CommonPrice from '@/components/CommonPrice';

function mapStateToProps(state: RootState) {
  return {
    // dicArr: state.assetAuction.dicArr,
    // loading: state.loading.effects['home/asyncAdd']
  }
}

const connector = connect(mapStateToProps)

type ModalState = ConnectedProps<typeof connector> // 定义connect的类型

interface AssetAuctionProps extends ModalState {
  navigation: RootStackNavigation
}

type IrouteTypes = {
  title: string
}

type IState = {
  dicArr: dicType[],
  areaSelectedItem: dicType,
  Location: number | undefined
}

const AssetAuction = (props: AssetAuctionProps) => {
  const route = useRoute<RouteProp<Record<string, IrouteTypes>, string>>()
  // 搜索框的字段
  const [AssetName, setAssetName] = React.useState('')
  const [tab, setTab] = React.useState({
    current: -1,
    title: '',
    modalVisible: false
  })
  // 页面要用到的字段
  const [fields, setFields] = React.useState<IState>({
    dicArr: [],                     // 数据字典
    areaSelectedItem: {},           // 选中的区域对象
    Location: undefined,            // 选中的区域
  })
  // 价格要用到的字段
  const [price, setPrice] = React.useState({
    priceArr: Constant.auctionPriceArr
  })

  React.useEffect(() => {
    // 查询数据字典
    // props.dispatch({
    //   type: 'assetAuction/getSysDic',
    //   payload: {
    //     params: [1000, 1110, 2003, 2033, 2032, 2004, 4700]
    //   }
    // })
    const dicCodeArr = [1000, 1110, 2003, 2033, 2032, 2004, 4700]
    let arr: { DicCode: number; DicName: string; SubTypeCode: number; BaseTypeCode: number }[] = []
    AssetDic.forEach(item => {
      dicCodeArr.forEach((it: number) => {
        if (item.SubTypeCode === it) {
          arr.push(item)
        }
      })
    })
    setFields({
      ...fields,
      dicArr: arr
    })
  }, [])

  // 获取modal的高度
  const getModalHeight = () => {
    if (tab.current === 0) { // 区域
      return UnitConvert.dpi(986)
    } else if (tab.current === 1) { // 价格
      return UnitConvert.dpi(690)
    } else if (tab.current === 2) { // 拍卖状态
      return UnitConvert.dpi(450)
    } else { // 拍卖时间
      return UnitConvert.dpi(400)
    }
  }

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
          console.log(item, index, tab.current, fields.Location)
          if (tab.current === index) {
            if (fields.Location) {
              const res = getSubTypeList(fields.dicArr, 1110).filter(x => x.DicCode === fields.Location)
              setFields({
                ...fields,
                areaSelectedItem: res[0]
              })
            }
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
        height={getModalHeight()}
        custormAllView={
          showMyModalView()
        }
      />
    )
  }

  const showMyModalView = () => {
    // 区域
    if(tab.current === 0) {
      return (
        <SafeAreaView style={CommonStyle.container}>
          {showNav()}
          {showTab()}
          <CommonArea
            defaultValue={fields.areaSelectedItem}
            dicArr={getSubTypeList(fields.dicArr, 1110)}
            onChange={(item: dicType, index: number) => {
              setFields({
                ...fields,
                areaSelectedItem: item
              })
            }}
          />
          <CommonModalBottomBtn
            cancelClick={() => {
              setFields({
                ...fields,
                areaSelectedItem: {}
              })
              setTab({
                current: -1,
                title: '',
                modalVisible: false
              })
            }}
            okClick={() => {
              if (JSON.stringify(fields.areaSelectedItem) === '{}') {
                setFields({
                  ...fields,
                  Location: undefined
                })
              } else {
                setFields({
                  ...fields,
                  Location: fields.areaSelectedItem.DicCode
                })
              }
              setTab({
                current: -1,
                title: '',
                modalVisible: false
              })
            }}
          />
        </SafeAreaView>
      )
    } else if(tab.current === 1) {
      // 价格
      return (
        <SafeAreaView style={CommonStyle.container}>
          {showNav()}
          {showTab()}
          <CommonPrice 
            dicArr={price.priceArr}
            onSelect={(v: any)=>{
              console.log('v', v)
              setPrice({
                priceArr: v
              })
            }}
          />
          <CommonModalBottomBtn 
            cancelClick={()=>{}}
            okClick={()=>{}}
          />
        </SafeAreaView>
      )
    }
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

export default connector(AssetAuction);

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
