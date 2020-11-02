import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

interface WebViewComponentProps { }

const ArticleUrl = "https://mp.weixin.qq.com/s/rn4tWQLPU1J7_zPQaD_FnQ"

const WebViewComponent = (props: WebViewComponentProps) => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={CommonStyle.container}>
      <DefaultNavigationHeader
        title='WebView'
        showLeftIcon
        navigation={navigation}
      />
      <WebView
        style={{ flex: 1 }}
        source={{ uri: ArticleUrl }}
        scalesPageToFit={true}
      />
    </SafeAreaView>
  );
};

export default WebViewComponent;

const styles = StyleSheet.create({
  container: {}
});
