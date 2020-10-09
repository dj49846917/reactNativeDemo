import React, { useState } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, TextInput, ScrollView, Platform, Alert } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import { UnitConvert } from '@/utils/unitConvert';
import MyTextInput from '@/components/MyTextInput';
import { Constant } from '@/utils/constant/Constant';
import MyDropdownList from '@/components/MyDropdownList';
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '@/models/index'

const mapStateToProps = (state: RootState) => {
  console.log('state', state)
  return {
    UserName: state.recommend.UserName
    // num: state.home.num,
    // loading: state.loading.effects['home/asyncAdd']
  }
}

const connector = connect(mapStateToProps)
type ModalState = ConnectedProps<typeof connector> // 定义connect的类型

interface CustomerProps extends ModalState {
  
}

const Customer = (props: CustomerProps) => {
  const [fileds, setFileds] = React.useState({
    // UserName: '',         // 客户名称
    MobilePhone: '',      // 客户电话
    IDCard: '',           // 身份证号
    RegionId: 0,          // 意向区域
    ViewingDate: '',      // 看房日期
    needs: '',            // 购房需求        
    Remark: '',           // 备注
    showRegionId: false,  // 意向区域弹窗
  })
  console.log('props', props.UserName)
  return (
    <View style={[CommonStyle.content, { backgroundColor: Constant.defaultBgColor }]}>
      <View style={CommonStyle.sizedBox}></View>
      <ScrollView style={CommonStyle.content}>
        <KeyboardAvoidingView style={CommonStyle.content} behavior={Platform.OS ==='ios' ? 'padding' : 'position'} keyboardVerticalOffset={400}>
          <MyTextInput
            flelds='客户姓名'
            required
            showClearIcon
            placeholder='请输入推荐人姓名'
            defaultValue={props.UserName}
            lableStyle={{
              paddingLeft: UnitConvert.dpi(30)
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
            showClearIcon
            placeholder='请输入被推荐人电话'
            keyboardType='phone-pad'
            defaultValue={fileds.MobilePhone}
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
            showClearIcon
            defaultValue={fileds.IDCard}
            lableStyle={{
              paddingLeft: UnitConvert.dpi(30)
            }}
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
            defaultValue={fileds.RegionId}
            lableStyle={{
              paddingLeft: UnitConvert.dpi(30)
            }}
            callBack={()=>{
              props.dispatch({
                type: 'recommend/openModal',
                payload: {
                  val: true
                }
              })
            }}
          />
          <MyDropdownList
            showLabel
            flelds='看房日期'
            placeHolder='请选择看房日期'
            defaultValue={fileds.ViewingDate}
            lableStyle={{
              paddingLeft: UnitConvert.dpi(30)
            }}
            callBack={()=>{}}
          />
          <MyDropdownList
            showLabel
            flelds='购房需求'
            placeHolder='可多选'
            defaultValue={fileds.needs}
            lableStyle={{
              paddingLeft: UnitConvert.dpi(30)
            }}
            callBack={()=>{}}
          />
          <View style={CommonStyle.sizedBox}></View>
          <MyTextInput
            flelds='备注'
            placeholder='请输入备注'
            multiline
            defaultValue={fileds.Remark}
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
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default connector(Customer);

const styles = StyleSheet.create({
  container: {}
});
