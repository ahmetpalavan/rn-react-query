import sleep from "sleep-promise";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export const getTodos = async (): Promise<Todo[]> => {
  await sleep(1000);
  const response = await fetch(`${API_URL}/todos`);
  return response.json();
};

export const createTodos = async (text: string): Promise<Todo> => {
  const todo = { text, done: true };
  const response = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  return response.json();
};

export const updateTodos = async (todo: Todo): Promise<Todo> => {
  const response = await fetch(`${API_URL}/todos/${todo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  return response.json();
};

export const deleteTodos = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  });
  return response.json();
}

export const getTodoById = async (id: number): Promise<Todo> => {
  const response = await fetch(`${API_URL}/todos/${id}`);
  return response.json();
}
