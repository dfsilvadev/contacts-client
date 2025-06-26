import { Provider } from "react-redux";

import { DefaultRoutes } from "@/routes";
import { store } from "./store";

function App() {
  return (
    <Provider {...{ store }}>
      <DefaultRoutes />
    </Provider>
  );
}

export default App;
