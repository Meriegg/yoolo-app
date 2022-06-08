import "react-native-gesture-handler";
import NavigatorHandler from "./navigation/NavigatorHandler";
import { Provider } from "react-redux";
import { reduxStore } from "./redux";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { Text } from "react-native";

export default function App() {
  let [fontsLoaded] = useFonts({
    PoppinsBold: Poppins_700Bold,
    PoppinsSemibold: Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <Provider store={reduxStore}>
      <NavigatorHandler />
    </Provider>
  );
}
