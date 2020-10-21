import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { RootStackNavigation } from '@/router/index'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '@/models/index'

function mapStateToProps(state: RootState) {
  return {
    num: state.template.num,
    loading: state.loading.effects['template/asyncAdd']
  }
}

const connector = connect(mapStateToProps)

type ModelState = ConnectedProps<typeof connector> // 定义connect的类型

// 去继承ModalState否则在render里取num会报错
interface homeProps extends ModelState {
  navigation: RootStackNavigation
}

class Home extends Component<homeProps> {
  handleAdd = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'home/add',
      payload: {
        num: 1
      }
    })
  }

  handleAsyncAdd = () => {
    const { dispatch, num } = this.props
    dispatch({
      type: 'home/asyncAdd',
      payload: {
        num: 2,
        initNumber: num
      }
    })
  }

  render() {
    return (
      <View>
        <Text> {this.props.num} </Text>
        <Button title='加' onPress={() => this.handleAdd()} />
        <Text>{this.props.loading}</Text>
        <Button title='异步加' onPress={() => this.handleAsyncAdd()} />
        <Text>{this.props.loading ? '加载中...' : ''}</Text>
        <Button title='跳转到详情页面' onPress={() => {
          this.props.navigation.navigate('Detail', { id: '123' })
        }} />
      </View>
    )
  }
}

export default connector(Home)
