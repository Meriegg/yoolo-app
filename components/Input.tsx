import React from "react";
import { TextInputProps, TextInput } from "react-native";
import { mainAppColors } from "../styles/global";

// There are no types for reinput
// `yarn add @types/reinput -D` does not work
// @ts-ignore
import Reinput from "reinput";

const Input: React.FC<TextInputProps> = (props) => {
  return <TextInput {...props}></TextInput>;
};

type MaterialInputProps = TextInputProps & {
  value: string;
  error: string | undefined;
  label: string;
  fontSize?: number | null;
};

export const MaterialInput: React.FC<MaterialInputProps> = (props) => {
  return (
    <Reinput
      fontFamily={"PoppinsSemibold"}
      fontSize={props.fontSize || 24}
      color={mainAppColors.textPrimary}
      labelActiveScale={0.5}
      labelActiveTop={-26}
      height={100}
      errorStyle={{
        fontFamily: "PoppinsSemibold",
      }}
      {...props}
    />
  );
};

export default Input;
