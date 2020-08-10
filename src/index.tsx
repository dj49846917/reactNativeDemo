import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Navigator from '@/router/index'
import store from '@/config/dva'
import { RootSiblingParent } from 'react-native-root-siblings';

export default class extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootSiblingParent>
          <Navigator />
        </RootSiblingParent>
      </Provider>
    )
  }
}