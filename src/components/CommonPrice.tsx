import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { UnitConvert } from '@/utils/unitConvert';
import MyTextInput from './MyTextInput';
import { selectItemPrice } from '@/utils/utils';

export type PriceType = {
  DicName?: string,
  DicCode?: number,
  MinPrice?: number,
  MaxPrice?: number,
  select?: boolean,
  id?: number
}

interface CommonPriceProps {
  dicArr: PriceType[],
  onSelect: Function
}

const CommonPrice = (props: CommonPriceProps) => {
  const [price, setPrice] = React.useState([])
  return (
    <View style={styles.type}>
      <Text style={styles.type_title}>价格区间 (万)</Text>
      <View style={styles.type_price_input}>
        <MyTextInput
          flelds="最低价格"
          getFieldsValue={(v: string) => { }}
          showLabel={false}
          placeholder='最低价格'
          keyboardType={'numeric'}
          width={UnitConvert.dpi(320)}
          height={UnitConvert.dpi(52)}
          labelWidth={0}
          inputStyle={{
            borderWidth: UnitConvert.dpi(2),
            borderColor: '#f1f1f1',
            color: '#000',
            fontSize: UnitConvert.dpi(26),
            borderRadius: UnitConvert.dpi(10)
          }}
        />
        <MyTextInput
          flelds="最高价格"
          getFieldsValue={(v: string) => { }}
          showLabel={false}
          placeholder='最高价格'
          keyboardType={'numeric'}
          width={UnitConvert.dpi(320)}
          height={UnitConvert.dpi(52)}
          labelWidth={0}
          inputStyle={{
            borderWidth: UnitConvert.dpi(2),
            borderColor: '#f1f1f1',
            color: '#000',
            fontSize: UnitConvert.dpi(26),
            borderRadius: UnitConvert.dpi(10)
          }}
        />
      </View>
      <View style={styles.type_item}>
        {props.dicArr.map((item: PriceType, index: number) => (
          <TouchableOpacity
            key={item.DicCode}
            onPress={() => {
              const res = selectItemPrice(props.dicArr, price, item, index)
              props.onSelect(res.originArr)
              console.log('res', res)
            }}
          >
            <Text style={item.select ? styles.type_item_text_active : styles.type_item_text}>{item.DicName}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CommonPrice;

const styles = StyleSheet.create({
  type: {
    width: UnitConvert.w,
    paddingTop: UnitConvert.dpi(42),
    paddingHorizontal: UnitConvert.dpi(32)
  },
  type_title: {
    fontSize: UnitConvert.dpi(30),
    color: '#000',
    marginBottom: UnitConvert.dpi(34),
  },
  type_price_input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: UnitConvert.dpi(30),
  },
  type_item: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  type_item_text: {
    fontSize: UnitConvert.dpi(26),
    width: UnitConvert.dpi(150),
    backgroundColor: '#f5f5f5',
    color: '#666',
    height: UnitConvert.dpi(44),
    lineHeight: UnitConvert.dpi(44),
    marginRight: UnitConvert.dpi(21),
    textAlign: 'center',
    marginBottom: UnitConvert.dpi(26),
    borderRadius: UnitConvert.dpi(4)
  },
  type_item_text_active: {
    fontSize: UnitConvert.dpi(26),
    width: UnitConvert.dpi(150),
    backgroundColor: '#ffeced',
    color: '#c71622',
    height: UnitConvert.dpi(44),
    lineHeight: UnitConvert.dpi(44),
    marginRight: UnitConvert.dpi(21),
    textAlign: 'center',
    marginBottom: UnitConvert.dpi(26),
    borderRadius: UnitConvert.dpi(4)
  },
});
