import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { UnitConvert } from '@/utils/unitConvert';
import MyTextInput from './MyTextInput';
import { selectItemPrice } from '@/utils/utils';
import CommonStyle from '@/utils/constant/Style';

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
    <View style={CommonStyle.type}>
      <Text style={CommonStyle.type_title}>价格区间 (万)</Text>
      <View style={CommonStyle.sec_price_input}>
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
      <View style={CommonStyle.type_item}>
        {props.dicArr.map((item: PriceType, index: number) => (
          <TouchableOpacity
            key={item.DicCode}
            onPress={() => {
              const res = selectItemPrice(props.dicArr, price, item, index)
              props.onSelect(res.originArr, res.parseArr)
            }}
          >
            <Text style={item.select ? CommonStyle.type_item_text_active : CommonStyle.type_item_text}>{item.DicName}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CommonPrice;

const styles = StyleSheet.create({
});
