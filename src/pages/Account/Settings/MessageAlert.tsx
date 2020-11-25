import React, { useState, useCallback } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableHighlight, Image } from 'react-native';
import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import { useNavigation } from '@react-navigation/native';
import CommonStyle from '@/utils/constant/Style';
import { ENV_ICON } from '@/assets/styles/picUrl';
import { Constant } from '@/utils/constant/Constant';
import { UnitConvert } from '@/utils/unitConvert';

interface MessageAlertProps { }

const MessageAlert = (props: MessageAlertProps) => {
  const navigation = useNavigation()

  const [fields, setFields] = useState({
    sysMessage: Constant.YES, // 接收系统消息
    loanMessage: Constant.YES, // 接收贷款相关信息
  })
  
  // 切换选项卡
  const sliderValueChange = useCallback((key: string, value: number)=>{
    if (key == 'sys') {
      setFields({
        ...fields,
        sysMessage: value 
      });
    } else {
      setFields({
        ...fields,
        loanMessage: value 
      });
    }
  }, [fields.loanMessage, fields.sysMessage])

  // 主体内容
  const showContent = () => {
    return (
      <View style={styles.tip_box}>
        <View style={styles.tip_item}>
          <View style={styles.tip_left}>
            <Text style={styles.tip_left_title} numberOfLines={1}>接收系统消息</Text>
            <Text style={styles.tip_left_text} numberOfLines={1}>关闭系统消息之后将不再提示系统消息</Text>
          </View>
          <TouchableHighlight
            underlayColor='transparent'
            onPress={() => sliderValueChange('sys', fields.sysMessage == Constant.YES ? Constant.NO : Constant.YES)}
          >
            <Image source={fields.sysMessage == Constant.YES ? ENV_ICON.icon_btn_on : ENV_ICON.icon_btn_off} />
          </TouchableHighlight>
        </View>
        <View style={styles.tip_item}>
          <View style={styles.tip_left}>
            <Text style={styles.tip_left_title} numberOfLines={1}>接收贷款相关消息</Text>
            <Text style={styles.tip_left_text} numberOfLines={1}>关闭贷款消息之后将不再提示系统消息</Text>
          </View>
          <TouchableHighlight
            underlayColor='transparent'
            onPress={() => {
              sliderValueChange('loan', fields.loanMessage == Constant.YES ? Constant.NO : Constant.YES)
            }}
          >
            <Image source={fields.loanMessage == Constant.YES ? ENV_ICON.icon_btn_on : ENV_ICON.icon_btn_off} />
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={CommonStyle.container}>
      <DefaultNavigationHeader
        title='消息提醒'
        showLeftIcon
        navigation={navigation}
      />
      <View style={CommonStyle.sizedBox}></View>
      {showContent()}
    </SafeAreaView>
  );
};

export default MessageAlert;

const styles = StyleSheet.create({
  tip: {
    flex: 1,
    backgroundColor: '#fff'
  },
  tip_box: {
    width: UnitConvert.w,
    backgroundColor: '#fff',
    marginTop: UnitConvert.dpi(20),
    paddingHorizontal: UnitConvert.dpi(30)
  },
  tip_item: {
    height: UnitConvert.dpi(120),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: UnitConvert.dpi(2),
    borderBottomColor: '#f1f1f1'
  },
  tip_left: {
    width: UnitConvert.w * 0.7,
    justifyContent: 'space-between'
  },
  tip_left_title: {
    fontSize: UnitConvert.dpi(30),
    color: '#000',
    marginBottom: UnitConvert.dpi(15)
  },
  tip_left_text: {
    fontSize: UnitConvert.dpi(26),
    color: '#666'
  }
});
