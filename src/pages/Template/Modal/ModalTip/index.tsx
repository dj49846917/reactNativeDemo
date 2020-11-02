import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import MyModalTip from '@/components/MyModalTip';
import CommonStyle from '@/utils/constant/Style';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

interface ModalTipProps { }

const ModalTip = (props: ModalTipProps) => {
  const navigation = useNavigation()
  const [visible, setVisible] = useState(false)

  return (
    <>
      <SafeAreaView style={CommonStyle.container}>
        <DefaultNavigationHeader
          title='提示框'
          showLeftIcon
          navigation={navigation}
        />
        <View style={CommonStyle.list}>
          <TouchableOpacity
            onPress={() => {
              setVisible(true)
            }}
            style={CommonStyle.list_item}
          >
            <Text style={CommonStyle.list_item_text}>打开提示框</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <MyModalTip
        visible={visible}
        title='提示'
        content='123456'
        callback={() => {
          setVisible(false)
        }}
      />
    </>
  );
};

export default ModalTip;

const styles = StyleSheet.create({
  container: {}
});
