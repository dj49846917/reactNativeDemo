import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import MyTab from '@/components/MyTab';
import { Constant } from '@/utils/constant/Constant';
import { UnitConvert } from '@/utils/unitConvert';
import Customer from './Customer';
import House from './House';
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '@/models/index'
import MyModalSelect, { MyModalSelectState } from '@/components/MyModalSelect';
import MyDatePicker from '@/components/MyDatePicker';
import moment from 'moment';
import { dicType } from '@/models/Recommend';
import CommonSelectListItem from '@/components/CommonSelectListItem';
import { getSubTypeList } from '@/utils/utils';

function mapStateToProps(state: RootState) {
  return {
    dicArr: state.recommend.dicArr,
    visible: state.recommend.visible,
    title: state.recommend.title,
    list: state.recommend.list,
    defaultValue: state.recommend.defaultValue,
    selectedKey: state.recommend.key,
    dateVisible: state.recommend.dateVisible,
    ViewingDate: state.recommend.ViewingDate,
    moreCustVisible: state.recommend.moreCustVisible,
    // loading: state.loading.effects['home/asyncAdd']
  }
}

const connector = connect(mapStateToProps)
type ModalState = ConnectedProps<typeof connector> // 定义connect的类型

interface RecommendProps extends ModalState {

}

export type tabItemType = {
  id: string,
  val: string
}

type tabType = {
  current: number,
  row: tabItemType
}

// fields的state类型
export type fieldsType = {
  HouseTypeSelectRow: dicType,
  AreaSelectRow: dicType,
  HuXingTypeSelectRow: dicType,
  needs: string
}

const Recommend = (props: RecommendProps) => {
  // tab切换
  const [tab, setTab] = useState<tabType>({
    current: 0,
    row: Constant.recommend_tab_arr[0]
  })

  // 更多需求的表单数据
  const [fields, setFields] = useState<fieldsType>({
    HouseTypeSelectRow: {},
    AreaSelectRow: {},
    HuXingTypeSelectRow: {},
    needs: ''
  })

  useEffect(() => {
    // 查询数据字典
    props.dispatch({
      type: 'recommend/getSysDic',
      payload: {
        params: [2034, 2013, 2002, 1110, 2004, 1000, 5600]
      }
    })
  }, [])

  // 给更多需求赋值
  const setNeeds = (HouseTypeSelectRow: dicType, AreaSelectRow: dicType, HuXingTypeSelectRow: dicType) => {
    let code = [];
    if (JSON.stringify(HouseTypeSelectRow) !== '{}') {
      code.push(HouseTypeSelectRow.DicName)
    }
    if (JSON.stringify(AreaSelectRow) !== '{}') {
      code.push(AreaSelectRow.DicName)
    }
    if (JSON.stringify(HuXingTypeSelectRow) !== '{}') {
      code.push(HuXingTypeSelectRow.DicName)
    }
    const newCode = code.join(',')
    setFields({
      HouseTypeSelectRow,
      AreaSelectRow,
      HuXingTypeSelectRow,
      needs: newCode
    })
  }

  // 点击取消按钮
  const closeMoreNeeds = () => {
    let newHouseTypeSelectRow = {};
    let newAreaSelectRow = {};
    let HuXingTypeSelectRow = {};
    if (fields.needs) {
      const newNeeds = fields.needs.split(',')
      newNeeds.forEach(item => {
        getSubTypeList(props.dicArr, 2002).forEach(it => {
          if (it.DicName === item) {
            newHouseTypeSelectRow = it
          }
        })
        Constant.recommend_area_arr.forEach(it => {
          if (it.DicName === item) {
            newAreaSelectRow = it
          }
        })
        Constant.houseTypeArr.forEach(it => {
          if (it.DicName === item) {
            HuXingTypeSelectRow = it
          }
        })
      })
    }
    setNeeds(newHouseTypeSelectRow, newAreaSelectRow, HuXingTypeSelectRow)
  }

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
        onChange={(item: tabItemType, index: number) => {
          setTab({
            current: index,
            row: item
          })
        }}
      />
      {/* 主体内容 */}
      {
        tab.row.val === '客源' ? (
          <Customer
            HouseTypeSelectRow={fields.HouseTypeSelectRow}
            AreaSelectRow={fields.AreaSelectRow}
            HuXingTypeSelectRow={fields.HuXingTypeSelectRow}
            needs={fields.needs}
          />
        ) : (
            <House />
          )
      }
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
        onOk={(val: any) => {
          props.dispatch({
            type: 'recommend/setDateFields',
            payload: {
              dateVisible: false,
              ViewingDate: moment(val).format('YYYY-MM-DD')
            }
          })
        }}
        onCancel={() => {
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
      <MyModalSelect
        height={UnitConvert.dpi(900)}
        visible={props.moreCustVisible}
        onOk={() => {
          setNeeds(fields.HouseTypeSelectRow, fields.AreaSelectRow, fields.HuXingTypeSelectRow)
          props.dispatch({
            type: 'recommend/setFields',
            payload: {
              key: 'moreCustVisible',
              val: false
            }
          })
        }}
        onCancel={() => {
          closeMoreNeeds()
          props.dispatch({
            type: 'recommend/setFields',
            payload: {
              key: 'moreCustVisible',
              val: false
            }
          })
        }}
        list={[]}
        title='客户购房需求'
        custView={
          <View style={styles.content}>
            <CommonSelectListItem
              title="产品类型"
              list={getSubTypeList(props.dicArr, 2002)}
              defaultValue={fields.HouseTypeSelectRow}
              callBack={(code: undefined | number, row: dicType) => {
                setFields({
                  ...fields,
                  HouseTypeSelectRow: row
                })
              }}
            />
            <CommonSelectListItem
              title="面积段"
              list={Constant.recommend_area_arr}
              defaultValue={fields.AreaSelectRow}
              callBack={(code: undefined | number, row: dicType) => {
                setFields({
                  ...fields,
                  AreaSelectRow: row
                })
              }}
            />
            <CommonSelectListItem
              title="户型"
              list={Constant.houseTypeArr}
              defaultValue={fields.HuXingTypeSelectRow}
              callBack={(code: undefined | number, row: dicType) => {
                setFields({
                  ...fields,
                  HuXingTypeSelectRow: row
                })
              }}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default connector(Recommend);

const styles = StyleSheet.create({
  content: {
    flex: 1,
  }
});
