import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import LoginComponent from './LoginComponent';
import CommonStyle from '@/utils/constant/Style';
import RegisterComponent from './RegisterComponent';
import ForgetPas from './ForgetPas';

interface MyLoginProps {

}
const MyLogin = (props: MyLoginProps) => {
  const [mode, setMode] = useState('login')

  const showContent = () => {
    switch (mode) {
      case 'login':
        return (
          <LoginComponent
            mode={mode}
            callBack={(v: string) => {
              setMode(v)
            }}
          />
        )
      case 'register':
        return (
          // @ts-ignore
          <RegisterComponent
            mode={mode}
            callBack={(v: string) => {
              setMode(v)
            }}
          />
        )
      case 'forget':
        return (
          // @ts-ignore
          <ForgetPas
            mode={mode}
            callBack={(v: string) => {
              setMode(v)
            }}
          />
        )
      default:
        break;
    }
  }

  return (
    <SafeAreaView style={CommonStyle.container}>
      {showContent()}
    </SafeAreaView>
  );
};

MyLogin.defaultProps = {
  mode: 'login'
}

export default MyLogin;

const styles = StyleSheet.create({
  container: {}
});
