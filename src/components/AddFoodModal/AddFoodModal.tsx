import {Modal, StyleSheet, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {AddFoodModalProps} from '../../types';
import {Button, Icon} from '@rneui/themed';
import FormItem from '../FormItem';
import useFoodStorage from '../../hooks/useFoodStorage';

const AddFoodModal: FC<AddFoodModalProps> = ({onClose, visible}) => {
  const [calories, setCalories] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [portion, setPortion] = useState<string>('');
  const {saveFood} = useFoodStorage();
  useEffect(() => {
    setCalories('');
    setName('');
    setPortion('');
  }, [visible]);
  const handleAddFood = async () => {
    try {
      await saveFood({calories, name, portion});
      onClose(true);
    } catch (error) {
      console.error(error);
    }
  };
  const {container, content, closeContainer} = styles;
  return (
    <Modal visible={visible} onRequestClose={() => onClose()} transparent animationType="slide">
      <View style={container}>
        <View style={content}>
          <View style={closeContainer}>
            <Button icon={<Icon name="close" size={28} />} onPress={() => onClose()} type="clear" />
          </View>
          <FormItem
            title="CAL"
            placeholder=""
            value={calories}
            onChangeText={(value: string) => setCalories(value)}
          />
          <FormItem
            title="Name"
            placeholder=""
            value={name}
            onChangeText={(value: string) => setName(value)}
          />
          <FormItem
            title="Portion"
            placeholder=""
            value={portion}
            onChangeText={(value: string) => setPortion(value)}
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Add"
              icon={<Icon name="add" color="#fff" />}
              radius="lg"
              color="#4ecb71"
              disabled={!calories.trim() || !name.trim() || !portion.trim()}
              onPress={handleAddFood}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddFoodModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    width: '75%',
    height: '50%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeContainer: {
    alignItems: 'flex-end',
  },
  buttonContainer: {
    alignItems: 'flex-end',
  },
});
