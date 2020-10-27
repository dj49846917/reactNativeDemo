import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import { useNavigation } from '@react-navigation/native';
import { UnitConvert } from '@/utils/unitConvert';
import { Constant } from '@/utils/constant/Constant';
import { ENV_ICON } from '@/assets/styles/picUrl';
import MyToastShort from '@/components/MyToastShort';
import MyModalComfirm from '@/components/MyModalComfirm';

interface SettingsProps { }

const Settings = (props: SettingsProps) => {
  const navigation = useNavigation()

  const [fields, setFields] = useState({
    currentVersion: '',
    cacheData: '',
    tipStatus: false,
  })

  // 点击退出按钮
  const exitLogin = () => {
    MyToastShort({ content: '退出成功' })
  }

  // 主体内容
  const showContent = () => {
    return (
      <View style={styles.box}>
        <View>
          <TouchableOpacity
            style={styles.box_list_item}
            onPress={() => {
              navigation.navigate('MessageAlert')
            }}
          >
            <Text style={styles.box_list_item_text}>消息提醒</Text>
            <Image source={ENV_ICON.icon_right} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box_list_item}
            onPress={() => {
              navigation.navigate('ModifyPas')
            }}
          >
            <Text style={styles.box_list_item_text}>安全提醒</Text>
            <View style={styles.list_right_item}>
              <Text style={styles.list_right_tip}>修改账号密码</Text>
              <Image source={ENV_ICON.icon_right} />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.box_list_item}
            onPress={() => {
              setFields({
                ...fields,
                tipStatus: true
              })
            }}
          >
            <Text style={styles.box_list_item_text}>清除缓存</Text>
            <View style={styles.list_right_item}>
              <Text style={styles.list_right_tip}>{fields.cacheData}</Text>
              <Image source={ENV_ICON.icon_right} />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.box_list_item}>
            <Text style={styles.box_list_item_text}>当前版本号</Text>
            <View style={[styles.list_right_item, styles.marginRight]}>
              <Text style={styles.list_right_tip}>{`v${fields.currentVersion}`}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.box_btn}
          onPress={() => exitLogin()}
        >
          <Text style={styles.box_btn_text}>退出登录</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // 弹窗
  const showModal = () => {
    return (
      <MyModalComfirm
        isOpen={fields.tipStatus}
        content='是否确认清除所有缓存'
        okCallback={() => {
          setFields({
            ...fields,
            tipStatus: false
          })
          MyToastShort({ content: '清理成功' })
        }}
        cancelCallback={() => {
          setFields({
            ...fields,
            tipStatus: false
          })
          
        }}
      />
    )
  }

  return (
    <SafeAreaView style={CommonStyle.container}>
      <DefaultNavigationHeader
        title='设置'
        showLeftIcon
        navigation={navigation}
      />
      <View style={CommonStyle.sizedBox}></View>
      {showContent()}
      {showModal()}
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  setting: {
    flex: 1,
    backgroundColor: '#fff'
  },
  box: {
    flex: 1,
    backgroundColor: Constant.defaultBgColor
  },
  box_list_item: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(90),
    paddingLeft: UnitConvert.dpi(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: UnitConvert.dpi(2)
  },
  box_list_item_text: {
    fontSize: UnitConvert.dpi(32),
    color: '#000'
  },
  list_right_item: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  list_right_tip: {
    fontSize: UnitConvert.dpi(28),
    color: '#999'
  },
  box_btn: {
    width: UnitConvert.w - UnitConvert.dpi(60),
    marginLeft: UnitConvert.dpi(30),
    marginTop: UnitConvert.dpi(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: UnitConvert.dpi(4),
    backgroundColor: '#C71622',
    height: UnitConvert.dpi(80)
  },
  box_btn_text: {
    fontSize: UnitConvert.dpi(32),
    color: '#fff'
  },
  marginRight: {
    marginRight: UnitConvert.dpi(30)
  }
});
