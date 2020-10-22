import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Nav from './Nav';
import Tab from './Tab';
import TabPane from './TabPane';

interface AgentInfoProps { }

const AgentInfo = (props: AgentInfoProps) => {
  const [tab, setTab] = React.useState({
    tabType: '1',
  })

  return (
    <View style={styles.container}>
      <Nav />
      <Tab
        tabType={tab.tabType}
        tabCallBack={(v: string) => {
          setTab({
            tabType: v
          })
        }}
      />
      <TabPane tabType={tab.tabType} />
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
