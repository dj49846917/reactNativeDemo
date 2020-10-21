// import React, { Component } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import PropTypes from 'prop-types';
// import styles from './tabStyle'

// export default class CommonDic extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     };
//   }

//   static propTypes = {
//     data: PropTypes.array,
//     title: PropTypes.string,
//     boxStyle: PropTypes.object,
//     chooseItem: PropTypes.func
//   }
//   static defaultProps = {
//     data: [],
//     boxStyle: null,
//     chooseItem: () => { }
//   }

//   render() {
//     const { data, boxStyle, title } = this.props
//     return (
//       <View style={boxStyle}>
//         <Text style={styles.type_title}>{title}</Text>
//         <View style={styles.type_item}>
//           {data && data.map((item, index) => (
//             <TouchableOpacity onPress={() => this.props.chooseItem(item, index)} key={item.DicCode}>
//               <Text numberOfLines={1} style={item.select ? styles.type_item_text_active : styles.type_item_text}>{item.DicName}</Text>
//             </TouchableOpacity>
//           ))}
//           {/* <Text style={styles.type_item_text_active}>三室</Text> */}
//         </View>
//       </View>
//     );
//   }
// }

import * as React from 'react';
import { Text, View, StyleSheet, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import { UnitConvert } from '@/utils/unitConvert';
import { commonDicState } from '@/pages/AssetAuction';
import CommonStyle from '@/utils/constant/Style';

interface CommonCheckboxDicProps {
  boxStyle?: StyleProp<ViewStyle>                   // 盒子的样式
  title: string                                     // 标题
  chooseItem: Function                              // 选中
  list: commonDicState[]                            // 数据源
}

const CommonCheckboxDic = (props: CommonCheckboxDicProps) => {
  return (
      <View style={props.boxStyle}>
        <Text style={CommonStyle.type_title}>{props.title}</Text>
        <View style={CommonStyle.type_item}>
          {props.list && props.list.map((item, index) => (
            <TouchableOpacity onPress={() => props.chooseItem(item, index)} key={item.DicCode}>
              <Text numberOfLines={1} style={item.select ? CommonStyle.type_item_text_active : CommonStyle.type_item_text}>{item.DicName}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
  );
};

CommonCheckboxDic.defaultProps = {
  chooseItem: ()=>{},
  boxStyle: CommonStyle.type
}

export default CommonCheckboxDic;

const styles = StyleSheet.create({
});

