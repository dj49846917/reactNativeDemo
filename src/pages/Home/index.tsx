import React, { useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import Search from '@/pages/Home/Search';

interface HomeProps {

}

const Home = (props: HomeProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Search />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
