import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import MyModalComfirm from '@/components/MyModalComfirm';
import MyToastShort from '@/components/MyToastShort';
import CommonStyle from '@/utils/constant/Style';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

interface ModalComfirmProps { }

const ModalComfirm = (props: ModalComfirmProps) => {
  const navigation = useNavigation()
  const [visible, setVisible] = useState(false)

  return (
    <>
      <SafeAreaView style={CommonStyle.container}>
        <DefaultNavigationHeader
          title='对话框'
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
            <Text style={CommonStyle.list_item_text}>打开弹窗</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <MyModalComfirm
        isOpen={visible}
        okCallback={() => {
          setVisible(false)
          MyToastShort({ content: '删除成功' })
        }}
        cancelCallback={() => {
          setVisible(false)
        }}
      />
    </>
  );
};

export default ModalComfirm;

const styles = StyleSheet.create({
  container: {}
});
