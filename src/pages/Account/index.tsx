import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image } from 'react-native';
import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import CommonStyle from '@/utils/constant/Style';
import { UnitConvert } from '@/utils/unitConvert';
import { ENV_ICON } from '@/assets/styles/picUrl';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Constant } from '@/utils/constant/Constant';
import { RootStackNavigation } from '@/router/index';
import { useNavigation } from '@react-navigation/native';

interface AccountProps {
  navigation: RootStackNavigation
}

const Account = (props: AccountProps) => {
  const navigation = useNavigation()
  // 点击列
  const handleClick = (item: { id?: string; icon_url?: string; title: string; }) => {
    switch (item.title) {
      case '我的资料':
        navigation.navigate('MyInfomation')
        break;
      case '我的推荐':
        navigation.navigate('MyRecommend')
        break;
      case '我的银行卡':
        navigation.navigate('MyCard')
        break;
      default:
        break;
    }
  }

  // 登录图标 
  const LogonComponent = () => {
    return (
      <TouchableOpacity
        style={styles.account_user}
        onPress={() => {
          navigation.navigate('Login')
        }}
      >
        <Image source={ENV_ICON.pic_user} style={styles.account_user_icon} />
        <View style={styles.account_user_right}>
          <View style={styles.account_user_right_box}>
            <Text style={styles.account_user_right_label}>点击登录</Text>
            <Text style={styles.account_user_right_text}>登录后体验更多功能</Text>
          </View>
          <Image source={ENV_ICON.icon_right} style={CommonStyle.img} />
        </View>
      </TouchableOpacity>
    )
  }

  //主体内容
  const List = () => {
    return (
      <View style={styles.account_list}>
        <View style={styles.sizedBox}></View>
        {
          Constant.account_category_arr.map(item => (
            <TouchableOpacity
              style={styles.account_list_item} key={item.id}
              onPress={() => handleClick(item)}
            >
              <Image style={styles.account_list_item_left} source={item.icon_url} />
              <View style={styles.account_list_item_right}>
                <Text style={styles.account_list_item_right_text}>{item.title}</Text>
                <Image source={ENV_ICON.icon_right} />
              </View>
            </TouchableOpacity>
          ))
        }
        <TouchableOpacity
          style={[styles.account_list_item, { marginTop: UnitConvert.dpi(20) }]}
          onPress={() => {
            navigation.navigate('Settings')
          }}
        >
          <Image style={styles.account_list_item_left} source={ENV_ICON.icon_sz} />
          <View style={styles.account_list_item_right}>
            <Text style={styles.account_list_item_right_text}>设置</Text>
            <Image source={ENV_ICON.icon_right} />
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={CommonStyle.container}>
      {/* 导航栏 */}
      <DefaultNavigationHeader
        title='个人中心'
        showBorder={false}
      />
      {/* 登录图标 */}
      <LogonComponent />
      {/* 广告 */}
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Recommend', {})
        }}
        style={styles.account_addbox}
      >
        <Image source={ENV_ICON.vip} style={styles.accout_add} />
      </TouchableOpacity>
      {/* 主体内容 */}
      <List />
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  account_user: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(144),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: UnitConvert.dpi(44),
    marginTop: UnitConvert.dpi(20),
    paddingRight: UnitConvert.dpi(20)
  },
  account_user_icon: {
    width: UnitConvert.dpi(144),
    height: UnitConvert.dpi(144)
  },
  account_user_right: {
    flex: 1,
    marginLeft: UnitConvert.dpi(28),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  account_user_right_box: {
    justifyContent: 'center'
  },
  account_user_right_label: {
    fontSize: UnitConvert.dpi(34),
    color: '#000'
  },
  account_user_right_text: {
    fontSize: UnitConvert.dpi(21),
    color: '#999',
    marginTop: UnitConvert.dpi(20)
  },
  account_addbox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: UnitConvert.dpi(26)
  },
  accout_add: {
    width: UnitConvert.dpi(662),
    height: UnitConvert.dpi(70)
  },
  account_list: {
    flex: 1,
    backgroundColor: Constant.defaultBgColor,
    paddingHorizontal: UnitConvert.dpi(30),
    marginTop: UnitConvert.dpi(20)
  },
  account_list_item: {
    height: UnitConvert.dpi(110),
    flexDirection: 'row',
    paddingLeft: UnitConvert.dpi(30),
    paddingRight: UnitConvert.dpi(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderBottomColor: Constant.commonBorderColor,
    borderBottomWidth: UnitConvert.dpi(2)
  },
  account_list_item_left: {
    width: UnitConvert.dpi(60)
  },
  account_list_item_right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: UnitConvert.dpi(20)
  },
  account_list_item_right_text: {
    fontSize: UnitConvert.dpi(30),
    color: '#000'
  },
  sizedBox: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(20),
    backgroundColor: Constant.defaultBgColor
  }
});
