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
import TabPane from './TabPane';
import MyModalSelect from '@/components/MyModalSelect';
import CommonArea from '@/components/CommonArea';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';
import { getSubTypeList, getStatusBarHeight } from '@/utils/utils';
import { dicType } from '@/models/Recommend';
import { AssetDic } from '@/assets/data/AssetAuction';
import CommonModalBottomBtn from '@/components/CommonModalBottomBtn';
import CommonPrice from '@/components/CommonPrice';
import CommonCheckboxDic from '@/components/CommonCheckboxDic';
import AuctionTime from './AuctionTime';
import MyDatePicker from '@/components/MyDatePicker';
import moment from 'moment';

function mapStateToProps(state: RootState) {
  return {
    barHeight: state.home.barHeight
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

// 数据字典多选的每项
export type commonDicState = {
  DicName?: string,
  DicCode?: number,
  MinPrice?: number,
  MaxPrice?: number,
  select?: boolean,
  id?: number
}

type checkboxDicState = {
  statusArr: commonDicState[]
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
    priceArr: Constant.auctionPriceArr, // 数据源
  })
  // 状态要用到的字段
  const [status, setStatus] = React.useState<checkboxDicState>({
    statusArr: []
  })

  const [auctionTime, setAuctionTime] = React.useState({
    beginDate: '',                        // 开始日期
    endDate: '',                          // 结束日期
    dateModal: false,                     // 日期弹窗状态
    dateType: ''                          // 日期类型(begin,end)
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
    let arr: dicType[] = []
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

    // 组装状态的数组
    const StatusArrParam: commonDicState[] = [] // 状态
    arr.map(item => {
      if (item.SubTypeCode === 4700) { // 状态
        item.select = false
        StatusArrParam.push(item)
      }
    })
    setStatus({
      statusArr: StatusArrParam
    })
  }, [])

  // 获取modal的高度
  const getModalHeight = () => {
    if (tab.current === 0) { // 区域
      return Platform.OS === 'android' ? UnitConvert.dpi(910) : UnitConvert.dpi(910) + props.barHeight
    } else if (tab.current === 1) { // 价格
      return Platform.OS === 'android' ? UnitConvert.dpi(610) : UnitConvert.dpi(610) + props.barHeight
    } else if (tab.current === 2) { // 拍卖状态
      return Platform.OS === 'android' ? UnitConvert.dpi(520) : UnitConvert.dpi(520) + props.barHeight
    } else { // 拍卖时间
      return Platform.OS === 'android' ? UnitConvert.dpi(470) : UnitConvert.dpi(470) + props.barHeight
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
            list={status.statusArr}
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
          <AuctionTime
            startTimeCallBack={() => {
              setAuctionTime({
                ...auctionTime,
                dateModal: true,
                dateType: 'begin'
              })
            }}
            endTimeCallBack={() => {
              setAuctionTime({
                ...auctionTime,
                dateModal: true,
                dateType: 'end'
              })
            }}
            defaultStartTime={auctionTime.beginDate}
            defaultEndTime={auctionTime.endDate}
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
    }
  }

  const showDatePicker = () => {
    if (auctionTime.dateType === 'begin') {
      return (
        <MyDatePicker
          onOk={(v: any) => {
            console.log('v', v)
            setAuctionTime({
              ...auctionTime,
              beginDate: v,
              dateModal: false
            })
          }}
          onCancel={() => {
            setAuctionTime({
              ...auctionTime,
              dateModal: false
            })
          }}
          defaultDate={auctionTime.beginDate ? moment(auctionTime.beginDate).format('YYYY-MM-DD') :
            moment(new Date()).format('YYYY-MM-DD')}
          maxDate={moment().add(30, 'y').toDate()}
          isOpen={auctionTime.dateModal}
          title="开始时间"
        />
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
        <Image source={ENV_IMAGE.banner2} style={styles.asset_banner} />
      </View>
      {/* 选项卡 */}
      {showTab()}
      <View style={CommonStyle.sizedBox}></View>
      <TabPane title={route.params.title ? route.params.title : '司法拍卖'} />
      {/* {showModal()} */}
      {showDatePicker()}
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
