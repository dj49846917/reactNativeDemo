import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Image, ImageBackground } from 'react-native';
import { ENV_IMAGE, ENV_ICON } from '@/assets/styles/picUrl';
import { UnitConvert } from '@/utils/unitConvert';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Storage from '@/utils/Storage';
import { Constant } from '@/utils/constant/Constant';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';

function mapStateToProps(state: RootState) {
  return {
    userData: state.login.userData
  }
}

const connector = connect(mapStateToProps)
type ModelState = ConnectedProps<typeof connector> // 定义connect的类型

export interface DefaultProps extends ModelState {

}

const Default = (props: DefaultProps) => {
  const navigation = useNavigation()

  useEffect(() => {
    // 给用户数据赋值
    Storage.get(Constant.STORAGE_USERKEY).then(res => {
      Storage.get(Constant.STORAGE_PASSWORDKEY).then(ret => {
        props.dispatch({
          type: 'login/setLoginInfo',
          payload: {
            password: ret,
            userData: res, 
          }
        })
      })
    })
  }, [])

  const handleClick = () => {
    console.log('props.userData', props.userData)
    if (JSON.stringify(props.userData) === '{}' || !props.userData) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'Login' },
          ],
        })
      );
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'Tab' },
          ],
        })
      );
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={ENV_IMAGE.welcome} style={styles.container}>
        <TouchableOpacity
          style={styles.container_btn}
          onPress={() => {
            handleClick()
          }}
        >
          <Image source={ENV_ICON.btn_start} />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default connector(Default);

const styles = StyleSheet.create({
  container: {
    width: UnitConvert.w,
    height: UnitConvert.h,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  container_btn: {
    marginBottom: UnitConvert.dpi(160)
  }
});
