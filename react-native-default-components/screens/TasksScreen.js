import { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';

import TaskList from '../components/TaskList';

export default function TasksScreen({ navigation, todoList, setTodoList }) {
  const [taskInput, setTaskInput] = useState();

  const addTask = (text) => {
    setTodoList((oldArray) => [
      ...oldArray,
      {
        name: text,
        status: false,
        id: Math.random().toString(36).substring(7),
      },
    ]);
  };

  const deleteTask = (key) => {
    setTodoList((list) => {
      return list.filter((oldArray) => oldArray.id != key);
    });
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        paddingTop: 50,
        paddingBottom: 10,
        paddingHorizontal: 20,
      }}>
      <TaskList
        todoList={todoList}
        deleteTask={deleteTask}
        setTodoList={setTodoList}
      />
      <TextInput
        placeholder="Start input"
        onChangeText={setTaskInput}
      />
      <Button
        title="ds"
        onPress={() => {
          addTask(taskInput);
        }}
      />
    </View>
  );
}
