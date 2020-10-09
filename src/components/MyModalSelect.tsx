import * as React from 'react';
import { Text, View, StyleSheet, Modal, ModalProps } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UnitConvert } from '@/utils/unitConvert';

interface Iprops {
  callBack: Function      // 点击按钮回调
  height: number          // 模态框的高度
}

type MyModalSelectProps = Iprops & ModalProps

const MyModalSelect = (props: MyModalSelectProps) => {
  return (
    <Modal
      {...props}
      animationType='slide'
      transparent
    >
      <View style={styles.modal}>
        <View style={styles.modal_height}></View>
        <View style={[styles.content, { height: props.height }]}>
          <View style={styles.model_header}></View>
        </View>
      </View>
    </Modal>
  );
};

MyModalSelect.defaultProps = {
  height: UnitConvert.dpi(500)
}

export default MyModalSelect;

const styles = StyleSheet.create({
  modal: {
    flex: 1
  },
  modal_height: {
    flex: 1,
    backgroundColor: '#000',
    opacity: 0.6,
  },
  content: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(300),
    backgroundColor: '#fff',
    opacity: 1
  }
});
