import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';

interface RecommendProps {}

const Recommend = (props: RecommendProps) => {
  return (
    <SafeAreaView style={CommonStyle.container}>
      <DefaultNavigationHeader 
        title='推荐'
      />
    </SafeAreaView>
  );
};

export default Recommend;

const styles = StyleSheet.create({
});
