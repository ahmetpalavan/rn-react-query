import { ActivityIndicator, Button, FlatList, ListRenderItem, StyleSheet, TextInput, Touchable, TouchableOpacity } from "react-native";

import { Text, View } from "../../components/Themed";
import { Todo, getTodos } from "../../api/todos";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";

export default function TabOneScreen() {
  const [todos, setTodos] = useState("");
  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  useEffect(() => {
    todosQuery.refetch();
    console.log("🚀 ~ file: index.tsx:16 ~ useEffect ~ todosQuery:", todosQuery.data);
  }, []);

  const renderTodo: ListRenderItem<Todo> = ({ item }) => {
    const deleteTodo = () => {};
    const updateTodo = () => {};
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 5,
          padding: 10,
          gap: 10,
          marginVertical: 10,
        }}
      >
        <TouchableOpacity onPress={() => {}}>
          {item.done ? (
            <Ionicons name="checkmark-circle" size={24} color="green" />
          ) : (
            <Ionicons name="checkmark-circle-outline" size={24} color="black" />
          )}
          <Text>{item.text}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteTodo} style={{ marginLeft: 10 }}>
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <TextInput placeholder="New Todo" onChangeText={setTodos} value={todos} />
        <Button title="Add Todo" onPress={() => {}} />
      </View>
      {todosQuery.isLoading ? <ActivityIndicator size={"large"} /> : null}
      {todosQuery.isError ? <Text>Error</Text> : null}
      <FlatList data={todosQuery.data} renderItem={renderTodo} keyExtractor={(item) => item.id.toString()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
