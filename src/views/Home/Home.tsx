import {StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import Header from '../../components/Header';
import AddCalories from '../../components/AddCalories';
import {useFocusEffect} from '@react-navigation/native';
import {Food, TodayCaloriesProps} from '../../types';
import useFoodStorage from '../../hooks/useFoodStorage';
import TodayCalories from '../../components/TodayCalories';
import TodayFoods from '../../components/TodayFoods';

const Home = () => {
  const [todayFood, setTodayFood] = useState<Food[]>([]);
  const [todayStatistics, setTodayStatistics] = useState<TodayCaloriesProps>({
    total: 2000,
    consumed: 0,
    remaining: 2000,
    percentage: 0,
  });
  const {getTodayFood} = useFoodStorage();

  const calculateTodayStatistics = useCallback(() => {
    const total = 2000;
    const consumed = todayFood.reduce((acc, food) => acc + Number(food.calories), 0);
    const remaining = total - consumed;
    const percentage = (consumed / total) * 100;
    setTodayStatistics({total, consumed, remaining, percentage});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadTodayFood = useCallback(async () => {
    try {
      const todayFoodResponse = await getTodayFood();
      setTodayFood(todayFoodResponse);
    } catch (error) {
      console.error(error);
      setTodayFood([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFocusEffect(
    useCallback(() => {
      console.log('useFocusEffect');
      loadTodayFood();
      calculateTodayStatistics();
    }, [loadTodayFood, calculateTodayStatistics]),
  );

  const {container} = styles;

  return (
    <View style={container}>
      <Header />
      <AddCalories />
      <TodayCalories {...todayStatistics} />
      <TodayFoods foods={todayFood} />
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
