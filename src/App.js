import Router from "./views/container/Router";
import { Provider } from "react-redux";
//import store from "./redux/store";
import store from "./state/store";

function App() {
  console.log(store);
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
