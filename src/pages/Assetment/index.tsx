import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface AssetmentProps {}

const Assetment = (props: AssetmentProps) => {
  return (
    <View style={styles.container}>
      <Text>Assetment</Text>
    </View>
  );
};

export default Assetment;

const styles = StyleSheet.create({
  container: {}
});
