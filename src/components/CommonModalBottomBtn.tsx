import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { UnitConvert } from '@/utils/unitConvert';

interface CommonModalBottomBtnProps {
  cancelClick: Function                     // 不限条件按钮回调
  okClick: Function                         // 点击确定按钮回调
  cancelText: string                        // 取消按钮的内容
  okText: string                            // 确定按钮的内容
}

const CommonModalBottomBtn = (props: CommonModalBottomBtnProps) => {
  return (
    <View style={styles.btn}>
      <TouchableOpacity style={styles.btn_cancel} onPress={() => props.cancelClick()}>
        <Text style={styles.btn_text}>{props.cancelText}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn_ok} onPress={() => props.okClick()}>
        <Text style={styles.btn_text}>{props.okText}</Text>
      </TouchableOpacity>
    </View>
  );
};

CommonModalBottomBtn.defaultProps = {
  cancelText: '不限条件',
  okText: '确定'
}

export default CommonModalBottomBtn;

const styles = StyleSheet.create({
  btn: {
    marginLeft: UnitConvert.dpi(26),
    height: UnitConvert.dpi(70),
    flexDirection: 'row',
    marginTop: UnitConvert.dpi(20),
    marginBottom: UnitConvert.dpi(50)
  },
  btn_cancel: {
    width: UnitConvert.dpi(334),
    backgroundColor: '#e1e1e1',
    borderRadius: UnitConvert.dpi(4),
    height: UnitConvert.dpi(70),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: UnitConvert.dpi(20)
  },
  btn_ok: {
    width: UnitConvert.dpi(334),
    backgroundColor: '#c71622',
    borderRadius: UnitConvert.dpi(4),
    height: UnitConvert.dpi(70),
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn_text: {
    fontSize: UnitConvert.dpi(28),
    color: '#FFF'
  }
});
