import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { UnitConvert } from '@/utils/unitConvert';
import { getImg } from '@/utils/utils';

interface CommonTalkProps {
  toData: any
  openMessage: Function
  pageType?: string | undefined
  assetData?: any
}

const CommonTalk = (props: CommonTalkProps) => {
  // 调取电话
  const gotoSericeTel = async () => {
    if(props.pageType && props.pageType==='asset'){
      Linking.openURL(`tel:${props.assetData.ServiceTelephone}`);
    } else {
      Linking.openURL(`tel:${props.toData.MobilePhone}`);
    }
  }

  return (
    <View style={styles.talk}>
      <Image source={getImg(props.toData.HeadPortrait)} style={styles.talk_icon} />
      <View style={styles.talk_user}>
        <Text style={styles.talk_user_text}>{props.toData.NickName}</Text>
        <Text style={styles.talk_user_text2}>荣投地产</Text>
      </View>
      <View style={styles.btn_box}>
        <TouchableOpacity style={styles.btn_item} onPress={() => {
          props.openMessage()
        }}>
          <Text style={styles.btn_item_text}>在线咨询</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn_item2} onPress={() => gotoSericeTel()}>
          <Text style={styles.btn_item_text}>电话咨询</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommonTalk;

const styles = StyleSheet.create({
  talk: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(150),
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: UnitConvert.dpi(30),
    borderTopColor: '#e1e1e1',
    borderTopWidth: UnitConvert.dpi(2),
    position: 'relative',
  },
  talk_icon: {
    width: UnitConvert.dpi(76),
    height: UnitConvert.dpi(76),
    borderRadius: UnitConvert.dpi(38),
  },
  talk_user: {
    marginLeft: UnitConvert.dpi(18),
    marginRight: UnitConvert.dpi(60),
  },
  talk_user_text: {
    fontSize: UnitConvert.dpi(28),
    color: '#000'
  },
  talk_user_text2: {
    backgroundColor: '#E7EEFC',
    fontSize: UnitConvert.dpi(18),
    color: '#8186BF',
    paddingVertical: UnitConvert.dpi(6),
    textAlign: 'center',
    marginTop: UnitConvert.dpi(9)
  },
  btn_box: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: UnitConvert.dpi(20),
    position: 'absolute',
    right: 0
  },
  btn_item: {
    width: UnitConvert.dpi(220),
    height: UnitConvert.dpi(78),
    marginRight: UnitConvert.dpi(10),
    fontSize: UnitConvert.dpi(48),
    backgroundColor: '#ffa74e',
    borderRadius: UnitConvert.dpi(10)
  },
  btn_item2: {
    width: UnitConvert.dpi(220),
    height: UnitConvert.dpi(78),
    marginRight: UnitConvert.dpi(10),
    fontSize: UnitConvert.dpi(48),
    backgroundColor: '#c71622',
    borderRadius: UnitConvert.dpi(10)
  },
  btn_item_text: {
    color: '#fff',
    textAlign: 'center',
    lineHeight: UnitConvert.dpi(78),
    fontSize: UnitConvert.dpi(32)
  }
});
