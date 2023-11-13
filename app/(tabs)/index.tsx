import { ActivityIndicator, FlatList, ListRenderItem, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Todo, createTodos, deleteTodos, getTodoById, getTodos, updateTodos } from "@/api/todos";
import TodoItem from "@/components/TodoItem";
import reactotron from "reactotron-react-native";

if (__DEV__) {
  import("@/utils/reactotron").then(() => console.log("Reactotron Configured"));
}

export default function TabOneScreen() {
  const queryClient = useQueryClient();
  const [todos, setTodos] = useState("");
  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  useEffect(() => {
    reactotron.log ? "useEffect" : null;
    queryClient.prefetchQuery({
      queryKey: ["todos"],
      queryFn: () => getTodoById(1),
    });
  }, [queryClient]);

  const addMutation = useMutation({
    mutationKey: ["addTodo"],
    mutationFn: createTodos,
    onSuccess(data) {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey[0] === "todos";
        },
      });
      console.log("onSuccess", data);
    },
  });

  const addTodo = () => {
    addMutation.mutate(todos);
    setTodos("");
  };

  const deleteMutation = useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: deleteTodos,
    onSuccess(data) {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey[0] === "todos";
        },
      });
      console.log("onSuccess", data);
    },
  });

  const updateQueryClient = (updatedTodo: Todo) => {
    queryClient.setQueryData<Todo[]>(["todos"], (old) => {
      return old?.map((todo: Todo) => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo;
        }
        return todo;
      });
    });
  };

  const updateMutation = useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: updateTodos,
    onSuccess(data) {
      updateQueryClient(data);
      console.log("onSuccess", data);
    },
  });

  const renderTodo: ListRenderItem<Todo> = ({ item }) => {
    const deleteTodo = () => {
      deleteMutation.mutate(item.id);
    };
    const updateTodo = () => {
      updateMutation.mutate({ ...item, done: !item.done });
    };
    return <TodoItem item={item} onDelete={deleteTodo} onUpdate={updateTodo} />;
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <TextInput
          placeholder="New Todo"
          value={todos}
          onChangeText={(text) => setTodos(text)}
          style={{ padding: 10, borderWidth: 1, borderColor: "black", borderRadius: 10, flex: 1, marginRight: 10 }}
        />
        <TouchableOpacity onPress={addTodo}>
          <Ionicons name="add-circle" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {todosQuery.isLoading ? <ActivityIndicator size={"small"} color="red" /> : null}
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
