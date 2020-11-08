import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import { useNavigation } from '@react-navigation/native';
import ClientHttp from '@/utils/Request';
import { UnitConvert } from '@/utils/unitConvert';

interface RequestDataWithoutReduxProps { }

const RequestDataWithoutRedux = (props: RequestDataWithoutReduxProps) => {
  const navigation = useNavigation()
  const [list, setList] = useState<any[]>([])

  useEffect(() => {
    ClientHttp.Get({
      url: '/RTAuction/BpmsService.GetMyList',
    }).then((res: any) => {
      console.log('res111', res)
      if (res.code === 200) {
        setList(res.value)
      }
    }).catch(err => {
      console.log('err', err)
    })
  }, [])

  return (
    <SafeAreaView style={CommonStyle.container}>
      <DefaultNavigationHeader
        title="不走redux的请求"
        showLeftIcon
        navigation={navigation}
      />
      <View style={CommonStyle.sizedBox}></View>
      <ScrollView style={CommonStyle.content}>
        {
          list.length > 0 ? list.map((item: any) => (
            <View style={styles.list} key={item.ID}>
              <Text>{item.Address}</Text>
            </View>
          )) : null
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default RequestDataWithoutRedux;

const styles = StyleSheet.create({
  list: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(80),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: "#f1f1f1",
    borderBottomWidth: UnitConvert.dpi(2),
    backgroundColor: '#fff'
  }
});
