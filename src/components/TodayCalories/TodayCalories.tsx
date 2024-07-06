import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import {TodayCaloriesProps} from '../../types';

const TodayCalories: FC<TodayCaloriesProps> = ({
  total = 2000,
  consumed = 0,
  remaining = 2000,
  percentage = 0,
}) => {
  const {
    container,
    leftContainer,
    rightContainer,
    todayStyle,
    rightItem,
    rightItemText,
    rightItemValue,
  } = styles;
  return (
    <View style={container}>
      <View style={leftContainer}>
        <CircularProgress
          value={percentage}
          inActiveStrokeColor={'#2ecc71'}
          inActiveStrokeOpacity={0.2}
          progressValueColor={'#000'}
          valueSuffix={'%'}
        />
      </View>
      <View style={rightContainer}>
        <Text style={todayStyle}>Today</Text>
        <View style={rightItem}>
          <Text style={rightItemText}>Total</Text>
          <Text style={rightItemValue}>{total}</Text>
        </View>
        <View style={rightItem}>
          <Text style={rightItemText}>Consumed</Text>
          <Text style={rightItemValue}>{consumed}</Text>
        </View>
        <View style={rightItem}>
          <Text style={rightItemText}>Remaining</Text>
          <Text style={rightItemValue}>{remaining}</Text>
        </View>
      </View>
    </View>
  );
};

export default TodayCalories;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  todayStyle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 14,
  },
  rightItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  rightItemText: {
    flex: 1,
  },
  rightItemValue: {
    flex: 1,
    textAlign: 'right',
  },
});
