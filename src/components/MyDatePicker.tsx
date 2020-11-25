import * as React from 'react';
import { Text, View, StyleSheet, StyleProp, TextStyle } from 'react-native';
import DatePicker from 'rmc-date-picker'
import lang from 'rmc-date-picker/lib/locale/zh_CN'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UnitConvert } from '@/utils/unitConvert';
import { Constant } from '@/utils/constant/Constant';
import moment from 'moment';
import Modal, { ModalProps } from 'react-native-modalbox';

interface Iprops {
  defaultDate: any                            // 初始值
  modeType: string                            // 模式: 'date', 'time', 'datetime', 'year', 'month'
  maxDate: Date                               // 最大值
  minDate: Date                               // 最小值
  height?: number                             // 模态框的高度
  headerView?: React.ReactNode                // 自定义头部
  headerHeight?: number                       // 头部的高度
  cancelText?: string                         // 头部左侧文字
  okText?: string                             // 头部右侧文字
  titleStyle?: StyleProp<TextStyle>           // 标题样式
  cancelStyle?: StyleProp<TextStyle>          // 头部取消按钮样式
  okStyle?: StyleProp<TextStyle>              // 头部确定按钮样式
  onCancel: Function                          // 点击取消按钮回调
  title?: string                              // 头部标题
  onOk: Function                              // 点击确定按钮回调
}

type MyDatePickerProps = Iprops & ModalProps

const MyDatePicker = (props: MyDatePickerProps) => {
  const [val, setVal] = React.useState(new Date())

  let d = moment(props.defaultDate ? props.defaultDate : new Date(), 'YYYY-MM-DD');
  return (
    <Modal
      {...props}
      isDisabled={false}
      swipeToClose={false}
      backButtonClose={false}
      backdropPressToClose={false}
      style={{height: props.height}}
    >
      <View style={styles.modal}>
        {/* <View style={styles.modal_height}></View> */}
        <View style={[styles.content, { height: props.height }]}>
          {
            props.headerView ? props.headerView : (
              <View style={[styles.modal_header, { height: props.headerHeight }]}>
                <TouchableOpacity style={styles.modal_header_item} onPress={() => {
                  setVal(props.defaultDate)
                  props.onCancel()
                }}>
                  <Text style={[styles.modal_header_text, props.cancelStyle]}>{props.cancelText}</Text>
                </TouchableOpacity>
                <View style={styles.modal_header_item2}>
                  <Text style={[styles.modal_header_title, props.titleStyle]}>{props.title}</Text>
                </View>
                <TouchableOpacity
                  style={styles.modal_header_item}
                  onPress={() => {
                    props.onOk(val)
                  }}
                >
                  <Text style={[styles.modal_header_text, props.okStyle]}>{props.okText}</Text>
                </TouchableOpacity>
              </View>
            )
          }
          <DatePicker
            defaultDate={d.toDate()}
            locale={lang}
            mode={props.modeType}
            maxDate={props.maxDate}
            minDate={props.minDate}
            onDateChange={(v) => {
              console.log('v', v)
              setVal(v)
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

MyDatePicker.defaultProps = {
  defaultDate: new Date(),
  height: UnitConvert.dpi(500),
  headerHeight: UnitConvert.dpi(80),
  cancelText: '取消',
  okText: '确定',
  title: '实例',
  modeType: 'date',
  maxDate: moment().add(30, 'y').toDate(),
  minDate: moment([1980, 1, 1, 1, 1, 1]).toDate(),
  position: 'bottom'
}

export default MyDatePicker;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  content: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(300),
  },
  modal_header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: UnitConvert.w,
    backgroundColor: '#f7f7f7'
  },
  modal_header_item: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: UnitConvert.dpi(30)
  },
  modal_header_item2: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal_header_text: {
    fontSize: UnitConvert.dpi(28),
    color: Constant.CommonColor.danger
  },
  modal_header_title: {
    fontSize: UnitConvert.dpi(30),
    color: '#000'
  },
});
