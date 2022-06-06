import "react-native-gesture-handler";
import NavigatorHandler from "./navigation/NavigatorHandler";
import { Provider } from "react-redux";
import { reduxStore } from "./redux";

export default function App() {
  return (
    <Provider store={reduxStore}>
      <NavigatorHandler />
    </Provider>
  );
}
