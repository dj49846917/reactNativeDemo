import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, FlatList, Alert } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import { useNavigation } from '@react-navigation/native';
import ClientHttp from '@/utils/Request';
import { UnitConvert } from '@/utils/unitConvert';
import MyLoading from '@/components/MyLoading';
interface FlatListRefreshProps { }

type IPageState = {
  pageIndex: number,
  pageSize: number,
  loadMore: boolean,
  hasMore: boolean
}

const FlatListRefresh = (props: FlatListRefreshProps) => {
  const navigation = useNavigation()
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState<IPageState>({
    pageIndex: 0,
    pageSize: 10,
    loadMore: false,          // 加载更多
    hasMore: true,            // 是否数据已经全部加载完
  })
  const [ refresh, setRefresh ] = useState(false)

  useEffect(() => {
    const params: IPageState = {
      ...page,
      pageIndex: 0,
      pageSize: 10,
      loadMore: true
    }
    initData(params, 0)
  }, [])

  const initData = (params: IPageState, index: number) => {
    setLoading(true)
    ClientHttp.Get({
      url: '/RtHouseSource/GetHouseSourceList',
    }).then((res: any) => {
      setLoading(false)
      setRefresh(false)
      if (res.value.length < 10) {
        setPage({
          ...page,
          pageIndex: index,
          hasMore: false,
          loadMore: false
        })
      } else {
        setPage({
          ...page,
          pageIndex: index,
          hasMore: true,
          loadMore: true
        })
      }
      if (params.loadMore) {
        const newList = list.concat(res.value)
        setList(newList)
      } else {
        setList(res.value)
      }
    }).catch(err => {
      console.log('err', err)
      setLoading(false)
    })
  }

  // 下拉刷新
  const HandleRefresh = () => {
    // 修改刷新状态为true
    setRefresh(true)
    const params = {
      ...page,
      pageIndex: page.pageIndex + 1,
      pageSize: 10,
      loadMore: true
    }
    initData(params, 0)
  }

  // 加载更多
  const onEndReached = () => {
    if (loading || !page.hasMore) {
      return
    }
    const params = {
      ...page,
      pageIndex: page.pageIndex + 1,
      pageSize: 10,
      loadMore: true
    }
    initData(params, 0)
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.list} key={item.ID}>
        <Text>{item.PropertyAddress}</Text>
      </View>
    )
  }

  // 设置key
  const keyExtractor = (item: { ID: any; }) => {
    return String(item.ID)
  }

  // 底部组件
  const footerComponent = () => {
    if (loading && page.hasMore && list.length > 0) {
      return (
        <View>
          <Text>正在加载中...</Text>
        </View>
      )
    }
    if (!page.hasMore) {
      return (
        <View>
          <Text>我是有底线的...</Text>
        </View>
      )
    }
  }

  // 空数据
  const emptyComponent = () => {
    if(loading) {
      return
    }
    return (
      <View>
        <Text>暂无数据</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={CommonStyle.container}>
      <DefaultNavigationHeader
        title="上拉加载，下拉刷新"
        showLeftIcon
        navigation={navigation}
      />
      <View style={CommonStyle.sizedBox}></View>
      <View style={CommonStyle.content}>
        <FlatList
          data={list}
          ListEmptyComponent={emptyComponent()}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={onEndReached}
          onEndReachedThreshold={0}
          ListFooterComponent={footerComponent()}
          onRefresh={HandleRefresh}
          refreshing={refresh}
        />
      </View>
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
