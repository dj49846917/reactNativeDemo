import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { UnitConvert } from '@/utils/unitConvert';
import { ENV_IMAGE } from '@/assets/styles/picUrl';
import CommonStyle from '@/utils/constant/Style';
import { filterDicName, parseMoney } from '@/utils/utils';
import { Constant } from '@/utils/constant/Constant';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface CommonSecondHouseListProps {
  list: Array<any>,
  comDic: Array<any>
}

// 渲染列表左侧图形的描述
const showTipText = (props: CommonSecondHouseListProps, item: any) => {
  const code = filterDicName(props.comDic, item.Renovation)
  if (!code) {
    return null
  } else if (code && code === '清水') {
    return (
      <Text style={[CommonStyle.list_tip_item, { backgroundColor: Constant.CommonColor.danger }]}>{code}</Text>
    )
  } else if (code && code === '简装') {
    return (
      <Text style={[CommonStyle.list_tip_item, { backgroundColor: Constant.CommonColor.primary }]}>{code}</Text>
    )
  } else {
    return (
      <Text style={[CommonStyle.list_tip_item, { backgroundColor: Constant.CommonColor.success }]}>{code}</Text>
    )
  }
}

const CommonSecondHouseList = (props: CommonSecondHouseListProps) => {
  return (
    <>
      {
        props.list.map(item => (
          <TouchableOpacity style={styles.list} key={item.ID} onPress={() => { }}>
            <ImageBackground source={item.PicUrl ? { uri: item.PicUrl } : ENV_IMAGE.left_img} style={CommonStyle.left_img}>
              {showTipText(props, item)}
            </ImageBackground>
            <View style={[CommonStyle.list_right]}>
              <Text style={CommonStyle.list_right_address} numberOfLines={1}>{item.AssetIntroduce}</Text>
              <View style={CommonStyle.list_right_startbox}>
                <Text style={CommonStyle.list_right_startbox_label}>{item.HuXingTypeF}室{item.HuXingTypeT}厅/{item.PropertyArea}㎡/{item.AssetName}</Text>
              </View>
              <View style={CommonStyle.list_right_startbox}>
                <Text style={[CommonStyle.list_right_startbox_text, { color: Constant.CommonColor.danger }]}>{parseMoney(item.EntrustSellAgreementPrice, item.ProposalPrice)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      }
    </>
  );
};

export default CommonSecondHouseList;

const styles = StyleSheet.create({
  list: {
    width: UnitConvert.w,
    paddingHorizontal: UnitConvert.dpi(30),
    height: UnitConvert.dpi(216),
    flexDirection: 'row',
    borderBottomColor: Constant.commonBorderColor,
    borderBottomWidth: UnitConvert.dpi(1),
    alignItems: 'center'
  }
});
