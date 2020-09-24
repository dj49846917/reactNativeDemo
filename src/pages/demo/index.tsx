import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface DemoProps {}

const Demo = (props: DemoProps) => {
  return (
    <View style={styles.container}>
      <Text>Demo</Text>
    </View>
  );
};

export default Demo;

const styles = StyleSheet.create({
  container: {}
});
