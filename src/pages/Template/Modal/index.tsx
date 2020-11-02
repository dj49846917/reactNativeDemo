import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import CommonStyle from '@/utils/constant/Style';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

interface ModalProps { }

const Modal = (props: ModalProps) => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={CommonStyle.container}>
      <DefaultNavigationHeader
        title='Modal弹窗'
        showLeftIcon
        navigation={navigation}
      />
      <View style={CommonStyle.list}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ModalSelect')
          }}
          style={CommonStyle.list_item}
        >
          <Text style={CommonStyle.list_item_text}>下拉选择</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Modal;

const styles = StyleSheet.create({
  container: {}
});
