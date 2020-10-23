import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import CommonStyle from '@/utils/constant/Style';
import { useNavigation } from '@react-navigation/native';
import { ENV_IMAGE } from '@/assets/styles/picUrl';
import { UnitConvert } from '@/utils/unitConvert';
import MyTextInput from '@/components/MyTextInput';
import { validFieldsDefault, validFieldsPosiveNumber, findDicName, getSubTypeList } from '@/utils/utils';
import MyDropdownList from '@/components/MyDropdownList';
import { dicType } from '@/models/Recommend';
import MyModalSelect, { MyModalSelectState } from '@/components/MyModalSelect';
import { AssetmentDic } from '@/assets/data/Assetment';
import MyErrorNotice from '@/components/MyErrorNotice';

interface AssetmentProps { }

type IState = {
  LivingAreasName: string
  FloorAreaSize: string
  Address: string
  SourceByOwner: number | undefined | string
  RegionDistrict: number | undefined | string
  dicArr: dicType[]
  visible: boolean
  title: string
  list: dicType[]
  defaultValue: string | number | undefined
  key: string
}

const Assetment = (props: AssetmentProps) => {
  const navigation = useNavigation()
  const [fields, setFields] = React.useState<IState>({
    LivingAreasName: '',                    // 小区名称
    FloorAreaSize: '',                      // 房屋面积
    Address: '',                            // 房屋坐落
    SourceByOwner: undefined,               // 房屋类型
    RegionDistrict: undefined,              // 房屋区域
    dicArr: [],                             // 数据字典
    visible: false,                         // 弹窗状态
    title: '',                              // 标题
    list: [],                               // 选中的字典数据
    defaultValue: undefined,                // 初始值
    key: '',                                // 字段名
  })

  React.useEffect(() => {
    const res = AssetmentDic
    const dicCodeArr = [1110, 1310]
    let arr: dicType[] = []
    res.forEach(item => {
      dicCodeArr.forEach((it: number) => {
        if (item.SubTypeCode === it) {
          arr.push(item)
        }
      })
    })
    setFields({
      ...fields,
      dicArr: arr
    })
  }, [])

  // 点击按钮
  const handleClickThrottle = () => {
    const e = validFieldsDefault(fields.RegionDistrict, '请选择房屋区域!')
    const d = validFieldsDefault(fields.SourceByOwner, '请选择房屋类型!')
    const c = validFieldsDefault(fields.Address, '房屋坐落不能为空, 无法评估哦！')
    const b = validFieldsPosiveNumber(fields.FloorAreaSize, true, '请输入正确的建筑面积', '建筑面积不能为空, 无法评估哦！')
    const a = validFieldsDefault(fields.LivingAreasName, '小区名称不能为空, 无法评估哦！')
    if (Number(fields.FloorAreaSize) > 500) {
      MyErrorNotice({content: "亲，建筑面积太大了!"});
      return
    }
    if (a && b && c && d && e) {
      const content = {
        LivingAreasName: fields.LivingAreasName || null,
        FloorAreaSize: fields.FloorAreaSize || null,
        Address: fields.Address || null,
        AssetType: fields.SourceByOwner || null,
        RegionDistrict: fields.RegionDistrict || null,
      }
      const params = {
        data: JSON.stringify(content),
        lstJsonAttachment: ''
      }
      console.log('params', params)
    }
  }

  // 表单内容
  const showForm = () => {
    return (
      <ScrollView style={{ flex: 1 }}>
        <KeyboardAvoidingView style={CommonStyle.content} behavior='padding' keyboardVerticalOffset={200}>
          <MyTextInput
            flelds='小区名称'
            placeholder='请输入小区名称'
            defaultValue={fields.LivingAreasName}
            lableStyle={{
              paddingLeft: UnitConvert.dpi(30)
            }}
            onBlur={() => { validFieldsDefault(fields.LivingAreasName, '小区名称不能为空, 无法评估哦！') }}
            getFieldsValue={(code: string) => {
              setFields({
                ...fields,
                LivingAreasName: code
              })
            }}
          />
          <MyTextInput
            flelds='建筑面积(㎡)'
            placeholder='请输入房屋面积'
            defaultValue={fields.FloorAreaSize}
            lableStyle={{
              paddingLeft: UnitConvert.dpi(30)
            }}
            keyboardType='numeric'
            onBlur={() => { validFieldsPosiveNumber(fields.FloorAreaSize, true, '请输入正确的建筑面积', '建筑面积不能为空, 无法评估哦！') }}
            getFieldsValue={(code: string) => {
              setFields({
                ...fields,
                FloorAreaSize: code
              })
            }}
          />
          <MyTextInput
            flelds='房屋坐落'
            placeholder='请输入房屋坐落'
            defaultValue={fields.Address}
            lableStyle={{
              paddingLeft: UnitConvert.dpi(30)
            }}
            onBlur={() => { validFieldsDefault(fields.Address, '房屋坐落不能为空, 无法评估哦！') }}
            getFieldsValue={(code: string) => {
              setFields({
                ...fields,
                Address: code
              })
            }}
          />
          <MyDropdownList
            required
            flelds='房屋类型'
            placeHolder='请选择房屋类型'
            defaultValue={findDicName(getSubTypeList(fields.dicArr, 1310), fields.SourceByOwner)}
            lableStyle={{
              paddingLeft: UnitConvert.dpi(30)
            }}
            callBack={() => {
              const dic = getSubTypeList(fields.dicArr, 1310)
              setFields({
                ...fields,
                visible: true,
                title: '房屋类型',
                list: dic,
                defaultValue: fields.SourceByOwner,
                key: 'SourceByOwner'
              })
            }}
          />
          <MyDropdownList
            required
            flelds='房屋区域'
            placeHolder='请选择房屋区域'
            defaultValue={findDicName(getSubTypeList(fields.dicArr, 1110), fields.RegionDistrict)}
            lableStyle={{
              paddingLeft: UnitConvert.dpi(30)
            }}
            callBack={() => {
              const dic = getSubTypeList(fields.dicArr, 1110)
              setFields({
                ...fields,
                visible: true,
                title: '房屋区域',
                list: dic,
                defaultValue: fields.RegionDistrict,
                key: 'RegionDistrict'
              })
            }}
          />
        </KeyboardAvoidingView>
        <TouchableOpacity
          style={styles.result}
          onPress={() => handleClickThrottle()}
        >
          <Text style={styles.result_text}>查看评估结果</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }

  const showModal = () => {
    return (
      <MyModalSelect
        onCancel={() => {
          setFields({
            ...fields,
            visible: false
          })
        }}
        onOk={(selectInfo: MyModalSelectState) => {
          console.log('selectInfo', selectInfo)
          setFields({
            ...fields,
            visible: false,
            [fields.key]: selectInfo.val,
          })
        }}
        visible={fields.visible}
        title={fields.title}
        list={fields.list}
        defaultValue={fields.defaultValue}
      />
    )
  }

  return (
    <SafeAreaView style={CommonStyle.container}>
      <DefaultNavigationHeader
        title='评估服务'
        showLeftIcon
        leftCallBack={() => {
          navigation.goBack()
        }}
      />
      <Image source={ENV_IMAGE.banner_pg} style={styles.banner_pg} />
      <View style={CommonStyle.sizedBox}></View>
      {showForm()}
      {showModal()}
    </SafeAreaView>
  );
};

export default Assetment;

const styles = StyleSheet.create({
  banner_pg: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(200)
  },
  result: {
    width: UnitConvert.dpi(690),
    height: UnitConvert.dpi(80),
    backgroundColor: '#c71623',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: UnitConvert.dpi(6),
    marginLeft: UnitConvert.dpi(30),
    marginTop: UnitConvert.dpi(30)
  },
  result_text: {
    color: '#fff',
    fontSize: UnitConvert.dpi(34)
  },
});
