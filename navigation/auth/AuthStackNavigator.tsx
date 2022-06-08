import React from "react";
import { ScreenNames } from "../../types";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";

// Screens
import WelcomeScreen from "../../screens/auth/WelcomeScreen";
import LoginScreen from "../../screens/auth/Login";
import RegisterScreen from "../../screens/auth/Register";

const StackNavigator = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerStyle: {
          height: StatusBar.currentHeight,
          opacity: 0,
        },
        headerLeft: () => {},
      }}
    >
      <StackNavigator.Screen
        name={ScreenNames.WelcomeAuth}
        component={WelcomeScreen}
      />
      <StackNavigator.Screen name={ScreenNames.Login} component={LoginScreen} />
      <StackNavigator.Screen
        name={ScreenNames.Register}
        component={RegisterScreen}
      />
    </StackNavigator.Navigator>
  );
};

export default AuthStackNavigator;
