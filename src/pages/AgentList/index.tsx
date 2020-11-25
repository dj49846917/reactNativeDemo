import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Platform, ScrollView } from 'react-native';
import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import { ENV_ICON } from '@/assets/styles/picUrl';
import { RootStackNavigation } from '@/router/index';
import CommonStyle from '@/utils/constant/Style';
import TabPane from './TabPane';
import { AgentListData, AgentListDic } from '@/assets/data/AgentList';
import { IState } from '../AssetAuction';
import CommonArea from '@/components/CommonArea';
import CommonModalBottomBtn from '@/components/CommonModalBottomBtn';
import { dicType } from '@/models/Recommend';
import { getSubTypeList } from '@/utils/utils';
import Modal from 'react-native-modalbox';
import { UnitConvert } from '@/utils/unitConvert';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';
import { Constant } from '@/utils/constant/Constant';
import CommonNoData from '@/components/CommonNoData';

function mapStateToProps(state: RootState) {
  return {
    barHeight: state.home.barHeight
  }
}

const connector = connect(mapStateToProps)

type ModalState = ConnectedProps<typeof connector> // 定义connect的类型

interface AgentListProps extends ModalState {
  navigation: RootStackNavigation
}

const AgentList = (props: AgentListProps) => {
  // 搜索框的字段
  const [UserName, setUserName] = React.useState('')
  const [list, setList] = React.useState<any[]>([])
  // 页面要用到的字段
  const [fields, setFields] = React.useState<IState>({
    dicArr: [],                     // 数据字典
    areaSelectedItem: {},           // 选中的区域对象
    Location: undefined,            // 选中的区域
    visible: false,                 // 弹窗的状态             
  })

  React.useEffect(() => {
    const data = AgentListData
    setList(data)
    const dicCodeArr = [1110]
    let arr: dicType[] = []
    AgentListDic.forEach(item => {
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

  // 展示导航栏
  const showNav = () => {
    return (
      <DefaultNavigationHeader
        showLeftIcon
        showRightFirstIcon
        showRightSecondIcon
        rightFirstIconSource={ENV_ICON.icon_top_screen}
        rightSecondIconSource={ENV_ICON.icon_top_msg}
        mode='input'
        defaultValue={UserName}
        placeholder='请输入置业经理姓名'
        navigation={props.navigation}
        getSearchData={(v: string) => {
          setUserName(v)
        }}
        rightFirstCallBack={() => {
          setFields({
            ...fields,
            visible: !fields.visible
          })
        }}
      />
    )
  }

  const showModal = () => {
    return (
      <Modal
        isDisabled={false}
        swipeToClose={false}
        backButtonClose={false}
        backdropPressToClose={false}
        isOpen={fields.visible}
        style={{ height: UnitConvert.dpi(830) + props.barHeight }}
        position='top'
      // style={{ height: props.height }}
      >
        <View style={CommonStyle.container}>
          {Platform.OS === 'android' ? null : <View style={{ height: props.barHeight }}></View>}
          {showNav()}
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
            cancelText='重置'
            cancelClick={() => {
              setFields({
                ...fields,
                areaSelectedItem: {},
                visible: false
              })
            }}
            okClick={() => {
              if (JSON.stringify(fields.areaSelectedItem) === '{}') {
                setFields({
                  ...fields,
                  Location: undefined,
                  visible: false
                })
              } else {
                setFields({
                  ...fields,
                  Location: fields.areaSelectedItem.DicCode,
                  visible: false
                })
              }
            }}
          />
        </View>
      </Modal>
    )
  }

  return (
    <SafeAreaView style={CommonStyle.container}>
      {/* 顶部搜索 */}
      {showNav()}
      <View style={CommonStyle.sizedBox}></View>
      {
        list.length > 0 ? (
          <ScrollView style={CommonStyle.content2}>
            <TabPane list={list} />
          </ScrollView>
        ) : (
          <CommonNoData style={CommonStyle.content2} />
        )
      }

      {showModal()}
    </SafeAreaView>
  );
};

export default connector(AgentList);

const styles = StyleSheet.create({

});
