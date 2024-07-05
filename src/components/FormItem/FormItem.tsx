import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Input} from '@rneui/themed';
import {FormItemProps} from '../../types';

const FormItem: FC<FormItemProps> = ({placeholder, title, value, onChangeText}) => {
  const {formItem, inputContainer, legendContainer, legend} = styles;
  return (
    <View style={formItem}>
      <View style={inputContainer}>
        <Input placeholder={placeholder} value={value} onChangeText={onChangeText} />
      </View>
      <View style={legendContainer}>
        <Text style={legend}>{title}</Text>
      </View>
    </View>
  );
};

export default FormItem;

const styles = StyleSheet.create({
  formItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 2,
  },
  legendContainer: {
    flex: 1,
  },
  legend: {
    fontWeight: '500',
  },
});
