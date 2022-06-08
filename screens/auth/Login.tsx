import React from "react";
import StyledText from "../../components/StyledText";
import Button from "../../components/Button";
import * as yup from "yup";
import { View, TouchableOpacity, Text } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { mainAppColors } from "../../styles/global";
import { MaterialInput } from "../../components/Input";
import { useFormik } from "formik";
import { ScreenNames } from "../../types";

const LoginScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = yup.object().shape({
    email: yup.string().required("This is required!").email("Invalid email!"),
    password: yup
      .string()
      .required("This is required!")
      .min(9, "Must be at least 9 characters!"),
  });

  const { handleSubmit, handleChange, errors, values, validateForm } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        console.log(values);
      },
    });

  const steps = [
    {
      renderComponent: () => (
        <MaterialInput
          error={errors.email}
          label={"your email"}
          value={values.email}
          onChangeText={handleChange("email")}
        />
      ),
      errorName: "email",
    },
    {
      renderComponent: () => (
        <MaterialInput
          error={errors.password}
          label={"your password"}
          value={values.password}
          onChangeText={handleChange("password")}
        />
      ),
      errorName: "password",
    },
  ];

  const [step, setStep] = React.useState<number>(0);

  const handleNextStep = async () => {
    const validateErrors = await validateForm();
    if (validateErrors[steps[step].errorName as "email" | "password"]) return;

    setStep(step + 1);
  };

  const handleGoBack = () => {
    if (step === 0) {
      navigation.popToTop();
      return;
    }

    setStep(step - 1);
  };

  const isFinalStep = () => step === steps.length - 1;

  return (
    <View style={{ padding: 15, marginTop: 25 }}>
      <TouchableOpacity
        onPress={() => handleGoBack()}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <StyledText fontSize={16} fontVariant={"Semibold"}>
          👈 back
        </StyledText>
        <Text
          style={{
            color: mainAppColors.purpleAccent,
            fontFamily: "PoppinsBold",
          }}
        >
          step {step + 1} / {steps.length}
        </Text>
      </TouchableOpacity>

      <View style={{ marginTop: 20 }}>
        <StyledText fontSize={48} fontVariant="Semibold">
          Log into your account 🔒
        </StyledText>
      </View>

      {steps[step].renderComponent()}

      <Button
        variant="Purple"
        onPress={async () =>
          isFinalStep() ? await handleSubmit() : await handleNextStep()
        }
      >
        <StyledText fontSize={16} fontVariant="Semibold">
          {!isFinalStep() ? "Next step 👉" : "Finish ✅"}
        </StyledText>
      </Button>

      <TouchableOpacity
        style={{ marginTop: 50 }}
        onPress={() => navigation.navigate(ScreenNames.Register)}
      >
        <StyledText fontSize={16} fontVariant={"Semibold"} isSecondary={true}>
          don't have an account?
        </StyledText>
        <StyledText fontSize={24} fontVariant={"Semibold"}>
          Register here
        </StyledText>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
