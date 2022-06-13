import React from "react";
import StyledText from "../../components/StyledText";
import { View } from "react-native";

const HomeScreen = () => {
  return (
    <View>
      <StyledText fontSize={24} fontVariant={"Bold"}>
        Home screen
      </StyledText>
    </View>
  );
};

export default HomeScreen;
