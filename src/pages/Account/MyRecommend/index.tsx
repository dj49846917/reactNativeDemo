import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Platform, ScrollView } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import { useNavigation } from '@react-navigation/native';
import MyTab from '@/components/MyTab';
import { Constant } from '@/utils/constant/Constant';
import { tabItemType, tabType } from '@/pages/Recommend';
import { UnitConvert } from '@/utils/unitConvert';
import TabPane from './TabPane';
import { commendCustList, CommendHouseList } from '@/assets/data/MyCommend';
import CommonTimeSearch from '@/components/CommonTimeSearch';
import MyModalSelect from '@/components/MyModalSelect';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import CommonModalBottomBtn from '@/components/CommonModalBottomBtn';
import MyDatePicker from '@/components/MyDatePicker';
import moment from 'moment';
import CommonNoData from '@/components/CommonNoData';

function mapStateToProps(state: RootState) {
  return {
    barHeight: state.home.barHeight
  }
}

const connector = connect(mapStateToProps)
type ModalState = ConnectedProps<typeof connector> // 定义connect的类型
interface MyRecommendProps extends ModalState {

}

type custIstate = any[]

const MyRecommend = (props: MyRecommendProps) => {
  const navigation = useNavigation()

  // tab切换
  const [tab, setTab] = useState<tabType>({
    current: 0,
    row: Constant.recommend_tab_arr[0]
  })

  const [auctionTime, setAuctionTime] = React.useState({
    visible: false,                       // 时间弹窗
    beginDate: '',                        // 开始日期
    endDate: '',                          // 结束日期
    dateModal: false,                     // 日期弹窗状态
    dateType: ''                          // 日期类型(begin,end)
  })
  const [searchVisible, setSearchVisible] = useState(false)
  const [custList, setCustList] = useState<custIstate>([])
  const [houseList, setHoustList] = useState<custIstate>([])

  useEffect(() => {
    initData(Constant.recommend_tab_arr[0].val)
  }, [])

  // 初始化数据
  const initData = (type: string) => {
    if (type === '客源') {
      const res = commendCustList
      setCustList(res)
    } else {
      const res = CommendHouseList
      setHoustList(res)
    }
  }

  // 展示导航栏
  const showNav = () => {
    return (
      <>
        {
          searchVisible ? (
            <DefaultNavigationHeader
              showLeftIcon={false}
              mode='input'
              showRightSecondIcon
              rightSecondIconType='text'
              rightSecondIconText='取消'
              placeholder='请输入姓名'
              inputWidth={UnitConvert.dpi(624)}
              rightSecondCallBack={() => {
                setSearchVisible(false)
              }}
            />
          ) : (
              <DefaultNavigationHeader
                title='我的推荐'
                showLeftIcon
                showRightFirstIcon
                showRightSecondIcon
                rightFirstCallBack={() => {
                  setAuctionTime({
                    ...auctionTime,
                    visible: true
                  })
                }}
                rightSecondCallBack={() => {
                  setSearchVisible(true)
                }}
                leftCallBack={() => {
                  navigation.goBack()
                }}
              />
            )
        }
      </>
    )
  }

  // 展示弹窗
  const showModal = () => {
    return (
      <MyModalSelect
        visible={auctionTime.visible}
        position='top'
        height={Platform.OS === 'android' ? UnitConvert.dpi(390) : UnitConvert.dpi(390) + props.barHeight}
        custormAllView={
          showMyModalView()
        }
      />
    )
  }

  // 展示时间弹窗
  const showMyModalView = () => {
    return (
      <SafeAreaView style={CommonStyle.container}>
        {Platform.OS === 'android' ? null : <View style={{ height: props.barHeight }}></View>}
        {showNav()}
        <CommonTimeSearch
          title='拍卖时间'
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
            setAuctionTime({
              ...auctionTime,
              visible: false
            })
          }}
          okClick={() => {
            setAuctionTime({
              ...auctionTime,
              visible: false
            })
          }}
        />
      </SafeAreaView>
    )
  }

  // 时间
  const showDatePicker = () => {
    if (auctionTime.dateType === 'begin') {
      return (
        <MyDatePicker
          onOk={(v: string) => {
            setAuctionTime({
              ...auctionTime,
              beginDate: v ? moment(v).format('YYYY-MM-DD') : '',
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
    } else {
      return (
        <MyDatePicker
          onOk={(v: string) => {
            setAuctionTime({
              ...auctionTime,
              endDate: v ? moment(v).format('YYYY-MM-DD') : '',
              dateModal: false
            })
          }}
          onCancel={() => {
            setAuctionTime({
              ...auctionTime,
              dateModal: false
            })
          }}
          defaultDate={auctionTime.endDate ? moment(auctionTime.endDate).format('YYYY-MM-DD') :
            moment(new Date()).format('YYYY-MM-DD')}
          maxDate={moment().add(30, 'y').toDate()}
          isOpen={auctionTime.dateModal}
          title="结束时间"
        />
      )
    }
  }

  // 列表
  const showList = () => {
    if (tab.row.val === '客源') {
      if (Array.isArray(custList) && custList.length > 0) {
        return (
          <ScrollView style={CommonStyle.content2}>
            <View style={styles.ass_list}>
              {custList.map((item, index) => (
                <View style={styles.listItem_cust} key={index}>
                  <Text style={styles.listItem_name}>{item.UserName}</Text>
                  <Text style={styles.listItem_text}>{moment(item.ModifyDate).format('YYYY-MM-DD')}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

        )
      } else {
        return (
          <CommonNoData style={CommonStyle.content2} />
        )
      }
    } else {
      if (Array.isArray(houseList) && houseList.length > 0) {
        return (
          <ScrollView style={CommonStyle.content2}>
            <View style={styles.ass_list}>
              {houseList.map((item, index) => (
                <View style={styles.listItem_house} key={index}>
                  <View style={styles.row}>
                    <Text style={styles.listItem_name} numberOfLines={1}>{item.OwnerName}</Text>
                    <Text style={styles.listItem_text} numberOfLines={1}>{moment(item.ModifyDate).format('YYYY-MM-DD')}</Text>
                  </View>
                  <Text style={styles.listItem_text2} numberOfLines={1}>{item.PropertyAddress}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

        )
      } else {
        return (
          <CommonNoData style={CommonStyle.content2} />
        )
      }
    }
  }

  return (
    <SafeAreaView style={CommonStyle.container}>
      {showNav()}
      <MyTab
        current={tab.current}
        cellTextStyle={{
          fontSize: UnitConvert.dpi(32)
        }}
        list={Constant.recommend_tab_arr}
        onChange={(item: tabItemType, index: number) => {
          initData(item.val)
          setTab({
            current: index,
            row: item
          })
        }}
      />
      {showList()}
      {showModal()}
      {showDatePicker()}
    </SafeAreaView>
  );
};

export default connector(MyRecommend);

const styles = StyleSheet.create({
  ass_list: {
    paddingHorizontal: UnitConvert.dpi(30),
    backgroundColor: Constant.defaultBgColor
  },
  listItem_cust: {
    backgroundColor: '#fff',
    height: UnitConvert.dpi(100),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: UnitConvert.dpi(20),
    paddingHorizontal: UnitConvert.dpi(30),
    borderRadius: UnitConvert.dpi(6)
  },
  listItem_house: {
    backgroundColor: '#fff',
    height: UnitConvert.dpi(180),
    marginTop: UnitConvert.dpi(20),
    paddingHorizontal: UnitConvert.dpi(30),
    borderRadius: UnitConvert.dpi(6),
    justifyContent: 'space-evenly'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItem_name: {
    fontSize: UnitConvert.dpi(30),
    color: '#000'
  },
  listItem_text: {
    fontSize: UnitConvert.dpi(26),
    color: '#666'
  },
  listItem_text2: {
    fontSize: UnitConvert.dpi(28),
    color: '#666'
  },
  search_btn: {
    width: UnitConvert.dpi(80),
    height: UnitConvert.dpi(50),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Constant.CommonColor.danger,
    borderRadius: UnitConvert.dpi(4),
    position: 'absolute',
    top: UnitConvert.dpi(8),
    right: UnitConvert.dpi(10)
  },
  search_btn_text: {
    fontSize: UnitConvert.dpi(28),
    color: '#fff'
  }
});
