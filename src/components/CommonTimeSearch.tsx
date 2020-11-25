import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import MyDropdownList from '@/components/MyDropdownList';
import moment from 'moment';
import { UnitConvert } from '@/utils/unitConvert';

interface CommonTimeSearchProps {
  startTimeCallBack: Function                               // 点击开始日期按钮的回调
  defaultStartTime: string                                  // 开始时间初始值
  defaultEndTime: string                                    // 结束时间初始值
  endTimeCallBack: Function                                 // 点击结束日期按钮的回调
  title: string                                             // 标题
}

const CommonTimeSearch = (props: CommonTimeSearchProps) => {
  return (
    <View style={CommonStyle.type}>
      <Text style={CommonStyle.type_title}>{props.title}</Text>
      <View style={CommonStyle.sec_price_input}>
        <MyDropdownList
          showLabel={false}
          flelds='开始时间'
          placeHolder='开始时间'
          defaultValue={props.defaultStartTime}
          callBack={() => props.startTimeCallBack()}
          width={UnitConvert.dpi(320)}
          height={UnitConvert.dpi(52)}
          boxStyle={{
            borderColor: '#f1f1f1', borderWidth: UnitConvert.dpi(4)
          }}
          selectStyle={{
            flexDirection: 'row',
            justifyContent: 'center'
          }}
          labelWidth={0}
          showSelectIcon={false}
        />
        <MyDropdownList
          showLabel={false}
          flelds='结束时间'
          placeHolder='结束时间'
          defaultValue={props.defaultEndTime}
          callBack={() => props.endTimeCallBack()}
          width={UnitConvert.dpi(320)}
          height={UnitConvert.dpi(52)}
          boxStyle={{
            borderColor: '#f1f1f1', borderWidth: UnitConvert.dpi(4)
          }}
          selectStyle={{
            flexDirection: 'row',
            justifyContent: 'center'
          }}
          labelWidth={0}
          showSelectIcon={false}
        />
      </View>
    </View>
  );
};

CommonTimeSearch.defaultProps = {
  defaultStartTime: moment(new Date()).format('YYYY-MM-DD'),
  defaultEndTime: moment(new Date()).format('YYYY-MM-DD'),
}

export default CommonTimeSearch;

const styles = StyleSheet.create({
});
