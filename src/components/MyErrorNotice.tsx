import { StyleSheet } from 'react-native';
import {
  Platform,
  Dimensions
} from 'react-native';
import Toast, { ToastOptions } from 'react-native-root-toast';
const { width, height } = Dimensions.get('window')

let toast: undefined;

interface Iprops {
  content: string                         // 错误提示的内容
}

type MyErrorNoticeProps = ToastOptions & Iprops

const MyErrorNotice = (props: MyErrorNoticeProps) => {
  if (toast !== undefined) {
    Toast.hide(toast);
  }

  toast = Toast.show(props.content, {
    ...props,
    duration: Toast.durations.SHORT,
    position: Toast.positions.TOP,
    shadow: false,
    animation: true,
    hideOnPress: true,
    delay: 0,
    textStyle: { fontSize: 30 / 750 * width },
    containerStyle: {
      marginTop: Platform.OS == 'android' ? 4 : 24,
      width: width,
      backgroundColor: '#fea827', height: 70 / 750 * width,
      padding: 0,
      borderRadius: 0,
      justifyContent: 'center'
    }
  });
};

export default MyErrorNotice;

const styles = StyleSheet.create({
  container: {}
});
