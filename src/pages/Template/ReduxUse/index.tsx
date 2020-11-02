import React, { useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import { useNavigation } from '@react-navigation/native';
import CommonSecondHouseList from '@/components/CommonSecondHoseList';
import { ConnectedProps, connect } from 'react-redux';
import { RootState } from '@/models/index';

const SecondHouseDic = [{
  "DicCode": 1000001,
  "DicName": "是",
  "SubTypeCode": 1000,
  "BaseTypeCode": 10
}, {
  "DicCode": 1000002,
  "DicName": "否",
  "SubTypeCode": 1000,
  "BaseTypeCode": 10
}, {
  "DicCode": 1110001,
  "DicName": "江北区",
  "SubTypeCode": 1110,
  "BaseTypeCode": 11
}, {
  "DicCode": 1110002,
  "DicName": "渝北区",
  "SubTypeCode": 1110,
  "BaseTypeCode": 11
}, {
  "DicCode": 1110003,
  "DicName": "渝中区",
  "SubTypeCode": 1110,
  "BaseTypeCode": 11
}, {
  "DicCode": 1110004,
  "DicName": "北碚区",
  "SubTypeCode": 1110,
  "BaseTypeCode": 11
}, {
  "DicCode": 1110005,
  "DicName": "九龙坡区",
  "SubTypeCode": 1110,
  "BaseTypeCode": 11
}, {
  "DicCode": 1110006,
  "DicName": "沙坪坝区",
  "SubTypeCode": 1110,
  "BaseTypeCode": 11
}, {
  "DicCode": 1110007,
  "DicName": "大渡口区",
  "SubTypeCode": 1110,
  "BaseTypeCode": 11
}, {
  "DicCode": 1110008,
  "DicName": "南岸区",
  "SubTypeCode": 1110,
  "BaseTypeCode": 11
}, {
  "DicCode": 1110009,
  "DicName": "巴南区",
  "SubTypeCode": 1110,
  "BaseTypeCode": 11
}, {
  "DicCode": 1110010,
  "DicName": "永川区",
  "SubTypeCode": 1110,
  "BaseTypeCode": 11
}, {
  "DicCode": 1110011,
  "DicName": "两江新区",
  "SubTypeCode": 1110,
  "BaseTypeCode": 11
}, {
  "DicCode": 1110012,
  "DicName": "璧山区",
  "SubTypeCode": 1110,
  "BaseTypeCode": 11
}, {
  "DicCode": 1110013,
  "DicName": "涪陵区",
  "SubTypeCode": 1110,
  "BaseTypeCode": 11
}, {
  "DicCode": 1110014,
  "DicName": "綦江区",
  "SubTypeCode": 1110,
  "BaseTypeCode": 11
}, {
  "DicCode": 1110015,
  "DicName": "江津区",
  "SubTypeCode": 1110,
  "BaseTypeCode": 11
}, {
  "DicCode": 1110016,
  "DicName": "合川区",
  "SubTypeCode": 1110,
  "BaseTypeCode": 11
}, {
  "DicCode": 1110017,
  "DicName": "大足区",
  "SubTypeCode": 1110,
  "BaseTypeCode": 11
}, {
  "DicCode": 1110018,
  "DicName": "长寿区",
  "SubTypeCode": 1110,
  "BaseTypeCode": 11
}, {
  "DicCode": 1110019,
  "DicName": "铜梁区",
  "SubTypeCode": 1110,
  "BaseTypeCode": 11
}, {
  "DicCode": 1110020,
  "DicName": "南川区",
  "SubTypeCode": 1110,
  "BaseTypeCode": 11
}, {
  "DicCode": 1110021,
  "DicName": "万盛区",
  "SubTypeCode": 1110,
  "BaseTypeCode": 11
}, {
  "DicCode": 1110022,
  "DicName": "北部新区",
  "SubTypeCode": 1110,
  "BaseTypeCode": 11
}, {
  "DicCode": 2003001,
  "DicName": "住宅",
  "SubTypeCode": 2003,
  "BaseTypeCode": 20
}, {
  "DicCode": 2003002,
  "DicName": "商住",
  "SubTypeCode": 2003,
  "BaseTypeCode": 20
}, {
  "DicCode": 2003003,
  "DicName": "商铺",
  "SubTypeCode": 2003,
  "BaseTypeCode": 20
}, {
  "DicCode": 2003004,
  "DicName": "写字楼",
  "SubTypeCode": 2003,
  "BaseTypeCode": 20
}, {
  "DicCode": 2003005,
  "DicName": "车库",
  "SubTypeCode": 2003,
  "BaseTypeCode": 20
}, {
  "DicCode": 2003006,
  "DicName": "厂房",
  "SubTypeCode": 2003,
  "BaseTypeCode": 20
}, {
  "DicCode": 2003007,
  "DicName": "其他",
  "SubTypeCode": 2003,
  "BaseTypeCode": 20
}, {
  "DicCode": 2004001,
  "DicName": "清水",
  "SubTypeCode": 2004,
  "BaseTypeCode": 20
}, {
  "DicCode": 2004002,
  "DicName": "简装",
  "SubTypeCode": 2004,
  "BaseTypeCode": 20
}, {
  "DicCode": 2004003,
  "DicName": "中装",
  "SubTypeCode": 2004,
  "BaseTypeCode": 20
}, {
  "DicCode": 2004004,
  "DicName": "精装",
  "SubTypeCode": 2004,
  "BaseTypeCode": 20
}, {
  "DicCode": 2004005,
  "DicName": "豪装",
  "SubTypeCode": 2004,
  "BaseTypeCode": 20
}, {
  "DicCode": 2032001,
  "DicName": "低层",
  "SubTypeCode": 2032,
  "BaseTypeCode": 20
}, {
  "DicCode": 2032002,
  "DicName": "中层",
  "SubTypeCode": 2032,
  "BaseTypeCode": 20
}, {
  "DicCode": 2032003,
  "DicName": "高层",
  "SubTypeCode": 2032,
  "BaseTypeCode": 20
}, {
  "DicCode": 2033001,
  "DicName": "东",
  "SubTypeCode": 2033,
  "BaseTypeCode": 20
}, {
  "DicCode": 2033002,
  "DicName": "南",
  "SubTypeCode": 2033,
  "BaseTypeCode": 20
}, {
  "DicCode": 2033003,
  "DicName": "西",
  "SubTypeCode": 2033,
  "BaseTypeCode": 20
}, {
  "DicCode": 2033004,
  "DicName": "北",
  "SubTypeCode": 2033,
  "BaseTypeCode": 20
}, {
  "DicCode": 2033005,
  "DicName": "东南",
  "SubTypeCode": 2033,
  "BaseTypeCode": 20
}, {
  "DicCode": 2033006,
  "DicName": "西南",
  "SubTypeCode": 2033,
  "BaseTypeCode": 20
}, {
  "DicCode": 2033007,
  "DicName": "东北",
  "SubTypeCode": 2033,
  "BaseTypeCode": 20
}, {
  "DicCode": 2033008,
  "DicName": "西北",
  "SubTypeCode": 2033,
  "BaseTypeCode": 20
}, {
  "DicCode": 4700001,
  "DicName": "未开始",
  "SubTypeCode": 4700,
  "BaseTypeCode": 47
}, {
  "DicCode": 4700002,
  "DicName": "进行中",
  "SubTypeCode": 4700,
  "BaseTypeCode": 47
}, {
  "DicCode": 4700003,
  "DicName": "已拍卖",
  "SubTypeCode": 4700,
  "BaseTypeCode": 47
}, {
  "DicCode": 4700004,
  "DicName": "已停拍",
  "SubTypeCode": 4700,
  "BaseTypeCode": 47
}, {
  "DicCode": 4700005,
  "DicName": "已流拍",
  "SubTypeCode": 4700,
  "BaseTypeCode": 47
}]

function mapStateToProps(state: RootState) {
  return {
    list: state.reduxUse.list
  }
}

const connector = connect(mapStateToProps)

type ModalState = ConnectedProps<typeof connector> // 定义connect的类型

interface ReduxUseProps extends ModalState {
  
}

const ReduxUse = (props: ReduxUseProps) => {

  useEffect(()=>{
    props.dispatch({
      type: 'reduxUse/getList',
      payload: {
        id: '123'
      }
    })
  }, [])

  const navigation = useNavigation()
  return (
    <SafeAreaView style={CommonStyle.container}>
      <DefaultNavigationHeader
        title='redux的使用'
        showLeftIcon
        navigation={navigation}
      />
      <ScrollView style={styles.container}>
        <CommonSecondHouseList list={props.list} comDic={SecondHouseDic} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default connector(ReduxUse);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
