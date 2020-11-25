import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { dicType } from '@/models/Recommend';
import { UnitConvert } from '@/utils/unitConvert';
import { filterDicName } from '@/utils/utils';

interface DetailFormProps {
  data: any
  dicArr: dicType[]
}

// 计算单价
const parseUnit = (sum: any, secondSum: any, area: any) => {
  if (sum) {
    // @ts-ignore
    return parseInt(Number(sum) / Number(area))
  } else {
    // @ts-ignore
    return parseInt(Number(secondSum) / Number(area))
  }
}

const DetailForm = (props: DetailFormProps) => {
  return (
    <View style={styles.detail_box}>
      <View style={styles.detail_row}>
        <View style={styles.detail_item}>
          <Text style={styles.detail_item_title}>单价:</Text>
          <Text style={styles.detail_item_text}>{parseUnit(props.data.EntrustSellAgreementPrice, props.data.ProposalPrice, props.data.PropertyArea)}元/平</Text>
        </View>
        <View style={styles.detail_item}>
          <Text style={styles.detail_item_title}>单价类型:</Text>
          <Text style={styles.detail_item_text}>建面单价</Text>
        </View>
      </View>
      <View style={styles.detail_row}>
        <View style={styles.detail_item}>
          <Text style={styles.detail_item_title}>楼层:</Text>
          <Text style={styles.detail_item_text}>{filterDicName(props.dicArr, props.data.FloorType)}(共{props.data.MainFloor}层)</Text>
        </View>
        <View style={styles.detail_item}>
          <Text style={styles.detail_item_title}>区域:</Text>
          <Text style={styles.detail_item_text}>{filterDicName(props.dicArr, props.data.RegionId)}</Text>
        </View>
      </View>
      <View style={styles.detail_row}>
        <View style={styles.detail_item}>
          <Text style={styles.detail_item_title}>朝向:</Text>
          <Text style={styles.detail_item_text}>{filterDicName(props.dicArr, props.data.Orientations)}</Text>
        </View>
        <View style={styles.detail_item}>
          <Text style={styles.detail_item_title}>电梯:</Text>
          <Text style={styles.detail_item_text}>{filterDicName(props.dicArr, props.data.IsElevator)}</Text>
        </View>

      </View>
      <View style={styles.detail_row}>
        <View style={styles.detail_item}>
          <Text style={styles.detail_item_title}>装修:</Text>
          <Text style={styles.detail_item_text}>{filterDicName(props.dicArr, props.data.Renovation)}</Text>
        </View>
        <View style={styles.detail_item}>
          <Text style={styles.detail_item_title}>年代:</Text>
          <Text style={styles.detail_item_text}>{props.data.Years}</Text>
        </View>
      </View>
      <View style={styles.detail_row}>
        <View style={styles.detail_item}>
          <Text style={styles.detail_item_title}>用途:</Text>
          <Text style={styles.detail_item_text}>{filterDicName(props.dicArr, props.data.PropertyPurpose)}</Text>
        </View>
      </View>
      <View style={styles.detail_row}>
        <View style={styles.detail_item2}>
          <Text style={styles.detail_item_title}>小区:</Text>
          <Text style={styles.detail_item_text}>{props.data.AssetName}</Text>
        </View>
      </View>
    </View>
  );
};

export default DetailForm;

const styles = StyleSheet.create({
  detail_box: {
    width: UnitConvert.w,
    backgroundColor: '#fff',
    paddingLeft: UnitConvert.dpi(30),
    paddingTop: UnitConvert.dpi(40)
  },
  detail_row: {
    flexDirection: 'row',
    marginBottom: UnitConvert.dpi(28),
  },
  detail_item: {
    flexDirection: 'row',
    width: UnitConvert.w / 2
  },
  detail_item2: {
    flexDirection: 'row'
  },
  detail_item_title: {
    fontSize: UnitConvert.dpi(28),
    color: '#999'
  },
  detail_item_text: {
    fontSize: UnitConvert.dpi(28),
    color: '#000',
    marginLeft: UnitConvert.dpi(20),
  }
});
