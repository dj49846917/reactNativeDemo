import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import CommonStyle from '@/utils/constant/Style';
import { UnitConvert } from '@/utils/unitConvert';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modalbox'

interface ModalBoxProps { }

const ModalBox = (props: ModalBoxProps) => {
  const navigation = useNavigation()
  const [visible, setVisible] = useState(false)

  return (
    <>
      <View style={CommonStyle.container}>
        <DefaultNavigationHeader
          title='普通弹窗'
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
      </View>
      <Modal
        isOpen={visible}
        style={{ 
          height: UnitConvert.dpi(300), 
          width: UnitConvert.dpi(400) 
        }}
        onClosed={() => {
          setVisible(false)
        }}
      >
        <Text>2222</Text>
      </Modal>
    </>
  );
};

export default ModalBox;

const styles = StyleSheet.create({
  container: {}
});
