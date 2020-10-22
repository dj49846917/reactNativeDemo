import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { UnitConvert } from '@/utils/unitConvert';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ENV_IMAGE, ENV_ICON } from '@/assets/styles/picUrl';
import CommonStyle from '@/utils/constant/Style';
import { ConnectedProps, connect } from 'react-redux';
import { RootState } from '@/models/index';

function mapStateToProps(state: RootState) {
  return {
    barHeight: state.home.barHeight
  }
}

const connector = connect(mapStateToProps)

type ModalState = ConnectedProps<typeof connector> // 定义connect的类型

interface NavProps extends ModalState {
  handleOpenModel: Function
}

const Nav = (props: NavProps) => {
  const route = useRoute<any>()
  const agentRowData = route.params
  const navigation = useNavigation()
  // 展示主营板块
  const showAreaText = (code: string) => {
    let res = ''
    const arr: any[] = []
    try {
      JSON.parse(code).forEach((item: { text: string; }) => {
        arr.push(item.text)
      })
      res = arr.join(',')
    } catch (error) {
      console.log(error)
    } finally {
      return res
    }
  }

  const getMarginTop = (barHeight: number) => {
    return barHeight
  }
  return (
    <View style={styles.agent_nav}>
      <Image source={ENV_IMAGE.broker_bg} style={{ width: UnitConvert.w }} />
      <View style={[styles.angent_top, { top: getMarginTop(props.barHeight) }]}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Image source={ENV_ICON.icon_top_left_white} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.nav_title}>经纪人主页</Text>
        <TouchableOpacity onPress={() => props.handleOpenModel()}>
          <Image source={ENV_ICON.icon_top_share_white} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.nav_user}>
        <Image source={agentRowData.HeadPortrait ? { uri: agentRowData.HeadPortrait } : ENV_IMAGE.timg} style={styles.nav_user_icon} />
        <View>
          <Text style={styles.nav_user_text}>{agentRowData.UserName}</Text>
          <Text style={styles.nav_user_loc}>主营模块：{showAreaText(agentRowData.RegionJson)}</Text>
        </View>
      </View>
      <View style={styles.nav_info}>
        <View style={styles.nav_info_item}>
          <Text style={styles.nav_info_num}>
            <Text style={styles.nav_info_person}>{agentRowData.TransactionCount}</Text>人
              </Text>
          <Text style={styles.nav_info_tip}>服务用户</Text>
        </View>
        <View style={styles.nav_info_item}>
          <Text style={styles.nav_info_num}>
            <Text style={styles.nav_info_person}>{agentRowData.TransactionCount}</Text>人
              </Text>
          <Text style={styles.nav_info_tip}>免费带看</Text>
        </View>
        <View style={styles.nav_info_item}>
          <Text style={styles.nav_info_num}>
            <Text style={styles.nav_info_person}>{agentRowData.SeeCount}</Text>人
              </Text>
          <Text style={styles.nav_info_tip}>成交客户</Text>
        </View>
      </View>
    </View>
  );
};

Nav.defaultProps = {
  handleOpenModel: () => { }
}

export default connector(Nav);

const styles = StyleSheet.create({
  agent_nav: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(508),
    position: 'relative',
    backgroundColor: '#fff'
  },
  angent_top: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(60),
    position: 'absolute',
    top: UnitConvert.dpi(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: UnitConvert.dpi(20),
    paddingLeft: UnitConvert.dpi(5)
  },
  nav_title: {
    color: '#fff',
    fontSize: UnitConvert.dpi(30)
  },
  nav_user: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(150),
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: UnitConvert.dpi(48),
    top: UnitConvert.dpi(160),
  },
  nav_user_icon: {
    width: UnitConvert.dpi(100),
    height: UnitConvert.dpi(100),
    borderRadius: UnitConvert.dpi(50),
    marginRight: UnitConvert.dpi(30)
  },
  nav_user_text: {
    fontSize: UnitConvert.dpi(38),
    color: '#FFF',
    marginBottom: UnitConvert.dpi(4)
  },
  nav_user_loc: {
    fontSize: UnitConvert.dpi(26),
    marginTop: UnitConvert.dpi(16),
    color: '#fff'
  },
  nav_info: {
    marginLeft: UnitConvert.dpi(30),
    width: UnitConvert.dpi(690),
    height: UnitConvert.dpi(200),
    borderRadius: UnitConvert.dpi(20),
    backgroundColor: '#fff',
    paddingVertical: UnitConvert.dpi(30),
    paddingHorizontal: UnitConvert.dpi(50),
    position: 'absolute',
    bottom: UnitConvert.dpi(-40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: UnitConvert.dpi(2),
    borderColor: '#f1f1f1'
  },
  nav_info_num: {
    fontSize: UnitConvert.dpi(26),
    color: '#262626'
  },
  nav_info_person: {
    fontSize: UnitConvert.dpi(60),
    color: '#262626'
  },
  nav_info_tip: {
    fontSize: UnitConvert.dpi(28),
    color: '#666'
  },
  icon: {
    width: UnitConvert.dpi(60),
    height: UnitConvert.dpi(60)
  },
  nav_info_item: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
