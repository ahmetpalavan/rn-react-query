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
