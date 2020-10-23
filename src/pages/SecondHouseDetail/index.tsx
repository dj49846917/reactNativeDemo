import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import CommonBanner from '@/components/CommonBanner';
import { secondHouseDetailData, SecondHouseDetailDic, SecondHouseDetailBanner, SecondHouseDetailToData } from '@/assets/data/SecondHouseDetail';
import { dicType } from '@/models/Recommend';
import { UnitConvert } from '@/utils/unitConvert';
import { ScrollView } from 'react-native-gesture-handler';
import Content from './Content';
import DetailForm from './DetailForm';
import { ENV_ICON } from '@/assets/styles/picUrl';
import Introduce from './Introduce';
import CommonTalk from '@/components/CommonTalk';
import { ConnectedProps, connect } from 'react-redux';
import { RootState } from '@/models/index';
import Modal from 'react-native-modalbox';
import { Constant } from '@/utils/constant/Constant';

function mapStateToProps(state: RootState) {
  return {
    barHeight: state.home.barHeight
  }
}

const connector = connect(mapStateToProps)

type ModalState = ConnectedProps<typeof connector> // 定义connect的类型

interface SecondHouseDetailProps extends ModalState { }

type Istate = {
  fields: object
  dicArr: dicType[]
  bannerArr: any[]
  toUser: object
}

const SecondHouseDetail = (props: SecondHouseDetailProps) => {
  const route = useRoute<any>()
  const navigation = useNavigation()
  const [data, setData] = React.useState<Istate>({
    fields: {},
    dicArr: [],
    bannerArr: [],
    toUser: {}
  })
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    // 初始化数据
    const formData = secondHouseDetailData[0]
    // 数据字典
    const dicArr = SecondHouseDetailDic
    // banner图
    const bannerArr = SecondHouseDetailBanner
    // 用户数据
    const toUser = SecondHouseDetailToData
    setData({
      fields: formData,
      dicArr,
      bannerArr,
      toUser,
    })
  }, [])

  const showNavBtn = () => {
    return (
      <>
        <TouchableOpacity
          style={[styles.back, {top: props.barHeight}]}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Image source={ENV_ICON.icon_top_left_white} style={styles.icon_style} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.good, {top: props.barHeight}]}
          onPress={() => {}}
        >
          <Image source={ENV_ICON.icon_top_heart_white} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.share, {top: props.barHeight}]}
          onPress={() => {
            setVisible(true)
          }}
        >
          <Image source={ENV_ICON.icon_top_share_white} />
        </TouchableOpacity>
      </>
    )
  }

  // 房贷计算器按钮
  const showHouseCalculatorBtn = () => {
    return (
      <View style={styles.calculator_box}>
        <TouchableOpacity
          style={styles.calculator}
          onPress={() => {
            navigation.navigate("HouseCalculator")
          }}
        >
          <Image source={ENV_ICON.icon_js} style={styles.icon} />
          <Text style={styles.calculator_text}>点击查看参考首付及月供明细</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const showModal = () => {
    return (
      <Modal
        isOpen={visible}
        style={CommonStyle.modalContainer}
        isDisabled={false}
        swipeToClose={false}
        backButtonClose={false}
        backdropPressToClose={true}
        position={"bottom"}
        onClosed={() => { setVisible(false) }}
      >
        <View style={CommonStyle.modal_icon_box}>
          {Constant.secondShareIconTab.map(item => (
            <TouchableOpacity key={item.id} style={CommonStyle.modal_icon_item} onPress={() => {}}>
              <Image source={item.icon} style={CommonStyle.modal_icon} />
              <Text style={CommonStyle.modal_icon_text}>{item.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={CommonStyle.modal_close_box} onPress={() => setVisible(false)}>
          <Text style={CommonStyle.modal_close_text}>取消</Text>
        </TouchableOpacity>
      </Modal>
    )
  }

  return (
    <View style={CommonStyle.container}>
      {/* banner图部分 */}
      <View style={styles.banner}>
        <CommonBanner
          list={data.bannerArr}
          showsButtons={false}
          dot={<View style={styles.swiper_dot} />}
          activeDot={<View style={styles.swiper_dot_active} />}
          paginationStyle={{ bottom: 10 }}
        />
        {showNavBtn()}
      </View>
      <ScrollView style={CommonStyle.container}>
        {/* 内容部分 */}
        <Content data={data.fields} dicArr={data.dicArr} />
        {/* 详细信息部分 */}
        <DetailForm data={data.fields} dicArr={data.dicArr} />
        {/* 房贷计算器按钮 */}
        {showHouseCalculatorBtn()}
        {/* 房源介绍 */}
        <Introduce data={data.fields} />
      </ScrollView>
      <CommonTalk
        toData={data.toUser}
        openMessage={() => { }}
      />
      {showModal()}
    </View>
  );
};

export default connector(SecondHouseDetail);

const styles = StyleSheet.create({
  banner: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(400)
  },
  swiper_dot: {
    width: UnitConvert.dpi(12),
    height: UnitConvert.dpi(12),
    borderRadius: UnitConvert.dpi(12),
    backgroundColor: '#fff',
    marginLeft: UnitConvert.dpi(10),
  },
  swiper_dot_active: {
    width: UnitConvert.dpi(12),
    height: UnitConvert.dpi(12),
    borderRadius: UnitConvert.dpi(12),
    backgroundColor: '#c81621',
    marginLeft: UnitConvert.dpi(10),
  },
  icon_style: {
    width: UnitConvert.dpi(60),
    height: UnitConvert.dpi(60)
  },
  calculator_box: {
    width: UnitConvert.w,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: UnitConvert.dpi(2),
    paddingBottom: UnitConvert.dpi(30),
    backgroundColor: '#fff'
  },
  calculator: {
    width: UnitConvert.dpi(660),
    height: UnitConvert.dpi(80),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff7e7',
    borderRadius: UnitConvert.dpi(4)
  },
  icon: {
    width: UnitConvert.dpi(60),
    height: UnitConvert.dpi(60)
  },
  calculator_text: {
    fontSize: UnitConvert.dpi(30),
    color: '#D5B063'
  },
  back: {
    position: 'absolute',
    top: 0
  },
  good: {
    position: 'absolute',
    top: 0,
    right: UnitConvert.dpi(90),
    width: UnitConvert.dpi(60),
    height: UnitConvert.dpi(60)
  },
  share: {
    position: 'absolute',
    top: 0,
    right: UnitConvert.dpi(20),
    width: UnitConvert.dpi(60),
    height: UnitConvert.dpi(60)
  },
});
