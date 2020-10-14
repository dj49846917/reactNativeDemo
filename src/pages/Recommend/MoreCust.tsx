import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CommonSelectListItem from '@/components/CommonSelectListItem';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux'
import { getSubTypeList } from '@/utils/utils';
import { UnitConvert } from '@/utils/unitConvert';
import { Constant } from '@/utils/constant/Constant';

function mapStateToProps(state: RootState) {
  console.log('state.recommend.key', state.recommend.key)
  return {
    dicArr: state.recommend.dicArr,
  }
}

const connector = connect(mapStateToProps)
type ModalState = ConnectedProps<typeof connector> // 定义connect的类型

interface MoreCustProps extends ModalState {

}

const MoreCust = (props: MoreCustProps) => {
  return (
    <View style={styles.content}>
      <CommonSelectListItem 
        title="产品类型"
        list={getSubTypeList(props.dicArr, 2002)}
      />
      <CommonSelectListItem 
        title="面积段"
        list={Constant.recommend_area_arr}
      />
      <CommonSelectListItem 
        title="户型"
        list={Constant.houseTypeArr}
      />
    </View>
  );
};

export default connector(MoreCust);

const styles = StyleSheet.create({
  content: {
    flex: 1,
  }
});
