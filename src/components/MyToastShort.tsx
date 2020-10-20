import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Toast, { ToastOptions } from 'react-native-root-toast';

interface MyToastShortProps extends ToastOptions {
  content: string
}

const MyToastShort = (props: MyToastShortProps) => {
  let toast = Toast.show(props.content, {
    ...props,
    duration: Toast.durations.LONG,
    position: Toast.positions.CENTER,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    onShow: () => {
      // calls on toast\`s appear animation start
    },
    onShown: () => {
      // calls on toast\`s appear animation end.
    },
    onHide: () => {
      // calls on toast\`s hide animation start.
    },
    onHidden: () => {
      // calls on toast\`s hide animation end.
    }
  });
  setTimeout(function () {
    Toast.hide(toast);
  }, 500);
};

export default MyToastShort;

const styles = StyleSheet.create({
  container: {}
});
