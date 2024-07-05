import AsyncStorage from '@react-native-async-storage/async-storage';
import {Food} from '../types';

const useFoodStorage = () => {
  const FOOD_KEY = '@food:Key';
  const saveFood = async ({calories, name, portion}: Food) => {
    try {
      const foods = await AsyncStorage.getItem(FOOD_KEY);
      if (foods) {
        const parsedFoods = JSON.parse(foods);
        parsedFoods.push({calories, name, portion});
        return await AsyncStorage.setItem(FOOD_KEY, JSON.stringify(parsedFoods));
      } else {
        return await AsyncStorage.setItem(FOOD_KEY, JSON.stringify([{calories, name, portion}]));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFoods = async () => {
    try {
      const foods = await AsyncStorage.getItem(FOOD_KEY);
      return foods ? JSON.parse(foods) : [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return {saveFood, getFoods};
};

export default useFoodStorage;
