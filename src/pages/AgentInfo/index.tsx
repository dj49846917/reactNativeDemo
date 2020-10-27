import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Nav from './Nav';
import Tab from './Tab';
import TabPane from './TabPane';
import Modal from 'react-native-modalbox';
import CommonStyle from '@/utils/constant/Style';
import { Constant } from '@/utils/constant/Constant';

interface AgentInfoProps { }

const AgentInfo = (props: AgentInfoProps) => {
  const [visible, setVisible] = React.useState(false)
  const [tab, setTab] = React.useState({
    tabType: '1',
  })

  const showModal = () => {
    return (
      <Modal
        isOpen={visible}
        style={CommonStyle.modalContainer}
        isDisabled={false}
        swipeToClose={false}
        backButtonClose={false}
        backdropPressToClose={true}
        position={"bottom"}
        onClosed={() => { setVisible(false) }}
      >
        <View style={CommonStyle.modal_icon_box}>
          {Constant.secondShareIconTab.map(item => (
            <TouchableOpacity key={item.id} style={CommonStyle.modal_icon_item} onPress={() => { }}>
              <Image source={item.icon} style={CommonStyle.modal_icon} />
              <Text style={CommonStyle.modal_icon_text}>{item.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={CommonStyle.modal_close_box} onPress={() => setVisible(false)}>
          <Text style={CommonStyle.modal_close_text}>取消</Text>
        </TouchableOpacity>
      </Modal>
    )
  }

  return (
    <View style={styles.container}>
      <Nav
        handleOpenModel={() => {
          setVisible(true)
        }}
      />
      <Tab
        tabType={tab.tabType}
        tabCallBack={(v: string) => {
          setTab({
            tabType: v
          })
        }}
      />
      <TabPane tabType={tab.tabType} />
      {showModal()}
    </View>
  );
};

export default AgentInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
