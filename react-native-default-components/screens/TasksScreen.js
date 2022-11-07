import { useState } from 'react';
import {Text} from 'react-native';

import TaskList from '../components/TaskList';

export default function TasksScreen({ navigation }) {

    const [todoList, setTodoList] = useState([
        {name: 'First ToDo', status: 'false', id: 1},
        {name: 'Second ToDo', status: 'false', id: 2}
      ]);

    return (
      <TaskList todoList={todoList} />
    )
  }