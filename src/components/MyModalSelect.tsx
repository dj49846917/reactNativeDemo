import * as React from 'react';
import { Text, View, StyleSheet, StyleProp, TextStyle, Platform } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UnitConvert } from '@/utils/unitConvert';
import { Constant } from '@/utils/constant/Constant';
import { dicType } from '@/models/Recommend';
import Modal, { ModalProps } from 'react-native-modalbox';
import Pickers from 'react-native-picker';
import { filterDicName } from '@/utils/utils';

interface Iprops {
  visible: boolean                            // 打开弹窗
  custormAllView?: React.ReactNode            // 自定义所有的视图
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
  list: dicType[]                             // 数据字典数据源
  defaultValue?: string | number | undefined  // 初始值
  position: string                            // 弹窗内容的位置(top, center, bottom)
}

type MyModalSelectProps = Iprops & ModalProps

export interface MyModalSelectState {
  val: undefined | number | string
  index: number | undefined
  item: object
}

const MyModalSelect = (props: MyModalSelectProps) => {
  const [selectItem, setSelectItem] = React.useState<MyModalSelectState>({
    val: props.defaultValue,
    index: undefined,
    item: {}
  })

  React.useEffect(() => {
    if (props.list.length > 0) {
      let codeArr = []
      let nameArr: (string | undefined)[] = []
      props.list.forEach((item, index) => {
        codeArr.push(item.DicCode)
        nameArr.push(item.DicName)
      })
      console.log('props.list', props.list, nameArr)
      Pickers.init({
        pickerConfirmBtnText: props.okText,
        pickerCancelBtnText: props.cancelText,
        pickerConfirmBtnColor: [199, 22, 34, 1],
        pickerCancelBtnColor: [199, 22, 34, 1],
        pickerToolBarBg: [247, 247, 247, 1],
        pickerBg: [255, 255, 255, 1],
        pickerTitleText: props.title,
        pickerData: nameArr,
        selectedValue: [filterDicName(
          props.list,
          // @ts-ignore 
          selectItem.val)],
        onPickerConfirm: data => {
          // @ts-ignore
          let obj: MyModalSelectState = {}
          props.list.forEach((item, index) => {
            if (item.DicName === data[0]) {
              obj.val = item.DicCode
              obj.index = index
              obj.item = item
              setSelectItem({
                val: item.DicCode,
                index: index + 1,
                item,
              })
            }
          })
          Pickers.hide()
          props.onOk(obj)
        },
        onPickerCancel: data => {
          setSelectItem({
            val: props.defaultValue,
            index: undefined,
            item: {}
          })
          Pickers.hide()
          props.onCancel()
        },
        onPickerSelect: data => { }
      });
      if (Platform.OS === 'android') {
        if (props.visible) {
          Pickers.show()
        }
      }
    }
  }, [props.list, props.visible])

  React.useEffect(() => {
    if (props.list.length > 0) {
      if (props.defaultValue) {
        props.list.forEach((item, index) => {
          if (item.DicCode === props.defaultValue) {
            setSelectItem({
              val: props.defaultValue,
              index,
              item: props.list[index]
            })
          }
        })
      } else {
        setSelectItem({
          val: props.list[0].DicCode,
          index: 0,
          item: props.list[0]
        })
      }
    }
  }, [props.list])

  return (
    <Modal
      {...props}
      isDisabled={false}
      swipeToClose={false}
      backButtonClose={false}
      backdropPressToClose={false}
      style={{ height: props.height }}
      isOpen={props.visible}
    // coverScreen
    >
      {Platform.OS === 'android' ? null : (
        <View style={styles.modal}>
          <View style={[styles.content, { height: props.height }]}>
            {props.custormAllView ? props.custormAllView : (
              <View>
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
                      <TouchableOpacity
                        style={styles.modal_header_item}
                        onPress={() => {
                          props.onOk(selectItem)
                        }}
                      >
                        <Text style={[styles.modal_header_text, props.okStyle]}>{props.okText}</Text>
                      </TouchableOpacity>
                    </View>
                  )
                }
                {
                  props.custView ? props.custView : (
                    Platform.OS === 'ios' ? <Picker
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
                        <Picker.Item key={index} label={item.DicName} value={String(item.DicCode)} />
                      ))}
                    </Picker> : null
                  )
                }
              </View>
            )}
          </View>
        </View>
      )}
    </Modal>
  );
};

MyModalSelect.defaultProps = {
  height: Platform.OS === 'android' ? UnitConvert.dpi(0) : UnitConvert.dpi(500),
  headerHeight: UnitConvert.dpi(80),
  cancelText: '取消',
  okText: '确定',
  title: '实例',
  defaultValue: '',
  list: [],
  onCancel: () => { },
  onOk: () => { },
  position: 'bottom'
}

export default MyModalSelect;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  content: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(300),
    // backgroundColor: '#fff',
    // opacity: 1
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
