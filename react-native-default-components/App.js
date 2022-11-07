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
          component={HomeScreen} 
          options={{ 
            headerShadowVisible: false,
            headerTitle: (props) => <LogoTitle {...props} title='Home'/> 
          }}
        />
        <Stack.Screen 
          name="Tasks" 
          component={TasksScreen} 
          options={{ 
            title: 'Tasks',
            headerShadowVisible: false,
            headerTitle: (props) => <LogoTitle {...props} title='Tasks'/> 
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
