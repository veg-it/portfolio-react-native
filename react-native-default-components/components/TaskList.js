import { Text, StyleSheet, FlatList, View } from "react-native";
import { CheckBox } from "react-native-elements";
import { useState } from "react";

export default function TaskList({todoList}) {

    const [completed, setCompleted] = useState(false)

    const Item = ({ title }) => (
        <View style={styles.item}>
            <CheckBox
                containerStyle={{ 
                    marginLeft: 0, 
                    width: '100%', 
                    backgroundColor: '#EBEBEB',
                    margin: 5,
                    padding: 10,
                    borderRadius: 5,
                    fontSize: 18
                }}
                title={title}
                checked={completed}
                onPress={() => setCompleted(!completed)}
            />
        </View>
      );

    const renderItem = ({ item }) => (
        <Item title={item.name} />
    );
    
    return (
        <FlatList
        data={todoList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.listStyle}
      />
    )
}

const styles = StyleSheet.create({
    listStyle:{
        width: '100%',
        marginBottom: 10
    },
    item: {
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 18
    }
})