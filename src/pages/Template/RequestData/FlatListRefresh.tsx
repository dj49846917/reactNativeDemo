import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, FlatList, Alert } from 'react-native';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view';
import CommonStyle from '@/utils/constant/Style';
import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import { useNavigation } from '@react-navigation/native';
import ClientHttp from '@/utils/Request';
import { UnitConvert } from '@/utils/unitConvert';
import MyLoading from '@/components/MyLoading';
interface FlatListRefreshProps { }

const FlatListRefresh = (props: FlatListRefreshProps) => {
  const navigation = useNavigation()
  const [list, setList] = useState<any[]>([])
  const [page, setPage] = useState({
    pageIndex: 0, // 页数
    pageSize: 10,
    refreshState: RefreshState.Idle, // 刷新的状态
  })
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    const params = {
      CollectionCreateUserID: 123
    }
    initData(params, 0)
  }, [])

  const initData = (params:object, index:number) => {
    setLoading(true)
    ClientHttp.Get({
      url: '/RtHouseSource/GetHouseSourceList',
    }).then((res: any) => {
      setLoading(false)
      if (res.code === 200) {
        let state = RefreshState.Idle
        if (res.value.length < 10) {
          state = RefreshState.NoMoreData;
        }
        if(index === 0) {
          setList(res.value)
          setPage({
            ...page,
            pageIndex: index,
            refreshState: state,
          })
        } else {
          setList(list.concat(res.value))
          setPage({
            ...page,
            pageIndex: index,
            refreshState: state,
          })
        }
      }
    }).catch(err => {
      console.log('err', err)
      setLoading(false)
      setPage({
        ...page,
        refreshState: RefreshState.Failure
      })
    })
  }

  return (
    <SafeAreaView style={CommonStyle.container}>
      <DefaultNavigationHeader
        title="上拉加载，下拉刷新"
        showLeftIcon
        navigation={navigation}
      />
      <View style={CommonStyle.sizedBox}></View>
      <RefreshListView
        data={list}
        keyExtractor={(item: any, index: number) => index.toString()}
        onHeaderRefresh={() => {
          setPage({
            ...page,
            refreshState: RefreshState.HeaderRefreshing,
          })
          initData({}, page.pageIndex)
        }}
        onFooterRefresh={() => {
          Alert.alert('222')
          setPage({
            ...page,
            pageIndex: page.pageIndex + 1,
            refreshState: RefreshState.FooterRefreshing,
          })
          initData({}, page.pageIndex)
        }}
        renderItem={({ item }) => (
          <View style={styles.list} key={item.ID}>
            <Text>{item.PropertyAddress}</Text>
          </View>
        )}
      />
      <MyLoading loading={loading} />
    </SafeAreaView>
  );
};

export default FlatListRefresh;

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
