import React from "react";
import { Text, TextProps } from "react-native";
import { mainAppColors } from "../styles/global";

interface Props {
  children: React.ReactNode;
  fontVariant: "Bold" | "Semibold";
  fontSize: number;
  isSecondary?: boolean;
}

const StyledText: React.FC<TextProps & Props> = (
  { children, fontVariant, fontSize, isSecondary },
  props
) => {
  return (
    <Text
      {...props}
      style={{
        color: isSecondary
          ? mainAppColors.textSecondary
          : mainAppColors.textPrimary,
        fontFamily: `Poppins${fontVariant}`,
        fontSize,
      }}
    >
      {children}
    </Text>
  );
};

export default StyledText;
