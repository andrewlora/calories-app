import AsyncStorage from '@react-native-async-storage/async-storage';
import {Food} from '../types';
import {isToday} from 'date-fns';
const useFoodStorage = () => {
  const FOOD_KEY = '@food:Key';
  const FOOD_TODAY_KEY = '@food:Key';
  const saveInfoToStorage = async (key: string, food: Food) => {
    try {
      const foods = await AsyncStorage.getItem(key);
      if (foods) {
        const parsedFoods = JSON.parse(foods);
        parsedFoods.push(food);
        return await AsyncStorage.setItem(key, JSON.stringify(parsedFoods));
      } else {
        return await AsyncStorage.setItem(key, JSON.stringify([food]));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getInfoToStorage = async (key: string) => {
    try {
      const foods = await AsyncStorage.getItem(key);
      return foods
        ? (JSON.parse(foods) as Food[]).filter(food => food.date && isToday(new Date(food.date)))
        : [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const saveFood = async ({calories, name, portion}: Food) => {
    try {
      return await saveInfoToStorage(FOOD_KEY, {calories, name, portion});
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const getFoods = async () => {
    try {
      return getInfoToStorage(FOOD_KEY);
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const saveTodayFood = async (food: Food) => {
    const today = new Date().toISOString();
    try {
      return await saveInfoToStorage(FOOD_TODAY_KEY, {...food, date: today});
    } catch (error) {
      console.log(error);
    }
  };

  const getTodayFood = async () => {
    try {
      return getInfoToStorage(FOOD_TODAY_KEY);
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return {saveFood, getFoods, saveTodayFood, getTodayFood};
};

export default useFoodStorage;
