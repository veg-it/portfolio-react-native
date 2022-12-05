import { Text, StyleSheet, FlatList, View } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { useState } from 'react';

export default function TaskList({ todoList, deleteTask, setTodoList }) {
  const completeTask = (key, status) => {
    setTodoList((list) => {
      return list.map((item) =>
        item.id === key ? { ...item, status: !status } : item
      );
    });
  };

  return (
    <FlatList
      data={todoList}
      extraData={todoList}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <CheckBox
            containerStyle={{
              marginLeft: 0,    
              width: '100%',
              backgroundColor: '#EBEBEB',
              margin: 5,
              padding: 10,
              borderRadius: 5,
              fontSize: 18,
            }}
            title={item.name}
            checked={item.status}
            onPress={() => {
              // item.status = !item.status;
              // deleteTask(item.id)
              completeTask(item.id, item.status);
            }}>
            <Button
              title={'Delete'}
              onPress={() => deleteTask(item.id)}
              style={{
                position: 'absolute',
                zIndex: 999,
              }}
            />
          </CheckBox>
        </View>
      )}
      style={styles.listStyle}
    />
  );
}

const styles = StyleSheet.create({
  listStyle: {
    width: '100%',
    marginBottom: 10,
  },
  item: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
  },
});
