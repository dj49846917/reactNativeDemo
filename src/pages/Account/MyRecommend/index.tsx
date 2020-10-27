import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Platform } from 'react-native';
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
      <TabPane type={tab.row.val} list={tab.row.val === '客源' ? custList : houseList} />
      {showModal()}
      {showDatePicker()}
    </SafeAreaView>
  );
};

export default connector(MyRecommend);

const styles = StyleSheet.create({
  container: {}
});
