import * as React from 'react';
import { Text, View, StyleSheet, Modal, ActivityIndicator } from 'react-native';

interface MyLoadingProps {
  loading: boolean,
}

const MyLoading = (props: MyLoadingProps) => {
  return (
    <Modal
      visible={props.loading}
      transparent
    >
      <View style={styles.loadingbox}></View>
      <View style={styles.loadingContentBox}>
        <ActivityIndicator color="#409eff" size="large" />
        <Text style={{ color: '#409eff' }}>加载中...</Text>
      </View>
    </Modal>
  );
};

MyLoading.defaultProps = {

}

export default MyLoading;

const styles = StyleSheet.create({
  loadingbox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    opacity: 0.7
  },
  loadingContentBox: {
    flex: 1,
    position: 'absolute',
    left: '40%',
    top: '40%'
  }
});
