import React from "react";
import StyledText from "../../components/StyledText";
import Button from "../../components/Button";
import useAxios from "../../hooks/useAxios";
import * as secureStore from "expo-secure-store";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setData } from "../../redux/user/userSlice";
import { View, TouchableOpacity, Text, Alert } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { mainAppColors } from "../../styles/global";
import { MaterialInput } from "../../components/Input";
import { useFormik } from "formik";
import { ScreenNames } from "../../types";

const RegisterScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const axios = useAxios({ ignoreRefresh: true });
  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };
  const validationSchema = yup.object().shape({
    username: yup.string().required("This is required!"),
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
        const data: any = await axios.post("/auth/register", values);

        if (data?.status !== 200 && data?.error) {
          Alert.alert(
            "An error happened!",
            data?.data?.message ||
              `We could not identify the cause of this error, Please try again! This is the error Message: \`${data?.errorMessage}\``
          );
        }

        await secureStore.setItemAsync(
          "refreshToken",
          data?.data?.refreshToken
        );
        await secureStore.setItemAsync("accessToken", data?.data?.accessToken);

        dispatch(setData({ userData: data?.data?.userData || null }));
      },
    });

  const steps = [
    {
      renderComponent: () => (
        <MaterialInput
          error={errors.username}
          label={"enter a username!"}
          value={values.username}
          onChangeText={handleChange("username")}
        />
      ),
      errorName: "username",
    },
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
          Create your account 🔒
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
        onPress={() => navigation.navigate(ScreenNames.Login)}
      >
        <StyledText fontSize={16} fontVariant={"Semibold"} isSecondary={true}>
          already have an account?
        </StyledText>
        <StyledText fontSize={24} fontVariant={"Semibold"}>
          Log in here
        </StyledText>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
