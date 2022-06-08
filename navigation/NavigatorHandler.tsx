import React from "react";
import AuthStackNavigator from "./auth/AuthStackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { customDarkTheme } from "../styles/global";

const NavigatorHandler = () => {
  return (
    <NavigationContainer theme={{ dark: true, colors: customDarkTheme }}>
      <AuthStackNavigator />
    </NavigationContainer>
  );
};

export default NavigatorHandler;
