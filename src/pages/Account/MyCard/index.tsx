import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import { useNavigation } from '@react-navigation/native';
import { ENV_ICON } from '@/assets/styles/picUrl';
import { UnitConvert } from '@/utils/unitConvert';
import { Constant } from '@/utils/constant/Constant';
import { MyCardList } from '@/assets/data/MyCard';
import MyModalComfirm from '@/components/MyModalComfirm';
import MyToastShort from '@/components/MyToastShort';

interface MyCardProps { }

type listState = any[]

const MyCard = (props: MyCardProps) => {
  const navigation = useNavigation()
  const [list, setList] = useState<listState>([])
  const [fields, setFields] = useState({
    rowData: {},
    tipStatus: false
  })

  useEffect(() => {
    const res = MyCardList
    console.log('res', res)
    setList(res)
  }, [])

  // 展示号码
  const showCardNumber = (code: string) => {
    if (code) {
      if (code.length > 4) {
        return `****    ****    ****    ${code.substr(-4)}`
      } else {
        return code
      }
    } else {
      return code
    }
  }

  const showContent = () => {
    return (
      <View style={styles.content}>
        <ScrollView style={{ flex: 1 }}>
          {list.map(item => (
            <View style={styles.card} key={item.ID}>
              <Image source={ENV_ICON.bg_card} style={styles.card_icon} />
              <View style={styles.img_box}>
                <View style={styles.img_box_head}>
                  <Text style={styles.img_box_bank}>{item.BankName}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setFields({
                        rowData: item,
                        tipStatus: true
                      })
                    }}
                  >
                    <Image source={ENV_ICON.icon_del_white} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.img_box_text}></Text>
                <Text style={styles.img_box_number}>{showCardNumber(item.CardNumber)}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    )
  }

  // 按钮展示
  const showBtn = () => {
    return (
      <View style={styles.btn_box}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate('AddCard')
          }}
        >
          <Text style={styles.btn_text}>添加新银行卡</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={CommonStyle.container}>
      <DefaultNavigationHeader
        title='我的银行卡'
        showLeftIcon
        leftCallBack={() => {
          navigation.goBack()
        }}
      />
      {showContent()}
      {showBtn()}
      <MyModalComfirm
        isOpen={fields.tipStatus}
        okCallback={() => {
          setFields({
            ...fields,
            tipStatus: false
          })
          MyToastShort({ content: '删除成功' })
        }}
        cancelCallback={() => {
          setFields({
            ...fields,
            tipStatus: false
          })
          
        }}
      />
    </SafeAreaView>
  );
};

export default MyCard;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    backgroundColor: Constant.defaultBgColor
  },
  card: {
    marginBottom: UnitConvert.dpi(20),
    paddingHorizontal: UnitConvert.dpi(30),
    height: UnitConvert.dpi(340),
    position: 'relative'
  },
  card_icon: {
    width: UnitConvert.dpi(690),
    height: UnitConvert.dpi(340)
  },
  img_box: {
    position: 'absolute',
    top: 0,
    left: UnitConvert.dpi(30),
    width: UnitConvert.dpi(690),
    height: UnitConvert.dpi(340),
    paddingTop: UnitConvert.dpi(44),
    paddingLeft: UnitConvert.dpi(42),
    paddingRight: UnitConvert.dpi(20),
    zIndex: 2
  },
  img_box_head: {
    width: UnitConvert.dpi(640),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  img_box_bank: {
    fontSize: UnitConvert.dpi(36),
    color: '#42424e'
  },
  img_box_text: {
    fontSize: UnitConvert.dpi(26),
    color: '#42424e',
    marginBottom: UnitConvert.dpi(44)
  },
  img_box_number: {
    fontSize: UnitConvert.dpi(40),
    color: '#41414d'
  },
  btn_box: {
    height: UnitConvert.dpi(120),
    width: UnitConvert.dpi(690),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: UnitConvert.dpi(30),
  },
  btn: {
    width: UnitConvert.dpi(690),
    borderRadius: UnitConvert.dpi(4),
    backgroundColor: '#c71622',
    height: UnitConvert.dpi(80),
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn_text: {
    fontSize: UnitConvert.dpi(32),
    color: '#fff'
  },
  nodata: {
    height: UnitConvert.h - UnitConvert.dpi(300),
  },
});
