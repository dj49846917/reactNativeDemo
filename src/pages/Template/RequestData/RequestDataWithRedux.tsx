import React, { useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, Modal } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import { useNavigation } from '@react-navigation/native';
import { UnitConvert } from '@/utils/unitConvert';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';
import MyCard from '@/pages/Account/MyCard';
import MyLoading from '@/components/MyLoading';

function mapStateToProps(state: RootState) {
  console.log('state', state)
  console.log('loading', state.loading.effects['requestData/getList'])
  return {
    list: state.requestData.list,
    loading: state.loading.effects['requestData/getList']
  }
}

const connector = connect(mapStateToProps)

type ModalState = ConnectedProps<typeof connector> // 定义connect的类型

interface RequestDataWithReduxProps extends ModalState {

}

const RequestDataWithRedux = (props: RequestDataWithReduxProps) => {
  const navigation = useNavigation()

  useEffect(() => {
    getInitData()
  }, [])

  // 初始化数据
  const getInitData = () => {
    props.dispatch({
      type: 'requestData/getList',
      payload: {
        name: '张三'
      }
    })
  }

  return (
    <SafeAreaView style={CommonStyle.container}>
      <DefaultNavigationHeader
        title="走redux的请求"
        showLeftIcon
        navigation={navigation}
      />
      <View style={CommonStyle.sizedBox}></View>
      <ScrollView style={CommonStyle.content}>
        {
          props.list.length > 0 ? props.list.map((item: any) => (
            <View style={styles.list} key={item.ID}>
              <Text>{item.Address}</Text>
            </View>
          )) : null
        }
      </ScrollView>
      <MyLoading loading={props.loading} />
    </SafeAreaView>
  );
};

export default connector(RequestDataWithRedux);

const styles = StyleSheet.create({
  list: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(80),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: "#f1f1f1",
    borderBottomWidth: UnitConvert.dpi(2),
    backgroundColor: '#fff'
  },
});
