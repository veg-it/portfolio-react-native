import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

import Constants from 'expo-constants';

import MenuItem from '../components/MenuItem';

export default function HomeScreen({ navigation, todoList }) {
  const [tasks, setTasks] = useState();
  const lengthNonCompleted = () => {
    let length = 0;

    todoList.map((item) => (item.status === false ? length++ : length));
    console.log('hi');
    console.log(length);
    setTasks(length);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={{
              fontSize: 36,
              fontWeight: '500',
              width: '100%',
              paddingHorizontal: 10,
              marginTop: 10,
              marginBottom: 30
              
            }}>Home</Text> */}

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          paddingHorizontal: 10,
          marginTop: 50,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '500',
          }}>
          Dashboard
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '500',
          }}>
          Edit
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          paddingVertical: 10,
        }}>
        <MenuItem
          name={'ToDo'}
          icon={'home'}
          navigation={navigation}
          route={'Tasks'}
          option={todoList.length}
        />
        <MenuItem
          name={'Completed'}
          icon={'check-square-o'}
        />
        <MenuItem
          name={'Statistic'}
          icon={'bar-chart'}
        />
        <MenuItem
          name={'Archive'}
          icon={'archive'}
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
  },
});
