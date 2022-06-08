import React from "react";
import Button from "../../components/Button";
import StyledText from "../../components/StyledText";
import { View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { ScreenNames } from "../../types";

const WelcomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  return (
    <View style={{ padding: 10, marginTop: 60 }}>
      <StyledText fontVariant="Semibold" fontSize={48}>
        Welcome to yoolo!
      </StyledText>
      <StyledText fontVariant="Semibold" fontSize={24}>
        lets get you intialized 🔥
      </StyledText>

      <View style={{ marginTop: 65 }}>
        <Button
          variant="Purple"
          onPress={() => navigation.navigate(ScreenNames.Login)}
        >
          <StyledText fontSize={16} fontVariant={"Semibold"}>
            📧 continue with email!
          </StyledText>
        </Button>

        <View style={{ marginTop: 10 }}>
          <StyledText fontSize={14} fontVariant={"Semibold"} isSecondary={true}>
            Login with email coming soon
          </StyledText>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;
