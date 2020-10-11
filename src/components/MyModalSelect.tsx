import * as React from 'react';
import { Text, View, StyleSheet, Modal, ModalProps, StyleProp, TextStyle } from 'react-native';
import { Picker } from '@react-native-community/picker';
import CommonStyle from '@/utils/constant/Style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UnitConvert } from '@/utils/unitConvert';
import { Constant } from '@/utils/constant/Constant';

// 数据字典每一项
type dicListType = {
  DicCode: number
  DicName: string
  SubTypeCode: number
  BaseTypeCode: number
}

interface Iprops {
  height?: number                             // 模态框的高度
  headerView?: React.ReactNode                // 自定义头部
  custView?: React.ReactNode                  // 自定义主体内容
  headerHeight?: number                       // 头部的高度
  cancelText?: string                         // 头部左侧文字
  okText?: string                             // 头部右侧文字
  title?: string                              // 头部标题
  titleStyle?: StyleProp<TextStyle>           // 标题样式
  cancelStyle?: StyleProp<TextStyle>          // 头部取消按钮样式
  okStyle?: StyleProp<TextStyle>              // 头部确定按钮样式
  onCancel: Function                          // 点击取消按钮回调
  onOk: Function                              // 点击确定按钮回调
  list: Array<dicListType>                    // 数据字典数据源
  defaultValue: string | number | undefined   // 初始值
  // onSelect: Function                          // 选中的回调函数
}

type MyModalSelectProps = Iprops & ModalProps

export interface MyModalSelectState {
  val: undefined | number | string
  index: number | undefined
  item: object
}

const MyModalSelect = (props: MyModalSelectProps) => {
  console.log('2323', props.list, props.defaultValue)
  const [selectItem, setSelectItem] = React.useState<MyModalSelectState>({
    val: props.defaultValue,
    index: undefined,
    item: {}
  })
  return (
    <Modal
      {...props}
      animationType='slide'
      transparent
    >
      <View style={styles.modal}>
        <View style={styles.modal_height}></View>
        <View style={[styles.content, { height: props.height }]}>
          {
            props.headerView ? props.headerView : (
              <View style={[styles.modal_header, { height: props.headerHeight }]}>
                <TouchableOpacity style={styles.modal_header_item} onPress={() => {
                  setSelectItem({
                    val: props.defaultValue,
                    index: undefined,
                    item: {}
                  })
                  props.onCancel()
                }}>
                  <Text style={[styles.modal_header_text, props.cancelStyle]}>{props.cancelText}</Text>
                </TouchableOpacity>
                <View style={styles.modal_header_item2}>
                  <Text style={[styles.modal_header_title, props.titleStyle]}>{props.title}</Text>
                </View>
                <TouchableOpacity style={styles.modal_header_item} onPress={() => props.onOk(selectItem)}>
                  <Text style={[styles.modal_header_text, props.okStyle]}>{props.okText}</Text>
                </TouchableOpacity>
              </View>
            )
          }
          {
            props.custView ? props.custView : (
              <Picker
                selectedValue={selectItem.val}
                style={styles.modal_content}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectItem({
                    val: itemValue,
                    index: itemIndex,
                    item: props.list[itemIndex]
                  })
                }}
              >
                {props.list.map((item, index) => (
                  <Picker.Item key={index} label={item.DicName} value={item.DicCode} />
                ))}
              </Picker>
            )
          }
        </View>
      </View>
    </Modal>
  );
};

MyModalSelect.defaultProps = {
  height: UnitConvert.dpi(500),
  headerHeight: UnitConvert.dpi(80),
  cancelText: '取消',
  okText: '确定',
  title: '实例'
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
  modal_content: {

  }
});
