import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface SearchProps { }

const Search = (props: SearchProps) => {
  return (
    <View style={styles.home_search}>
      <Text>Search</Text>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  home_search: {}
});
