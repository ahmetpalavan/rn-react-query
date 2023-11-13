import Reactotron from "reactotron-react-native";
import { queryClient } from "./queryClient";
import { QueryClientManager, reactotronReactQuery } from "reactotron-react-query";

const queryClientManager = new QueryClientManager({
  queryClient,
} as any);
Reactotron.use(reactotronReactQuery(queryClientManager))
  .configure({
    onDisconnect: () => {
      queryClientManager.unsubscribe();
    },
  })
  .useReactNative()
  .connect();
