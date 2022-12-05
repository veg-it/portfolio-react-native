import { useState } from 'react';
import { Text } from 'react-native';

import Constants from 'expo-constants';

import HomeScreen from './screens/HomeScreen';
import TasksScreen from './screens/TasksScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function LogoTitle({title}) {

  return (
    <Text style={{
      fontSize: 36,
      fontWeight: '500',
      width: '100%',
      paddingTop: Constants.statusBarHeight,
      paddingHorizontal: 10,
      marginTop: 10,
      
    }}>{title}</Text>
  );
}

export default function App() {
  const [todoList, setTodoList] = useState([
    {name: 'First ToDo', status: false, id: '1'},
    {name: 'Second ToDo', status: true, id: '2'}
  ]);

  

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          options={{ 
            headerShadowVisible: false,
            headerTitle: (props) => <LogoTitle {...props} title='Home'/> 
          }}
        >
          {(props) => <HomeScreen {...props} todoList = {todoList} />}
        </Stack.Screen>
        <Stack.Screen 
          name="Tasks" 
          options={{ 
            title: 'Tasks',
            headerShadowVisible: false,
            headerBackVisible:false,
            headerTitle: (props) => <LogoTitle {...props} title='Tasks'/> 
          }}
        >
          {(props) => <TasksScreen {...props} todoList = {todoList} setTodoList={setTodoList}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
