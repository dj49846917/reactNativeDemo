import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import { UnitConvert } from '@/utils/unitConvert';
import { Constant } from '@/utils/constant/Constant';
import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import { useNavigation } from '@react-navigation/native';
import MyTextInput from '@/components/MyTextInput';
import MyErrorNotice from '@/components/MyErrorNotice';
import MyToastShort from '@/components/MyToastShort';

interface AddCardProps { }

type Istate = {
  cardUser: string, // 持卡人姓名
  bankName: string, // 卡号
  cardNo: string, // 银行名称
  branchBankName: string, // 分行名称
}

// 校验持卡人
function checkCardUser(v: string) {
  if (!v) {
    MyErrorNotice({ content: '持卡人不能为空!' });
    return false;
  } else if (v.length < 2) {
    MyErrorNotice({ content: "请输入正确的持卡人!" });
    return false;
  } else {
    return true
  }
}

// 校验卡号
function checkCardNo(v: string) {
  if (!v) {
    MyErrorNotice({ content: "卡号不能为空!" });
    return false;
  } else if (v.length < 10) {
    MyErrorNotice({ content: "请输入正确的卡号!" });
    return false;
  } else {
    return true
  }
}

// 校验银行名称
function checkBankName(v: string) {
  if (!v) {
    MyErrorNotice({ content: "银行名称不能为空!" });
    return false;
  } else if (v.length < 2) {
    MyErrorNotice({ content: "请输入正确的银行名称" });
    return false;
  } else {
    return true
  }
}

const AddCard = (props: AddCardProps) => {
  const navigation = useNavigation()
  const [fields, setFields] = useState({
    cardUser: '',
    bankName: '',
    cardNo: '',
    branchBankName: '',
  })

  // 保存
  const save = () => {
    const a = checkCardUser(fields.cardUser)
    const b = checkCardNo(fields.cardNo)
    const c = checkBankName(fields.bankName)
    if(a && b && c) {
      const params = fields
      MyToastShort({content: '保存成功'})
    }
  }

  // 主体内容
  const showContent = () => {
    return (
      <View style={styles.box}>
        <View style={styles.box_item}>
          <MyTextInput
            required
            flelds='持卡人'
            placeholder='请输入持卡人姓名'
            defaultValue={fields.cardUser}
            labelWidth={UnitConvert.dpi(208)}
            getFieldsValue={(v: string) => {
              setFields({
                ...fields,
                cardUser: v
              })
            }}
            onBlur={() => checkCardUser(fields.cardUser)}
          />
          <MyTextInput
            required
            flelds='卡号'
            placeholder='请输入银行卡卡号'
            defaultValue={fields.cardNo}
            labelWidth={UnitConvert.dpi(208)}
            getFieldsValue={(v: string) => {
              setFields({
                ...fields,
                cardNo: v
              })
            }}
            onBlur={() => checkCardNo(fields.cardNo)}
          />
          <MyTextInput
            required
            flelds='银行名称'
            placeholder='请输入银行名称'
            defaultValue={fields.bankName}
            labelWidth={UnitConvert.dpi(208)}
            getFieldsValue={(v: string) => {
              setFields({
                ...fields,
                bankName: v
              })
            }}
            onBlur={() => checkBankName(fields.bankName)}
          />
          <MyTextInput
            flelds='分行名称'
            placeholder='请输入分行名称'
            defaultValue={fields.branchBankName}
            labelWidth={UnitConvert.dpi(208)}
            getFieldsValue={(v: string) => {
              setFields({
                ...fields,
                branchBankName: v
              })
            }}
          />
        </View>
        <TouchableOpacity style={styles.box_btn} onPress={() => save()}>
          <Text style={styles.box_btn_text}>保存</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={CommonStyle.container}>
      <DefaultNavigationHeader
        title='添加银行卡'
        showLeftIcon
        leftCallBack={() => {
          navigation.goBack()
        }}
      />
      <View style={CommonStyle.sizedBox}></View>
      {showContent()}
    </SafeAreaView>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: Constant.defaultBgColor
  },
  box_item: {
    backgroundColor: '#fff',
    paddingHorizontal: UnitConvert.dpi(30),
    width: UnitConvert.w,
  },
  box_btn: {
    width: UnitConvert.w - UnitConvert.dpi(60),
    marginLeft: UnitConvert.dpi(30),
    marginTop: UnitConvert.dpi(40),
    height: UnitConvert.dpi(80),
    borderRadius: UnitConvert.dpi(4),
    backgroundColor: '#c71622',
    justifyContent: 'center',
    alignItems: 'center'
  },
  box_btn_text: {
    fontSize: UnitConvert.dpi(32),
    color: '#fff'
  }
});
