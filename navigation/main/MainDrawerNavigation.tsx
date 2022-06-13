import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";

// Screens
import HomeScreen from "../../screens/main/Home";

import * as secureStore from "expo-secure-store";

const Drawer = createDrawerNavigator();

const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={() => (
        <DrawerContentScrollView>
          <DrawerItem
            label={"Log out"}
            onPress={async () => {
              await secureStore.deleteItemAsync("accessToken");
              await secureStore.deleteItemAsync("refreshToken");
            }}
          ></DrawerItem>
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen name={"Main"} component={HomeScreen} />
      <Drawer.Screen name={"Maintwo"} component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;
