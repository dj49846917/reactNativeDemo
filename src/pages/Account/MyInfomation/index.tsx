import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import { useNavigation } from '@react-navigation/native';
import { Constant } from '@/utils/constant/Constant';
import { ENV_ICON } from '@/assets/styles/picUrl';
import { AccountUser } from '@/assets/data/Account';
import { UnitConvert } from '@/utils/unitConvert';
import { getImg, getGenderByIdNumber, getBirthDayByIdNumber } from '@/utils/utils';

interface MyInfomationProps { }

type Istate = {
  HeadPortrait: any,
  NickName: string | null,
  IDCard: string,
}

const MyInfomation = (props: MyInfomationProps) => {
  const navigation = useNavigation()
  const [user, setUser] = useState<Istate>({
    HeadPortrait: null,
    NickName: '',
    IDCard: ''
  })

  useEffect(() => {
    const user = AccountUser
    setUser(user)
  }, [])

  // 主体内容
  const showContent = () => {
    return (
      <View style={{ flex: 1, backgroundColor: Constant.defaultBgColor }}>
        <TouchableOpacity
          style={styles.box_list_item2}
          onPress={() => { }}
        >
          <Image style={styles.box_list_item_icon} source={getImg(user.HeadPortrait)} />
          <View style={styles.list_right_item}>
            <Text style={styles.list_right_tip2}>修改头像</Text>
            <Image source={ENV_ICON.icon_right} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box_list_item}
          onPress={() => {
            navigation.navigate('EditInfo', {
              data: user.NickName,
              title: '修改昵称',
              placeholder: '昵称',
              key: 'NickName',
            })
          }}
        >
          <Text style={styles.box_list_item_text}>昵称</Text>
          <View style={styles.list_right_item}>
            <Text style={styles.list_right_tip}>{user.NickName}</Text>
            <Image source={ENV_ICON.icon_right} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box_list_item}
          onPress={() => {
            navigation.navigate('EditInfo', {
              data: user.IDCard,
              title: '修改身份证',
              placeholder: '身份证',
              key: 'IDCard'
            })
          }}
        >
          <Text style={styles.box_list_item_text}>身份证</Text>
          <View style={styles.list_right_item}>
            <Text style={styles.list_right_tip}>{user.IDCard}</Text>
            <Image source={ENV_ICON.icon_right} />
          </View>
        </TouchableOpacity>
        <View style={styles.box_list_item}>
          <Text style={styles.box_list_item_text}>性别</Text>
          <View style={[styles.list_right_item, styles.padding]}>
            <Text style={styles.list_right_tip}>{getGenderByIdNumber(user.IDCard)}</Text>
          </View>
        </View>
        <View style={styles.box_list_item}>
          <Text style={styles.box_list_item_text}>生日</Text>
          <View style={[styles.list_right_item, styles.padding]}>
            <Text style={styles.list_right_tip}>{getBirthDayByIdNumber(user.IDCard)}</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={CommonStyle.container}>
      <DefaultNavigationHeader
        title='我的资料'
        showLeftIcon
        leftCallBack={() => {
          navigation.goBack()
        }}
      />
      {showContent()}
    </SafeAreaView>
  );
};

export default MyInfomation;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#fff'
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
  box_list_item2: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(130),
    paddingLeft: UnitConvert.dpi(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: UnitConvert.dpi(2)
  },
  box_list_item_icon: {
    width: UnitConvert.dpi(100),
    height: UnitConvert.dpi(100),
    borderRadius: UnitConvert.dpi(50)
  },
  box_list_item_text: {
    fontSize: UnitConvert.dpi(28),
    color: '#000'
  },
  list_right_item: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  list_right_tip: {
    fontSize: UnitConvert.dpi(28),
    color: '#000'
  },
  list_right_tip2: {
    fontSize: UnitConvert.dpi(28),
    color: '#999'
  },
  padding: {
    paddingRight: UnitConvert.dpi(30)
  }
});
