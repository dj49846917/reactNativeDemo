import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, Platform } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackNavigation } from '@/router/index';
import { ENV_ICON, ENV_IMAGE } from '@/assets/styles/picUrl';
import { UnitConvert } from '@/utils/unitConvert';
import { Constant } from '@/utils/constant/Constant';
import MyTab from '@/components/MyTab';
import { tabItemType } from '../Recommend';
import MyModalSelect from '@/components/MyModalSelect';
import CommonArea from '@/components/CommonArea';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';
import { getSubTypeList, getStatusBarHeight } from '@/utils/utils';
import { dicType } from '@/models/Recommend';
import CommonModalBottomBtn from '@/components/CommonModalBottomBtn';
import CommonPrice from '@/components/CommonPrice';
import CommonCheckboxDic from '@/components/CommonCheckboxDic';
import MyDatePicker from '@/components/MyDatePicker';
import moment from 'moment';
import { SecondHouseDic } from '@/assets/data/SecondHouse';
import TabPane from './TabPane';
import { ScrollView } from 'react-native-gesture-handler';

function mapStateToProps(state: RootState) {
  return {
    barHeight: state.home.barHeight
  }
}

const connector = connect(mapStateToProps)

type ModalState = ConnectedProps<typeof connector> // 定义connect的类型

interface SecondHouseProps extends ModalState {
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

// 数据字典多选的每项
export type commonDicState = {
  DicName?: string,
  DicCode?: number,
  MinPrice?: number,
  MaxPrice?: number,
  select?: boolean,
  id?: number
}
// 价格
type checkboxDicState = {
  houseTypeArr: commonDicState[]
}
// 更多
type moreState = {
  areaArr: commonDicState[],
  orientationsArr: commonDicState[],
  floorTypeArr: commonDicState[],
  renovationArr: commonDicState[],
  isElevatorArr: commonDicState[],
  propertyPurpose: commonDicState[]
}

const SecondHouse = (props: SecondHouseProps) => {
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
    priceArr: Constant.auctionPriceArr, // 数据源
  })
  // 户型要用到的字段
  const [houseType, setHouseType] = React.useState<checkboxDicState>({
    houseTypeArr: Constant.houseTypeArr
  })

  // 更多要用到的字段
  const [more, setMore] = React.useState<moreState>({
    areaArr: Constant.areaArr,
    orientationsArr: [],
    floorTypeArr: [],
    renovationArr: [],
    isElevatorArr: [],
    propertyPurpose: []
  })

  React.useEffect(() => {
    const dicCodeArr = [1000, 1110, 2003, 2033, 2032, 2004, 4700]
    let arr: dicType[] = []
    const orientationsArrParam: commonDicState[] = [] // 朝向
    const floorTypeArrParam: commonDicState[] = [] // 楼层级别
    const renovationArrParam: commonDicState[] = [] // 装修状况
    const isElevatorArrParam: commonDicState[] = [] // 有无电梯
    const propertyPurposeParam: commonDicState[] = [] // 房屋用途
    SecondHouseDic.forEach(item => {
      dicCodeArr.forEach((it: number) => {
        if (item.SubTypeCode === it) {
          arr.push(item)
        }
      })
      const newItem: commonDicState = item
      if (item.SubTypeCode === 2033) { // 朝向
        newItem.select = false
        orientationsArrParam.push(newItem)
      }
      if (item.SubTypeCode === 2032) { // 楼层级别
        newItem.select = false
        floorTypeArrParam.push(newItem)
      }
      if (item.SubTypeCode === 2004) { // 装修状况
        newItem.select = false
        renovationArrParam.push(newItem)
      }
      if (item.SubTypeCode === 1000) { // 是否有电梯
        newItem.select = false
        isElevatorArrParam.push(newItem)
      }
      if (item.SubTypeCode === 2003) { // 房屋用途
        newItem.select = false
        propertyPurposeParam.push(newItem)
      }
    })
    setFields({
      ...fields,
      dicArr: arr,
    })
    setMore({
      ...more,
      orientationsArr: orientationsArrParam,
      floorTypeArr: floorTypeArrParam,
      renovationArr: renovationArrParam,
      isElevatorArr: isElevatorArrParam,
      propertyPurpose: propertyPurposeParam,
    })
  }, [])

  // 获取modal的高度
  const getModalHeight = () => {
    if (tab.current === 0) { // 区域
      return Platform.OS === 'android' ? UnitConvert.dpi(910) : UnitConvert.dpi(910) + props.barHeight
    } else if (tab.current === 1) { // 价格
      return Platform.OS === 'android' ? UnitConvert.dpi(610) : UnitConvert.dpi(610) + props.barHeight
    } else if (tab.current === 2) { // 户型
      return Platform.OS === 'android' ? UnitConvert.dpi(520) : UnitConvert.dpi(520) + props.barHeight
    } else { // 更多
      return Platform.OS === 'android' ? UnitConvert.dpi(800) : UnitConvert.h
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
        list={Constant.secondHouse_tab_arr}
        showUnderLine={false}
        height={UnitConvert.dpi(80)}
        tabStyle={{
          paddingLeft: UnitConvert.dpi(70),
          paddingRight: UnitConvert.dpi(40),
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: UnitConvert.dpi(80)
        }}
        cellStyle={{}}
        mode='icon'
        onChange={(item: tabItemType, index: number) => {
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

  // modal的主体内容
  const showMyModalView = () => {
    // 区域
    if (tab.current === 0) {
      return (
        <View style={CommonStyle.container}>
          {Platform.OS === 'android' ? null : <View style={{ height: props.barHeight }}></View>}
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
        </View>
      )
    } else if (tab.current === 1) {
      // 价格
      return (
        <SafeAreaView style={CommonStyle.container}>
          {Platform.OS === 'android' ? null : <View style={{ height: props.barHeight }}></View>}
          {showNav()}
          {showTab()}
          <CommonPrice
            dicArr={price.priceArr}
            onSelect={(v: any, c: any) => {
              setPrice({
                priceArr: v,
              })
            }}
          />
          <CommonModalBottomBtn
            cancelClick={() => {
              Constant.auctionPriceArr.forEach(item => {
                item.select = false
              })
              setPrice({
                priceArr: Constant.auctionPriceArr
              })
              setTab({
                current: -1,
                title: '',
                modalVisible: false
              })
            }}
            okClick={() => {
              setTab({
                current: -1,
                title: '',
                modalVisible: false
              })
            }}
          />
        </SafeAreaView>
      )
    } else if (tab.current === 2) {
      return (
        <SafeAreaView style={CommonStyle.container}>
          {Platform.OS === 'android' ? null : <View style={{ height: props.barHeight }}></View>}
          {showNav()}
          {showTab()}
          <CommonCheckboxDic
            list={houseType.houseTypeArr}
            title='拍卖状态'
          />
          <CommonModalBottomBtn
            cancelClick={() => {
              setTab({
                current: -1,
                title: '',
                modalVisible: false
              })
            }}
            okClick={() => {
              setTab({
                current: -1,
                title: '',
                modalVisible: false
              })
            }}
          />
        </SafeAreaView>
      )
    } else {
      return (
        <SafeAreaView style={CommonStyle.container}>
          {Platform.OS === 'android' ? null : <View style={{ height: props.barHeight }}></View>}
          {showNav()}
          {showTab()}
          <ScrollView style={CommonStyle.container}>
            <CommonCheckboxDic
              list={more.orientationsArr}
              title='朝向'
            />
            <CommonCheckboxDic
              list={more.floorTypeArr}
              title='楼层'
            />
            <CommonCheckboxDic
              list={more.renovationArr}
              title='装修'
            />
            <CommonCheckboxDic
              list={more.isElevatorArr}
              title='电梯'
            />
            <CommonCheckboxDic
              list={more.propertyPurpose}
              title='用途'
            />
          </ScrollView>
          <CommonModalBottomBtn
            cancelClick={() => {
              setTab({
                current: -1,
                title: '',
                modalVisible: false
              })
            }}
            okClick={() => {
              setTab({
                current: -1,
                title: '',
                modalVisible: false
              })
            }}
          />
        </SafeAreaView>
      )
    }
  }

  return (
    <SafeAreaView style={CommonStyle.container}>
      {/* 顶部搜索 */}
      {showNav()}
      {showModal()}
      {/* banner图 */}
      <View style={styles.asset_banner_box}>
        <Image source={ENV_IMAGE.banner} style={styles.asset_banner} />
      </View>
      {/* 选项卡 */}
      {showTab()}
      <View style={CommonStyle.sizedBox}></View>
      <TabPane />
    </SafeAreaView>
  );
};

export default connector(SecondHouse);

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
