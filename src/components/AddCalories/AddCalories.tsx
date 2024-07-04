import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types';

const AddCalories = () => {
  const {navigate} = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();
  const handleAddCaloriesPress = () => {
    console.log('Add calories button pressed');
    navigate('AddFood');
  };
  const {container, leftContainer, rightContainer, caloriesTitle} = styles;
  return (
    <View style={container}>
      <View style={leftContainer}>
        <Text style={caloriesTitle}>Calories</Text>
      </View>
      <View style={rightContainer}>
        <Button
          icon={<Icon name="add-circle-outline" color="#fff" />}
          radius="lg"
          color="#4ecb71"
          onPress={handleAddCaloriesPress}
        />
      </View>
    </View>
  );
};

export default AddCalories;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  caloriesTitle: {
    fontSize: 20,
  },
});
