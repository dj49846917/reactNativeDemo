'use strict';
import {
  Platform,
  Dimensions,
} from 'react-native';
import Toast from 'react-native-root-toast';
import { UnitConvert } from './unitConvert';
const { width } = Dimensions.get('window')
let toast: undefined;

export const ErrorNotice = (content: string) => {
  if (toast !== undefined) {
    Toast.hide(toast);
  }
  toast = Toast.show(content.toString(), {
    duration: Toast.durations.SHORT,
    position: Toast.positions.TOP,
    shadow: false,
    animation: true,
    hideOnPress: true,
    delay: 0,
    containerStyle: {
      marginTop: Platform.OS == 'android' ? 4 : 24,
      width: width,
      backgroundColor: '#fea827', 
      height: UnitConvert.dpi(50),
      padding: 0,
      borderRadius: 0,
      justifyContent: 'center'
    },
    textStyle: {
      fontSize: UnitConvert.dpi(24)
    },
  });
};

