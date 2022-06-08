import { StyleSheet, Platform, StatusBar } from "react-native";

export const mainAppColors = {
  mainBackground: "#000",
  textPrimary: "#FFFFFF",
  textSecondary: "#D1D5DB",
  purpleAccent: "#9333EA",
  darkAccent: "#181818",
  greenSuccess: "#22C55E",
};

export const customDarkTheme = {
  primary: mainAppColors.textPrimary,
  background: mainAppColors.mainBackground,
  card: mainAppColors.darkAccent,
  text: mainAppColors.textPrimary,
  border: mainAppColors.darkAccent,
  notification: mainAppColors.textPrimary,
};

export const androidSafeAreaViewStyles = StyleSheet.create({
  androidSafeAreaView: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
