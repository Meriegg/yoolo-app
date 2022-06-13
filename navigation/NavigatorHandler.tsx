import React from "react";
import useAxios from "../hooks/useAxios";
import MainDrawerNavigator from "./main/MainDrawerNavigation";
import AuthStackNavigator from "./auth/AuthStackNavigator";
import { useAppSelector } from "../hooks/redux";
import { useDispatch } from "react-redux";
import { setData } from "../redux/user/userSlice";
import { NavigationContainer } from "@react-navigation/native";
import { customDarkTheme } from "../styles/global";

const NavigatorHandler = () => {
  const axios = useAxios({ ignoreRefresh: false });
  const dispatch = useDispatch();
  const userData = useAppSelector((state) => state.user.value.userData);

  React.useEffect(() => {
    (async () => {
      const apiData: any = await axios.get("/user/getSelfData");

      if (apiData?.status !== 200 && apiData?.error) {
        console.error(
          `COULD NOT GET DATA! status: ${apiData?.status} errorMessage: ${apiData?.errorMessage}`
        );
      }

      dispatch(setData({ userData: apiData?.data?.userData || null }));
    })();
  }, []);

  return (
    <NavigationContainer theme={{ dark: true, colors: customDarkTheme }}>
      {userData === null ? <AuthStackNavigator /> : <MainDrawerNavigator />}
    </NavigationContainer>
  );
};

export default NavigatorHandler;
