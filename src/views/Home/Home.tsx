import {StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import Header from '../../components/Header';
import AddCalories from '../../components/AddCalories';
import {useFocusEffect} from '@react-navigation/native';
import {Food} from '../../types';
import useFoodStorage from '../../hooks/useFoodStorage';
import TodayCalories from '../../components/TodayCalories';
import TodayFoods from '../../components/TodayFoods';

const Home = () => {
  const {getTodayFood} = useFoodStorage();
  const [todayFood, setTodayFood] = useState<Food[]>([]);

  const loadTodayFood = useCallback(async () => {
    try {
      const todayFoodResponse = await getTodayFood();
      await setTodayFood(todayFoodResponse);
    } catch (error) {
      console.error(error);
      setTodayFood([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFocusEffect(
    useCallback(() => {
      // clearAll();
      loadTodayFood();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const {container} = styles;
  return (
    <View style={container}>
      <Header />
      <AddCalories />
      <TodayCalories todayFood={todayFood} />
      <TodayFoods foods={todayFood} onCompleteAddRemove={() => loadTodayFood()} />
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
