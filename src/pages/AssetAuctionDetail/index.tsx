import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ENV_ICON } from '@/assets/styles/picUrl';
import { WebView } from 'react-native-webview';
import { AssetAutionDetailData } from '@/assets/data/AssetAuctionDetail';
import { UnitConvert } from '@/utils/unitConvert';
import { htmlDecodeByRegExp } from '@/utils/utils';

interface AssetAuctionDetailProps { }

type Istate = {
  data: any
}

const AssetAuctionDetail = (props: AssetAuctionDetailProps) => {
  const navigation = useNavigation()
  const route = useRoute<any>()
  const [ fields, setFields ] = React.useState<Istate>({
    data: {}
  })

  React.useEffect(()=>{
    const res = AssetAutionDetailData
    setFields({
      data: res
    })
  }, [])

    // 渲染html
    const getHtml = () => {
      if (JSON.stringify(fields.data) !== '{}') {
        return htmlDecodeByRegExp(fields.data.Detail);
      }
    }

  // 展示主体内容
  const showContent = () => {
    const item = route.params
    if (Number(item.IsLink) === 1) { // 跳转第三方平台
      return (
        <WebView
          style={{ flex: 1 }}
          source={{ uri: fields.data.ArticleUrl }}
          scalesPageToFit={true}
        />
      )
    } else { // 不跳转第三方
      return (
        <View style={{ flex: 1 }}>
          <WebView
            style={{ flex: 1, width: UnitConvert.w }}
            // @ts-ignore
            source={{ html: getHtml() }}
            injectedJavaScript={
              `
                const meta = document.createElement('meta');
                meta.setAttribute('content', 'initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width');
                meta.setAttribute('name', 'viewport');
                document.getElementsByTagName('head')[0].appendChild(meta);`+ `var objs = document.getElementsByTagName('img');for(var i=0;i<objs.length;i++){var img = objs[i];img.style.width = '100%';}
              
                //   function getInit(){
                //     const meta = document.createElement('meta');
                // meta.setAttribute('content', 'initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width');
                // meta.setAttribute('name', 'viewport');
                // document.getElementsByTagName('head')[0].appendChild(meta);`+ `var objs = document.getElementsByTagName('img');for(var i=0;i<objs.length;i++){var img = objs[i];img.style.width = '100%';}
              
                //     }

                //   window.addEventListener('abcd', getInit())
                `

            }
          />
        </View>
      )
    }
  }

  return (
    <SafeAreaView style={CommonStyle.container}>
      <DefaultNavigationHeader
        title='拍卖详情'
        showLeftIcon
        showRightFirstIcon
        showRightSecondIcon
        rightFirstIconSource={ENV_ICON.icon_footer_collect}
        rightSecondIconSource={ENV_ICON.icon_top_share_black}
        leftCallBack={() => {
          navigation.goBack()
        }}
        rightFirstCallBack={() => { }}
        rightSecondCallBack={() => { }}
      />
      {showContent()}
    </SafeAreaView>
  );
};

export default AssetAuctionDetail;

const styles = StyleSheet.create({
  container: {}
});
