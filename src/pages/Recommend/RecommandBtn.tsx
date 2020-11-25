import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { UnitConvert } from '@/utils/unitConvert';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ENV_ICON } from '@/assets/styles/picUrl';

interface RecommandBtnProps {
  save: Function                                              // 点击保存
  tipCallback: Function                                       // 点击文字的回调
  tipTitle: string                                            // 提示的文字
}

const RecommandBtn = (props: RecommandBtnProps) => {
  const [ tipStatus, setTipStatus ] = React.useState(false)

  return (
    <View style={styles.command}>
      <TouchableOpacity
        style={styles.command_btn}
        onPress={() => { props.save(tipStatus) }}
      >
        <Text style={styles.command_btn_text}>马上推荐</Text>
      </TouchableOpacity>
      <View style={styles.command_tip}>
        <TouchableOpacity style={styles.command_tip1} onPress={() => setTipStatus(!tipStatus)}>
          <Image source={tipStatus ? ENV_ICON.select : ENV_ICON.select_no} />
          <Text style={styles.command_tip_text}>我已知悉</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.tipCallback()
          }}
        >
          <Text style={styles.command_tip_red}>{props.tipTitle}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecommandBtn;

const styles = StyleSheet.create({
  command: {
    width: UnitConvert.dpi(690),
    paddingHorizontal: UnitConvert.dpi(30),
    paddingTop: UnitConvert.dpi(30),
    marginBottom: UnitConvert.dpi(120)
  },
  command_btn: {
    width: UnitConvert.dpi(690),
    height: UnitConvert.dpi(80),
    backgroundColor: '#c71623',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: UnitConvert.dpi(6)
  },
  command_btn_text: {
    color: '#fff',
    fontSize: UnitConvert.dpi(34)
  },
  command_tip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: UnitConvert.dpi(-20)
  },
  command_tip1: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  command_tip_red: {
    color: '#c71623'
  },
  command_tip_text: {
    color: '#999'
  }
});
