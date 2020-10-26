import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { LoginComponentProps } from './LoginComponent';
import CommonStyle from '@/utils/constant/Style';
import loginStyle from './style';
import { ENV_ICON } from '@/assets/styles/picUrl';
import { validPhone, endEditCompare } from '@/utils/utils';

interface RegisterComponentProps { }

type registerState = {
  userPhone: string                                       // 手机号码
  count: number                                           // 验证码的倒计时
  tipStatus: boolean                                      // 是否阅读注册协议
  regVeryCode: string                                     // 验证码
  linked: boolean                                         // 是否输入过验证码
  regPassword: string                                     // 密码
}

type Iprops = RegisterComponentProps & LoginComponentProps

const RegisterComponent = (props: Iprops) => {
  const [registerFields, setRegisterFields] = useState<registerState>({
    userPhone: '',
    regVeryCode: '',
    count: 60,
    tipStatus: false,
    linked: false,
    regPassword: ''
  })

  return (
    <View style={CommonStyle.container}>
      <View style={[loginStyle.head]}>
        <TouchableOpacity
          style={loginStyle.head_left}
          onPress={() => {
            props.callBack('login')
          }}
        >
          <Image source={ENV_ICON.icon_top_left} style={CommonStyle.img} />
        </TouchableOpacity>
        <View style={loginStyle.head_center}>
          <Text style={loginStyle.header_center_text}>注册账号</Text>
        </View>
        <TouchableOpacity
          style={loginStyle.head_right}
          onPress={() => {
            props.callBack('login')
          }}
        >
          <Text style={loginStyle.head_right_text}>登录</Text>
        </TouchableOpacity>
      </View>
      <View style={loginStyle.sizeBox}></View>
      <View style={loginStyle.content}>
        <View style={[loginStyle.form_item, loginStyle.form_phone]}>
          <TextInput
            style={loginStyle.rightInputContainer}
            placeholder={'请输入手机号码'}
            onChangeText={(value) => {
              setRegisterFields({
                ...registerFields,
                userPhone: value
              })
            }}
            defaultValue={registerFields.userPhone}
            maxLength={11}
            keyboardType={"phone-pad"}
            onBlur={() => { validPhone(registerFields.userPhone) }}
            secureTextEntry={false}
            placeholderTextColor={'#999'}
          />
          {
            registerFields.linked ? (
              <TouchableOpacity
                onPress={() => { }}
                style={loginStyle.code_box}
              >
                <Text style={loginStyle.code_text}>获取验证码</Text>
              </TouchableOpacity>
            ) : (
                <View style={loginStyle.code_box}>
                  <Text style={loginStyle.code_text}>{registerFields.count + '秒重新获取'}</Text>
                </View>
              )
          }
        </View>
        <View style={loginStyle.form_item}>
          <TextInput
            style={loginStyle.rightInputContainer}
            placeholder={'请输入短信验证码'}
            onChangeText={(value) => {
              setRegisterFields({
                ...registerFields,
                regVeryCode: value
              })
            }}
            defaultValue={registerFields.regVeryCode}
            keyboardType={'numeric'}
            maxLength={6}
            secureTextEntry={false}
          />
        </View>
        <View style={loginStyle.form_item}>
          <TextInput
            style={loginStyle.rightInputContainer}
            placeholder={'请输入密码'}
            onChangeText={(value) => {
              setRegisterFields({
                ...registerFields,
                regPassword: value
              })
            }}
            defaultValue={registerFields.regPassword}
            keyboardType={'default'}
            secureTextEntry={true}
            onBlur={() => { endEditCompare(registerFields.regPassword) }}
            placeholderTextColor={'#999'}
          />
        </View>
        <TouchableOpacity
          style={[loginStyle.login_btn, loginStyle.top40]}
          // onPress={this.hideModal.bind(this)}
          onPress={() => { }}
        >
          <Text style={loginStyle.login_text}>注册</Text>
        </TouchableOpacity>
        <View style={loginStyle.command_tip}>
          <TouchableOpacity
            style={loginStyle.command_tip_item}
            onPress={() => {
              setRegisterFields({
                ...registerFields,
                tipStatus: !registerFields.tipStatus
              })
            }}
          >
            <Image source={registerFields.tipStatus ? ENV_ICON.select : ENV_ICON.select_no} style={[CommonStyle.img, loginStyle.choose]} />
            <Text style={loginStyle.command_tip_text}>我已阅读并同意</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.callBack('read')
            }}
          >
            <Text style={loginStyle.command_tip_red}>《注册协议》</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegisterComponent;

const styles = StyleSheet.create({
  container: {}
});
