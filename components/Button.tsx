import React from "react";
import {
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
  TouchableNativeFeedbackProps,
  TouchableOpacityProps,
} from "react-native";
import { mainAppColors } from "../styles/global";

interface Props {
  variant: "Purple" | "Empty";
}

const Button: React.FC<
  (TouchableNativeFeedbackProps | TouchableOpacityProps) & Props
> = (props) => {
  const bgColor =
    props.variant === "Empty"
      ? mainAppColors.darkAccent
      : mainAppColors.purpleAccent;

  return (
    <>
      {Platform.OS === "android" ? (
        <TouchableNativeFeedback {...props}>
          <View
            style={{
              ...styles.button,
              backgroundColor: bgColor,
            }}
          >
            {props.children}
          </View>
        </TouchableNativeFeedback>
      ) : (
        <TouchableOpacity
          {...props}
          style={{ ...styles.button, backgroundColor: bgColor }}
        >
          {props.children}
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 15,
    alignItems: "center",
  },
});

export default Button;
