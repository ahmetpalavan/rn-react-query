import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Todo } from "@/api/todos";

interface TodoItemProps {
  item: Todo;
  onDelete: (id: number) => void;
  onUpdate: (item: Todo) => void;
}

const TodoItem = ({ item, onDelete, onUpdate }: TodoItemProps) => {
  return (
    <View style={styles.todoItem}>
      <TouchableOpacity onPress={() => onUpdate(item)}>
        {item.done ? (
          <Ionicons name="checkmark-circle" size={24} color="green" />
        ) : (
          <Ionicons name="checkmark-circle-outline" size={24} color="black" />
        )}
        <Text>{item.text}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(item.id)} style={{ marginLeft: 10 }}>
        <Ionicons name="trash" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
    padding: 10,
    gap: 10,
    marginVertical: 10,
  },
});

export default TodoItem;
