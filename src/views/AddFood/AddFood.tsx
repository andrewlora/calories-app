import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import {Text} from '@rneui/base';
import {Button, Icon, Input} from '@rneui/themed';
import AddFoodModal from '../../components/AddFoodModal';
import useFoodStorage from '../../hooks/useFoodStorage';
import {Food} from '../../types';
import FoodItem from '../../components/FoodItem';

const AddFood = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const {getFoods} = useFoodStorage();
  useEffect(() => {
    loadFoods();
  }, []);
  const {
    container,
    addFoodContainer,
    titleContainer,
    addFoodBtnContainer,
    addFoodTitle,
    searchContainer,
    inputContainer,
    searchButton,
    content,
  } = styles;

  const loadFoods = async () => {
    try {
      const foodsResponse = await getFoods();
      setFoods(foodsResponse);
    } catch (error) {
      console.error(error);
      setFoods([]);
    }
  };

  const handleSearchPress = async () => {
    try {
      const result = await getFoods();
      setFoods(
        result.filter((food: Food) =>
          food.name.toLocaleLowerCase().trim().includes(search.toLocaleLowerCase().trim()),
        ),
      );
    } catch (error) {
      console.error(error);
      setFoods([]);
    }
  };

  const handleModalClose = async (shouldUpdate?: boolean) => {
    if (shouldUpdate) {
      Alert.alert('Food added successfully');
      loadFoods();
    }
    setVisible(false);
  };
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
            onPress={() => setVisible(true)}
          />
        </View>
      </View>
      <View style={searchContainer}>
        <View style={inputContainer}>
          <Input
            placeholder="apples, pie, soda ..."
            value={search}
            onChangeText={(text: string) => setSearch(text)}
          />
        </View>
        <Button
          title="Search"
          radius="lg"
          color="#ade8af"
          titleStyle={searchButton}
          onPress={handleSearchPress}
        />
      </View>
      <ScrollView style={content}>
        {foods?.map((food, index) => (
          <FoodItem key={index} {...food} />
        ))}
      </ScrollView>
      <AddFoodModal visible={visible} onClose={handleModalClose} />
    </View>
  );
};

export default AddFood;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#fff',
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
  content: {},
});
