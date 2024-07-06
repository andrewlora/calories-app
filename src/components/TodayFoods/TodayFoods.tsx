import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Food, TodayFoodsProps} from '../../types';
import FoodItem from '../FoodItem';

const TodayFoods: FC<TodayFoodsProps> = ({foods}) => {
  const {container, title} = styles;
  return (
    <View style={container}>
      <Text style={title}>Foods</Text>
      <ScrollView contentContainerStyle={styles.content}>
        {foods?.map((food: Food, index) => (
          <FoodItem key={index} {...food} />
        ))}
      </ScrollView>
    </View>
  );
};

export default TodayFoods;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
  title: {
    fontSize: 16,
  },
  content: {
    marginVertical: 16,
  },
});
