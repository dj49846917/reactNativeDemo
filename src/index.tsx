import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Navigator from '@/router/index'
import store from '@/config/dva'

export default class extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    )
  }
}