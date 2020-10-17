import React, { useState } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, TextInput, ScrollView, Platform, Alert } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import { UnitConvert } from '@/utils/unitConvert';
import MyTextInput from '@/components/MyTextInput';
import { Constant } from '@/utils/constant/Constant';
import MyDropdownList from '@/components/MyDropdownList';
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '@/models/index'
import { getSubTypeList, findDicName, validFieldsDefault, validFieldsPhone, validFieldsIdCard } from '@/utils/utils';
import RecommandBtn from '@/pages/Recommend/RecommandBtn';
import { dicType } from '@/models/Recommend';
import MyErrorNotice from '@/components/MyErrorNotice';

const mapStateToProps = (state: RootState) => {
  return {
    UserName: state.recommend.UserName,
    MobilePhone: state.recommend.MobilePhone,
    IDCard: state.recommend.IDCard,
    RegionId: state.recommend.RegionId,
    ViewingDate: state.recommend.ViewingDate,
    dicArr: state.recommend.dicArr,
    Remark: state.recommend.Remark,
    // num: state.home.num,
    // loading: state.loading.effects['home/asyncAdd']
  }
}

const connector = connect(mapStateToProps)
type ModalState = ConnectedProps<typeof connector> // 定义connect的类型

interface CustomerProps extends ModalState {
  HouseTypeSelectRow: dicType,
  AreaSelectRow: dicType,
  HuXingTypeSelectRow: dicType,
  needs: string
}

const Customer = (props: CustomerProps) => {
  // 保存客源
  const saveCust = (code: boolean) => {
    if (!code) {
      MyErrorNotice({ content: '请阅读推荐房源相关温馨提示' })
      return
    }
    const phone = validFieldsPhone(props.MobilePhone, true, '请输入正确的电话号码', '被推荐人电话不能为空')
    const user = validFieldsDefault(props.UserName, '被推荐人姓名不能为空')
    const idCard = validFieldsIdCard(props.IDCard, false, '请输入正确的身份证号', '被推荐人身份证号不能为空')
    if (!props.RegionId) {
      MyErrorNotice({ content: '请选择意向城市' })
      return
    }
    if (user && phone && idCard && props.RegionId) {
      const content = {
        UserName: props.UserName || null,
        MobilePhone: props.MobilePhone || null,
        IDCard: props.IDCard || null,
        RegionId: props.RegionId || null,
        ViewingDate: props.ViewingDate || null,
        HouseType: props.HouseTypeSelectRow.DicCode || null,
        HuXingTypeF: props.HuXingTypeSelectRow.DicCode || null,
        AreaMin: props.AreaSelectRow.AreaMin || null,
        AreaMax: props.AreaSelectRow.AreaMax || null,
        Remark: props.Remark || null,
      }
      const params = {
        data: JSON.stringify(content),
        operatorrid: 1002
      }
      console.log('params', params)
    }
  }

  return (
    <View style={[CommonStyle.content, { backgroundColor: Constant.defaultBgColor }]}>
      <View style={CommonStyle.sizedBox}></View>
      <ScrollView style={CommonStyle.content}>
        <KeyboardAvoidingView style={CommonStyle.content} behavior='padding' keyboardVerticalOffset={200}>
          <MyTextInput
            flelds='客户姓名'
            required
            // showClearIcon
            placeholder='请输入推荐人姓名'
            defaultValue={props.UserName}
            lableStyle={{
              paddingLeft: UnitConvert.dpi(30)
            }}
            onBlur={() => {
              validFieldsDefault(props.UserName, '被推荐人姓名不能为空')
            }}
            getFieldsValue={(code: string) => {
              props.dispatch({
                type: 'recommend/setFields',
                payload: {
                  key: 'UserName',
                  val: code
                }
              })
            }}
          />
          <MyTextInput
            flelds='客户电话'
            required
            // showClearIcon
            placeholder='请输入被推荐人电话'
            keyboardType='phone-pad'
            defaultValue={props.MobilePhone}
            onBlur={() => {
              validFieldsPhone(props.MobilePhone, true, '请输入正确的电话号码', '被推荐人电话不能为空')
            }}
            lableStyle={{
              paddingLeft: UnitConvert.dpi(30)
            }}
            getFieldsValue={(code: string) => {
              props.dispatch({
                type: 'recommend/setFields',
                payload: {
                  key: 'MobilePhone',
                  val: code
                }
              })
            }}
          />
          <MyTextInput
            flelds='身份证号'
            placeholder='请输入被推荐人身份证号'
            // showClearIcon
            defaultValue={props.IDCard}
            lableStyle={{
              paddingLeft: UnitConvert.dpi(30)
            }}
            onBlur={() => { validFieldsIdCard(props.IDCard, false, '请输入正确的身份证号', '被推荐人身份证号不能为空') }}
            getFieldsValue={(code: string) => {
              props.dispatch({
                type: 'recommend/setFields',
                payload: {
                  key: 'IDCard',
                  val: code
                }
              })
            }}
          />
          <View style={CommonStyle.sizedBox}></View>
          <MyDropdownList
            showLabel
            required
            flelds='意向区域'
            placeHolder='请选择意向区域'
            defaultValue={findDicName(getSubTypeList(props.dicArr, 1110), props.RegionId)}
            lableStyle={{
              paddingLeft: UnitConvert.dpi(30)
            }}
            callBack={() => {
              // 过滤数据字典
              const dic = getSubTypeList(props.dicArr, 1110)
              props.dispatch({
                type: 'recommend/openModal',
                payload: {
                  val: true,
                  title: '意向区域',
                  list: dic,
                  defaultValue: props.RegionId,
                  key: 'RegionId'
                }
              })
            }}
          />
          <MyDropdownList
            showLabel
            flelds='看房日期'
            placeHolder='请选择看房日期'
            defaultValue={props.ViewingDate}
            lableStyle={{
              paddingLeft: UnitConvert.dpi(30)
            }}
            callBack={() => {
              props.dispatch({
                type: 'recommend/setFields',
                payload: {
                  key: 'dateVisible',
                  val: true
                }
              })
            }}
          />
          <MyDropdownList
            showLabel
            flelds='购房需求'
            placeHolder='可多选'
            defaultValue={props.needs}
            lableStyle={{
              paddingLeft: UnitConvert.dpi(30)
            }}
            callBack={() => {
              props.dispatch({
                type: 'recommend/setFields',
                payload: {
                  key: 'moreCustVisible',
                  val: true
                }
              })
            }}
          />
          <View style={CommonStyle.sizedBox}></View>
          <MyTextInput
            flelds='备注'
            placeholder='请输入备注'
            multiline
            defaultValue={props.Remark}
            height={UnitConvert.dpi(160)}
            lableStyle={{
              paddingLeft: UnitConvert.dpi(30)
            }}
            getFieldsValue={(code: string) => {
              props.dispatch({
                type: 'recommend/setFields',
                payload: {
                  key: 'Remark',
                  val: code
                }
              })
            }}
          />
          <RecommandBtn
            tipTitle='《客源温馨提示》'
            tipCallback={() => { }}
            save={(code: boolean) => {
              saveCust(code)
            }}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default connector(Customer);

const styles = StyleSheet.create({
  container: {}
});
