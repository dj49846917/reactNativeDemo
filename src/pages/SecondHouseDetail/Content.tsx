import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { dicType } from '@/models/Recommend';
import { UnitConvert } from '@/utils/unitConvert';
import { parseMoney, filterDicName } from '@/utils/utils';

interface ContentProps {
  data: any
  dicArr: dicType[]
}

const Content = (props: ContentProps) => {
  const showTipComponent = () => {
    const code = filterDicName(props.dicArr, props.data.Renovation)
    if(!code) {
      return null
    } else if (code && code === '清水') {
      return (
        <View style={styles.info_red}>
          <Text style={styles.info_red_text}>{filterDicName(props.dicArr, props.data.Renovation)}</Text>
        </View>
      )
    } else if (code && code === '简装') {
      return (
        <View style={styles.info_blue}>
          <Text style={styles.info_red_text}>{filterDicName(props.dicArr, props.data.Renovation)}</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.info_green}>
          <Text style={styles.info_red_text}>{filterDicName(props.dicArr, props.data.Renovation)}</Text>
        </View>
      )
    }
  }

  return (
    <View style={styles.info_box}>
        <View>
          <Text style={styles.info_title}>{props.data.AssetIntroduce}</Text>
        </View>
        <View style={styles.info_mark}>
          {showTipComponent()}
        </View>
        <View style={styles.info_three}>
          <View style={styles.info_three_item}>
            <Text style={styles.info_three_item_title}>售价</Text>
            <Text style={styles.info_three_item_text}>{parseMoney(props.data.EntrustSellAgreementPrice, props.data.ProposalPrice)}</Text>
            <View style={styles.info_three_item_line}></View>
          </View>
          <View style={styles.info_three_item}>
            <Text style={styles.info_three_item_title}>房型</Text>
            <Text style={styles.info_three_item_text}>{props.data.HuXingTypeF}室{props.data.HuXingTypeT}厅</Text>
            <View style={styles.info_three_item_line}></View>
          </View>
          <View style={styles.info_three_item}>
            <Text style={styles.info_three_item_title}>建筑面积</Text>
            <Text style={styles.info_three_item_text}>{props.data.PropertyArea}㎡</Text>
          </View>
        </View>
      </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  info_box: {
    paddingLeft: UnitConvert.dpi(30),
    paddingTop: UnitConvert.dpi(36),
    paddingRight: UnitConvert.dpi(90),
    paddingBottom: UnitConvert.dpi(36),
    backgroundColor: '#fff',
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: UnitConvert.dpi(1),
  },
  info_title: {
    fontSize: UnitConvert.dpi(40),
    color: '#000'
  },
  info_mark: {
    flexDirection: 'row',
    marginTop: UnitConvert.dpi(34),
    marginBottom: UnitConvert.dpi(38)
  },
  info_red: {
    padding: UnitConvert.dpi(10),
    backgroundColor: '#c71623',
    borderRadius: UnitConvert.dpi(4)
  },
  info_blue: {
    padding: UnitConvert.dpi(10),
    backgroundColor: '#639BE7',
    borderRadius: UnitConvert.dpi(4)
  },
  info_green: {
    padding: UnitConvert.dpi(10),
    backgroundColor: '#288D65',
    borderRadius: UnitConvert.dpi(4)
  },
  info_red_text: {
    color: '#fff',
    fontSize: UnitConvert.dpi(26),
  },
  info_yellow: {
    padding: UnitConvert.dpi(10),
    backgroundColor: '#f7912c',
    marginLeft: UnitConvert.dpi(10),
    borderRadius: UnitConvert.dpi(4)
  },
  info_three: {
    width: UnitConvert.w,
    flexDirection: 'row',
  },
  info_three_item: {
    width: '33%',
    position: 'relative'
  },
  info_three_item_title: {
    color: '#999',
    fontSize: UnitConvert.dpi(26),
    marginBottom: UnitConvert.dpi(20),
  },
  info_three_item_text: {
    color: '#C71622',
    fontSize: UnitConvert.dpi(28),
  },
  info_three_item_line: {
    width: UnitConvert.dpi(2),
    height: UnitConvert.dpi(70),
    backgroundColor: '#f1f1f1',
    position: 'absolute',
    right: 20,
    top: 5
  }
});
