import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Button, Icon} from '@rneui/themed';
import {Food} from '../../types';
import useFoodStorage from '../../hooks/useFoodStorage';

const FoodItem: FC<Food> = ({calories, portion, name}) => {
  const {saveTodayFood} = useFoodStorage();

  const handleAddItemPress = () => {
    try {
      saveTodayFood({calories, portion, name});
      Alert.alert('Food added successfully');
    } catch (error) {
      console.error(error);
      Alert.alert('Error adding Food');
    }
  };

  const {
    container,
    leftContainer,
    rightContainer,
    nameStyle,
    portionStyle,
    caloriesStyle,
    buttonStyle,
  } = styles;
  return (
    <View style={container}>
      <View style={leftContainer}>
        <Text style={nameStyle}>{name}</Text>
        <Text style={portionStyle}>{portion}</Text>
      </View>
      <View style={rightContainer}>
        <Button
          icon={<Icon name="add-circle-outline" />}
          type="clear"
          style={buttonStyle}
          onPress={handleAddItemPress}
        />
        <Text style={caloriesStyle}>{calories} cal</Text>
      </View>
    </View>
  );
};

export default FoodItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ade8af',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  nameStyle: {
    fontSize: 18,
    fontWeight: '500',
  },
  portionStyle: {
    fontSize: 13,
    color: '#808080',
    fontWeight: '500',
  },
  caloriesStyle: {
    fontSize: 18,
    fontWeight: '500',
  },
  buttonStyle: {
    marginBottom: -8,
  },
});
