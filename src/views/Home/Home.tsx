import {StyleSheet, View} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import AddCalories from '../../components/AddCalories';

const Home = () => {
  const {container} = styles;
  return (
    <View style={container}>
      <Header />
      <AddCalories />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
  },
});
