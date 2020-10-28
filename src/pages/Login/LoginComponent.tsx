import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput, Keyboard } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import { ENV_ICON } from '@/assets/styles/picUrl';
import { useNavigation } from '@react-navigation/native';
import loginStyle from './style';
import { validPhone, validLoginPassword } from '@/utils/utils';
import { StackActions } from '@react-navigation/native';

export interface LoginComponentProps {
  mode: string                                                  // 登录的模式(login, register, forget)
  callBack: Function                                            // 切换页面的回调
}

type loginState = {
  userPhone: string                                       // 手机号码
  loginPassword: string                                   // 密码
  notShowPassword: boolean                                // 是否隐藏密码
  tipStatus: boolean                                      // 是否阅读注册协议
}

const LoginComponent = (props: LoginComponentProps) => {
  const navigation = useNavigation()
  const [loginFields, setLoginFields] = useState<loginState>({
    userPhone: '',
    loginPassword: '',
    notShowPassword: true,
    tipStatus: false
  })

  // 登录
  const doLogin = () => {
    const a = validPhone(loginFields.userPhone)
    const b = validLoginPassword(loginFields.loginPassword)
    if(a && b) {
      navigation.dispatch(
        StackActions.replace('Tab', {})
      );
    }
  }

  return (
    <View style={CommonStyle.container}>
      <View style={[loginStyle.head, { marginTop: 0 }]}>
        <TouchableOpacity
          style={loginStyle.head_left}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Image source={ENV_ICON.icon_top_off} style={CommonStyle.img} />
        </TouchableOpacity>
        <TouchableOpacity
          style={loginStyle.head_right}
          onPress={() => {
            props.callBack('register')
          }}
        >
          <Text style={loginStyle.head_right_text}>注册</Text>
        </TouchableOpacity>
      </View>
      <View style={loginStyle.logo}>
        <Image source={ENV_ICON.login_logo} style={loginStyle.logo_icon} />
      </View>
      <View style={loginStyle.content}>
        <View style={loginStyle.form_item}>
          <TextInput
            style={loginStyle.rightInputContainer}
            placeholder={'请输入手机号码'}
            onChangeText={(value) => {
              setLoginFields({
                ...loginFields,
                userPhone: value
              })
            }}
            defaultValue={loginFields.userPhone}
            maxLength={11}
            keyboardType="phone-pad"
            onBlur={() => validPhone(loginFields.userPhone)}
            secureTextEntry={false}
            placeholderTextColor='#999'
          />
        </View>
        <View style={loginStyle.form_item}>
          <TextInput
            style={loginStyle.rightInputContainer}
            placeholder={'请输入密码'}
            onChangeText={(value) => {
              setLoginFields({
                ...loginFields,
                loginPassword: value
              })
            }}
            defaultValue={loginFields.loginPassword}
            keyboardType='default'
            secureTextEntry={loginFields.notShowPassword}
            onBlur={() => validLoginPassword(loginFields.loginPassword)}
            placeholderTextColor='#999'
          />
        </View>
        <View style={loginStyle.form_item2}>
          <TouchableOpacity
            onPress={() => {
              props.callBack('forget')
            }}>
            <Text style={loginStyle.forget_pass_text}>忘记密码?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={loginStyle.login_btn}
          onPress={() => {
            Keyboard.dismiss()
            doLogin()
          }}
        >
          <Text style={loginStyle.login_text}>登录</Text>
        </TouchableOpacity>
        <View style={loginStyle.command_tip}>
          <TouchableOpacity
            style={loginStyle.command_tip_item}
            onPress={() => {
              setLoginFields({
                ...loginFields,
                tipStatus: !loginFields.tipStatus
              })
            }}
          >
            <Image source={loginFields.tipStatus ? ENV_ICON.select : ENV_ICON.select_no} style={[CommonStyle.img, loginStyle.choose]} />
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

export default LoginComponent;

const styles = StyleSheet.create({
  
});
