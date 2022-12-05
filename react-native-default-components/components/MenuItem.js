import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export default function MenuItem({ name, icon, navigation, option }) {
  return (
    <TouchableOpacity
      style={{
        width: 165,
        height: 150,
        backgroundColor: '#1E1E1D',
        borderRadius: 16,
        padding: 15,
        margin: 5,
        display: 'flex',
      }}
      onPress={() => navigation.navigate('Tasks')}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Icon
          name={icon}
          type="font-awesome"
          size={24}
          color="#000"
          style={{
            backgroundColor: '#fff',
            padding: 5,
            borderRadius: 5,
            marginRight: 8,
          }}
        />
        <Text
          style={{
            color: 'white',
            fontSize: 16,
          }}>
          {name}
        </Text>
      </View>
      <Text
        style={{
          color: 'white',
          fontSize: 40,
          width: '100%',
          textAlign: 'center',
          marginTop: 10,
        }}>
        {option}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
