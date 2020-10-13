import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import MyTab, { listType } from '@/components/MyTab';
import { Constant } from '@/utils/constant/Constant';
import { UnitConvert } from '@/utils/unitConvert';
import Customer from './Customer';
import House from './House';
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '@/models/index'
import MyModalSelect, { MyModalSelectState } from '@/components/MyModalSelect';
import { RecommendDicArr } from '@/assets/data/Recommend';
import MyDatePicker from '@/components/MyDatePicker';
import moment from 'moment';

function mapStateToProps(state: RootState) {
  console.log('state.recommend.key', state.recommend.key)
  return {
    visible: state.recommend.visible,
    title: state.recommend.title,
    list: state.recommend.list,
    defaultValue: state.recommend.defaultValue,
    selectedKey: state.recommend.key,
    dateVisible: state.recommend.dateVisible,
    ViewingDate: state.recommend.ViewingDate
    // num: state.home.num,
    // loading: state.loading.effects['home/asyncAdd']
  }
}

const connector = connect(mapStateToProps)
type ModalState = ConnectedProps<typeof connector> // 定义connect的类型

interface RecommendProps extends ModalState {

}



const Recommend = (props: RecommendProps) => {
  const [dicArr, setDicArr] = useState<any>([])
  useEffect(() => {
    const result = RecommendDicArr
    setDicArr(result)
  })

  const [tab, setTab] = useState({
    current: 0,
    row: Constant.recommend_tab_arr[0]
  })
  
  return (
    <SafeAreaView style={CommonStyle.container}>
      {/* 导航栏 */}
      <DefaultNavigationHeader
        title='推荐'
      />
      {/* 选项卡 */}
      <MyTab
        current={tab.current}
        cellTextStyle={{
          fontSize: UnitConvert.dpi(32)
        }}
        list={Constant.recommend_tab_arr}
        onChange={(item: listType, index: number) => {
          setTab({
            current: index,
            row: item
          })
        }}
      />
      {/* 主体内容 */}
      {tab.row.val === '客源' ? <Customer dicArr={dicArr} /> : <House />}
      <MyModalSelect
        onCancel={() => {
          props.dispatch({
            type: 'recommend/closeModal',
            payload: {
              val: false
            }
          })
        }}
        onOk={(selectInfo: MyModalSelectState) => {
          console.log('selectInfo.val', selectInfo.val)
          props.dispatch({
            type: 'recommend/closeModal',
            payload: {
              val: false
            }
          })
          props.dispatch({
            type: 'recommend/setSelectFields',
            payload: {
              key: props.selectedKey,
              val: selectInfo.val,
            }
          })
        }}
        visible={props.visible}
        title={props.title}
        list={props.list}
        defaultValue={props.defaultValue}
      />
      <MyDatePicker 
        onOk={(val: any)=>{
          props.dispatch({
            type: 'recommend/setDateFields',
            payload: {
              dateVisible: false,
              ViewingDate: moment(val).format('YYYY-MM-DD')
            }
          })
        }}
        onCancel={()=>{
          props.dispatch({
            type: 'recommend/setFields',
            payload: {
              key: 'dateVisible',
              val: false
            }
          })
        }}
        title='看房日期'
        visible={props.dateVisible}
        defaultDate={props.ViewingDate}
      />
    </SafeAreaView>
  );
};

export default connector(Recommend);

const styles = StyleSheet.create({
});
