import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import {TodayCaloriesProps, TodayCaloriesResume} from '../../types';

const TodayCalories: FC<TodayCaloriesProps> = ({todayFood}) => {
  const [todayStatistics, setTodayStatistics] = useState<TodayCaloriesResume>({
    total: 2000,
    consumed: 0,
    remaining: 2000,
    percentage: 0,
  });

  const calculateTodayStatistics = useCallback(() => {
    try {
      const total = 2000;
      const consumed = todayFood.reduce((acc, food) => acc + Number(food.calories), 0);
      const remaining = total - consumed;
      const percentage = (consumed / total) * 100;
      setTodayStatistics({total, consumed, remaining, percentage});
    } catch (error) {
      console.error(error);
      setTodayStatistics({total: 2000, consumed: 0, remaining: 2000, percentage: 0});
    }
  }, [todayFood]);

  useEffect(() => {
    calculateTodayStatistics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todayFood]);

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
          value={todayStatistics?.percentage ?? 0}
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
          <Text style={rightItemValue}>{todayStatistics?.total}</Text>
        </View>
        <View style={rightItem}>
          <Text style={rightItemText}>Consumed</Text>
          <Text style={rightItemValue}>{todayStatistics?.consumed}</Text>
        </View>
        <View style={rightItem}>
          <Text style={rightItemText}>Remaining</Text>
          <Text style={rightItemValue}>{todayStatistics?.remaining}</Text>
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
