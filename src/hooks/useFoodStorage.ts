import AsyncStorage from '@react-native-async-storage/async-storage';
import {Food} from '../types';
import {isToday} from 'date-fns';
const useFoodStorage = () => {
  const FOOD_KEY = '@food:key';
  const FOOD_TODAY_KEY = '@food:today:key';
  const saveInfoToStorage = async (key: string, food: Food) => {
    try {
      const foods = await AsyncStorage.getItem(key);
      if (foods) {
        const savedFoods: Food[] = JSON.parse(foods) as Food[];
        savedFoods.push(food);
        return await AsyncStorage.setItem(key, JSON.stringify(savedFoods));
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
      if (key === FOOD_TODAY_KEY) {
        return foods
          ? (JSON.parse(foods) as Food[]).filter(food => food.date && isToday(new Date(food.date)))
          : [];
      }
      return foods ? (JSON.parse(foods) as Food[]) : [];
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
      const foods = await getInfoToStorage(FOOD_KEY);
      return foods;
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

  const removeTodayFood = async (indexFood: number) => {
    try {
      const foods = await getTodayFood();
      const newFoods = foods.filter((food, index) => index !== indexFood);
      console.log('newFoods: ', newFoods);
      return await AsyncStorage.setItem(FOOD_TODAY_KEY, JSON.stringify(newFoods));
    } catch (error) {
      console.log(error);
    }
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }

    console.log('Done.');
  };

  return {saveFood, getFoods, saveTodayFood, getTodayFood, removeTodayFood, clearAll};
};

export default useFoodStorage;
