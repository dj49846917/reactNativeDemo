import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import { CommonActions, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';

interface ResetRouterProps { }

const ResetRouter = (props: ResetRouterProps) => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <DefaultNavigationHeader 
        title='重置路由'
        showLeftIcon
        leftCallBack={()=>{
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                { name: 'Template' },
              ],
            })
          )
        }}
      />
      <Text>重置路由</Text>
    </SafeAreaView>
  );
};

export default ResetRouter;

const styles = StyleSheet.create({
  container: {}
});
