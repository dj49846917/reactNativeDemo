import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { LoginComponentProps } from './LoginComponent';
import CommonStyle from '@/utils/constant/Style';
import loginStyle from './style';
import { ENV_ICON } from '@/assets/styles/picUrl';
import { validPhone, endEditCompare } from '@/utils/utils';

interface ForgetPasProps { }

type Iprops = ForgetPasProps & LoginComponentProps

type forgetState = {
  userPhone: string                                       // 手机号码
  count: number                                           // 验证码的倒计时
  tipStatus: boolean                                      // 是否阅读注册协议
  forgetVeryCode: string                                  // 验证码
  linked: boolean                                         // 是否输入过验证码
  forgetPassword: string                                  // 新密码
}

const ForgetPas = (props: Iprops) => {
  const [forgetFields, setForgetFields] = useState<forgetState>({
    userPhone: '',
    forgetVeryCode: '',
    count: 60,
    tipStatus: false,
    linked: false,
    forgetPassword: ''
  })

  return (
    <View style={CommonStyle.container}>
      <View style={[loginStyle.head]}>
        <TouchableOpacity
          style={loginStyle.head_left}
          onPress={() => {
            props.callBack('login')
          }}
        // onPress={this.hideModal.bind(this)}
        >
          <Image source={ENV_ICON.icon_top_left} />
        </TouchableOpacity>
        <View style={loginStyle.head_center}>
          <Text style={loginStyle.header_center_text}>找回密码</Text>
        </View>
        <View style={loginStyle.head_right}></View>
      </View>
      <View style={loginStyle.sizeBox}></View>
      <View style={loginStyle.content}>
        <View style={[loginStyle.form_item, loginStyle.form_phone]}>
          <TextInput
            style={loginStyle.rightInputContainer}
            placeholder={'请输入手机号码'}
            onChangeText={(value) => {
              setForgetFields({
                ...forgetFields,
                userPhone: value
              })
            }}
            defaultValue={forgetFields.userPhone}
            maxLength={11}
            keyboardType="phone-pad"
            onBlur={() => { validPhone(forgetFields.userPhone) }}
            secureTextEntry={false}
            placeholderTextColor='#999'
          />
          {
            forgetFields.linked ? (
              <TouchableOpacity
                onPress={() => { }}
                style={loginStyle.code_box}
              >
                <Text style={loginStyle.code_text}>获取验证码</Text>
              </TouchableOpacity>
            ) : (
                <View style={loginStyle.code_box}>
                  <Text style={loginStyle.code_text}>{forgetFields.count + '秒重新获取'}</Text>
                </View>
              )
          }
        </View>
        <View style={loginStyle.form_item}>
          <TextInput
            style={loginStyle.rightInputContainer}
            placeholder={'请输入短信验证码'}
            onChangeText={(value) => {
              setForgetFields({
                ...forgetFields,
                forgetVeryCode: value
              })
            }}
            defaultValue={forgetFields.forgetVeryCode}
            keyboardType='numeric'
            maxLength={6}
            secureTextEntry={false}
          />
        </View>
        <View style={loginStyle.form_item}>
          <TextInput
            style={loginStyle.rightInputContainer}
            placeholder={'新密码'}
            onChangeText={(value) => {
              setForgetFields({
                ...forgetFields,
                forgetPassword: value
              })
            }}
            defaultValue={forgetFields.forgetPassword}
            keyboardType={'default'}
            secureTextEntry={true}
            onEndEditing={() => { endEditCompare(forgetFields.forgetPassword)}}
          />
        </View>
        <TouchableOpacity
          style={[loginStyle.login_btn, loginStyle.top40]}
          onPress={() => { }}
        >
          <Text style={loginStyle.login_text}>提交</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgetPas;

const styles = StyleSheet.create({
  container: {}
});
