import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface AgentInfoProps {}

const AgentInfo = (props: AgentInfoProps) => {
  return (
    <View style={styles.container}>
      <Text>AgentInfo</Text>
    </View>
  );
};

export default AgentInfo;

const styles = StyleSheet.create({
  container: {}
});
