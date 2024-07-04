import {StyleSheet, View} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import {Text} from '@rneui/base';
import {Button, Icon, Input} from '@rneui/themed';

const AddFood = () => {
  const {
    container,
    addFoodContainer,
    titleContainer,
    addFoodBtnContainer,
    addFoodTitle,
    searchContainer,
    inputContainer,
    searchButton,
  } = styles;
  return (
    <View style={container}>
      <Header />
      <View style={addFoodContainer}>
        <View style={titleContainer}>
          <Text style={addFoodTitle}>Add Food</Text>
        </View>
        <View style={addFoodBtnContainer}>
          <Button
            icon={<Icon name="add-circle-outline" color="#fff" />}
            radius="lg"
            color="#4ecb71"
          />
        </View>
      </View>
      <View style={searchContainer}>
        <View style={inputContainer}>
          <Input placeholder="apples, pie, soda ..." />
        </View>
        <Button title="Search" radius="lg" color="#ade8af" titleStyle={searchButton} />
      </View>
    </View>
  );
};

export default AddFood;

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  addFoodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  titleContainer: {
    flex: 1,
  },
  addFoodBtnContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  addFoodTitle: {
    fontSize: 20,
  },
  searchContainer: {
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 1,
    marginLeft: -12,
  },
  searchButton: {
    color: '#000',
    fontSize: 14,
  },
});
