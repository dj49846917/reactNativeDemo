import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { UnitConvert } from '@/utils/unitConvert';
import { Constant } from '@/utils/constant/Constant';
import { ENV_IMAGE } from '@/assets/styles/picUrl';
import { getStatusColor, filterDicName, parseMoney } from '@/utils/utils';
import CommonStyle from '@/utils/constant/Style';
import { useNavigation } from '@react-navigation/native';

interface CommonAssetAuctionProps {
  list: Array<any>,
  comDic: Array<any>
}

const CommonAssetAuction = (props: CommonAssetAuctionProps) => {
  const navigation = useNavigation()
  return (
    <>
      {
        props.list.map(item => (
          (
            <TouchableOpacity 
              style={styles.list} 
              key={item.ID}
              onPress={()=>{
                navigation.navigate('AssetAuctionDetail', item)
              }}
            >
              <Image source={ENV_IMAGE.left_img} style={CommonStyle.left_img} />
              <View style={CommonStyle.list_right}>
                <Text style={CommonStyle.list_right_address} numberOfLines={1}>{item.Address}</Text>
                <View style={CommonStyle.list_right_startbox}>
                  <Text style={CommonStyle.list_right_startbox_label}>起拍价：</Text>
                  <Text style={[CommonStyle.list_right_startbox_text, { color: getStatusColor(item, item.AuctionPrice) }]}>{parseMoney(item.AuctionPrice)}</Text>
                </View>
                <View style={CommonStyle.list_right_startbox}>
                  <Text style={CommonStyle.list_right_startbox_label}>{`建筑面积：${item.StructureArea}`}</Text>
                </View>
                <View style={styles.list_right_tip}>
                  <View style={[styles.list_right_tip_bg, { backgroundColor: getStatusColor(item, item.Status) }]}>
                    <Text style={styles.list_right_tip_label} >{filterDicName(props.comDic, item.Status)}</Text>
                  </View>
                  <Text style={styles.list_right_tip_time}>{getStatusColor(item, item.SaleStartTime)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        ))
      }
    </>
  )

};

export default CommonAssetAuction;

const styles = StyleSheet.create({
  list: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(230),
    paddingHorizontal: UnitConvert.dpi(30),
    borderBottomColor: Constant.commonBorderColor,
    borderBottomWidth: UnitConvert.dpi(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  list_img: {
    width: UnitConvert.dpi(226),
    height: UnitConvert.dpi(170)
  },
  list_right_tip: {
    width: UnitConvert.dpi(334),
    paddingRight: UnitConvert.dpi(20),
    flexDirection: 'row',
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: UnitConvert.dpi(10)
  },
  list_right_tip_bg: {
    paddingVertical: UnitConvert.dpi(6),
    paddingLeft: UnitConvert.dpi(6),
    paddingRight: UnitConvert.dpi(20),
    borderTopRightRadius: UnitConvert.dpi(20),
    borderBottomRightRadius: UnitConvert.dpi(20)
  },
  list_right_tip_label: {
    fontSize: UnitConvert.dpi(24),
    color: '#fff'
  },
  list_right_tip_time: {
    color: '#000',
    fontSize: UnitConvert.dpi(22)
  }
});
