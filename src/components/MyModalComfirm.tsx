import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal, { ModalProps } from 'react-native-modalbox';
import { UnitConvert } from '@/utils/unitConvert';
import { Constant } from '@/utils/constant/Constant';
import CommonStyle from '@/utils/constant/Style';

interface MyModalComfirmProps {
  headerView?: React.ComponentType<any> | React.ReactElement | null,    // 头部自定义布局
  headerHeight?: number,                                                // 头部的高度
  title?: string,                                                       // 标题
  content?: string,                                                     // 内容文字
  footerView?: React.ComponentType<any> | React.ReactElement | null,    // 底部自定义布局
  footerHeight?: number,                                                // 底部高度
  cancelText?: string,                                                  // 底部左侧的按钮文字
  okText?: string,                                                      // 底部右侧的按钮文字
  cancelCallback: Function,                                             // 点击取消按钮的回调  
  okCallback: Function,                                                 // 点击确定按钮的回调 
}

type Iprops = MyModalComfirmProps & ModalProps

const MyModalComfirm = (props: Iprops) => {
  return (
    <Modal
      {...props}
      swipeToClose={false}
    >
      <View style={styles.modal_box}>
        {props.headerView ? props.headerView : (
          <View style={[styles.modal_header, CommonStyle.commonBorder, { height: props.headerHeight }]}>
            <Text style={styles.modal_header_title}>{props.title}</Text>
          </View>
        )}
        <View style={styles.modal_content}>
          <Text style={styles.modal_content_text}>{props.content}</Text>
        </View>
        {props.footerView ? props.footerView : (
          <View style={[styles.modal_footer, { height: props.footerHeight }]}>
            <TouchableOpacity
              onPress={() => {
                props.cancelCallback()
              }}
              style={styles.modal_footer_cancer}
            >
              <Text style={styles.modal_footer_text}>{props.cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.okCallback()
              }}
              style={styles.modal_footer_ok}
            >
              <Text style={styles.modal_footer_text}>{props.okText}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};

MyModalComfirm.defaultProps = {
  style: {
    width: UnitConvert.dpi(580),
    height: UnitConvert.dpi(260),
    borderRadius: UnitConvert.dpi(4)
  },
  headerHeight: UnitConvert.dpi(80),
  title: '标题',
  content: '是否确认删除本条信息？',
  footerHeight: UnitConvert.dpi(80),
  cancelText: '取消',
  okText: '确定',
  cancelCallback: ()=>{},
  okCallback: ()=>{}
}

export default MyModalComfirm;

const styles = StyleSheet.create({
  modal_box: {
    flex: 1
  },
  modal_header: {
    height: UnitConvert.dpi(80),
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal_header_title: {
    fontSize: UnitConvert.dpi(30),
    color: '#000'
  },
  modal_content: {
    flex: 1,
    paddingHorizontal: UnitConvert.dpi(30),
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal_content_text: {
    fontSize: UnitConvert.dpi(28),
    color: '#888'
  },
  modal_footer: {
    height: UnitConvert.dpi(80),
    borderTopColor: '#f1f1f1',
    borderTopWidth: UnitConvert.dpi(2),
    flexDirection: 'row'
  },
  modal_footer_cancer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#f1f1f1',
    borderRightWidth: UnitConvert.dpi(2),
  },
  modal_footer_ok: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal_footer_text: {
    fontSize: UnitConvert.dpi(30),
    color: Constant.CommonColor.primary
  }
});
