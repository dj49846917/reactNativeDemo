import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import Modal from 'react-native-modalbox';
import { UnitConvert } from '@/utils/unitConvert';
import { Constant } from '@/utils/constant/Constant';
import CommonStyle from '@/utils/constant/Style';

interface MyModalTipProps {
  visible: boolean                                                      // 弹窗状态
  height?: number;                                                      // 模态框的高度
  width?: number;                                                       // 模态框的宽度
  headerView?: React.ComponentType<any> | React.ReactElement | null;    // 头部自定义布局
  headerHeight?: string;                                                // 头部的高度
  title?: string;                                                       // 标题
  content?: string;                                                     // 内容文字
  footerView?: React.ComponentType<any> | React.ReactElement | null;    // 底部自定义布局
  footerHeight?: string;                                                // 底部高度
  callback: Function;                                                   // 点击取消按钮的回调
  footerBtnWidth?: number;                                              // 底部按钮的宽度 
  footerBtnBgColor?: string;                                            // 底部按钮的背景颜色
  contentStyle?: StyleProp<ViewStyle>;                                  // 主体内容的布局
}

const MyModalTip = (props: MyModalTipProps) => {
  return (
    <Modal
      {...props}
      style={styles.modal_default}
      isOpen={props.visible}
    >
      <View style={[{ width: props.width, minHeight: props.height }, styles.modal_box]}>
        {props.headerView ? props.headerView : (
          <View style={[styles.modal_header, CommonStyle.commonBorder, { height: props.headerHeight }]}>
            <Text style={styles.modal_header_title}>{props.title}</Text>
          </View>
        )}
        <View style={[styles.modal_content, props.contentStyle]}>
          <Text style={styles.modal_content_text}>{props.content}</Text>
        </View>
        {props.footerView ? props.footerView : (
          <View style={[styles.modal_footer, { height: props.footerHeight }]}>
            <TouchableOpacity
              onPress={() => {
                // this.modal.close()
                props.callback()
              }}
              style={[styles.modal_footer_btn, { width: props.footerBtnWidth, backgroundColor: props.footerBtnBgColor }]}
            >
              <Text style={styles.modal_footer_btn_text}>我知道了</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};

MyModalTip.defaultProps = {
  headerHeight: UnitConvert.dpi(80),
  title: '提示',
  content: '热无热无若翁绕弯儿热无热无若翁绕弯儿热无热无若翁绕弯儿热无热无若翁绕弯儿热无热无若翁绕弯儿',
  footerHeight: UnitConvert.dpi(110),
  callback: () => { },
  footerBtnWidth: UnitConvert.dpi(410),
  footerBtnBgColor: Constant.CommonColor.danger,
  width: UnitConvert.dpi(580),
  height: UnitConvert.dpi(190),
}

export default MyModalTip;

const styles = StyleSheet.create({
  modal_default: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal_box: {
    backgroundColor: '#fff',
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
    paddingHorizontal: UnitConvert.dpi(30),
    paddingVertical: UnitConvert.dpi(40),
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal_content_text: {
    fontSize: UnitConvert.dpi(28),
    color: '#000'
  },
  modal_footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modal_footer_btn: {
    height: UnitConvert.dpi(80),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: UnitConvert.dpi(4)
  },
  modal_footer_btn_text: {
    fontSize: UnitConvert.dpi(32),
    color: '#fff'
  }
});
