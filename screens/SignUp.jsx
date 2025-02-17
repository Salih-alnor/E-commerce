import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Dimensions,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import back from "../assets/images/icons/back.png";
import lock from "../assets/images/icons/lock.png";
import email from "../assets/images/icons/email.png";
import user from "../assets/images/icons/user.png";
import showEye from "../assets/images/icons/show.png";
import closeEye from "../assets/images/icons/close-eye.png";
import COLORS from "../assets/colors";
import { Formik } from "formik";
import * as Yup from "yup";
const { width, height } = Dimensions.get("screen");
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { register } from "../services/authService";

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const [hidePassword, setHidePassword] = useState(true);
  const InputFilad = ({
    placeholder,
    keyboardType,
    formikProps,
    formikKey,
    icon,
    ...rest
  }) => {
    const inputWrapper = {
      width: width - 32,
      borderColor: COLORS.secondaryColor,
      borderWidth: Platform.OS == "ios" ? 0.3 : 0.4,
      borderRadius: 10,
      height: 55,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      marginVertical: 20,
      marginBottom: 0,
    };

    const inputAndIconWrapper = {
      flexDirection: "row",
      alignItems: "center",
    };

    const iconInput = {
      width: 20,
      height: 20,
    };

    const input = {
      paddingLeft: 8,
      width: width - 100,
      fontSize: 16,
      color: COLORS.secondaryColor,
    };

    if (formikProps.errors[formikKey] && formikProps.touched[formikKey]) {
      inputWrapper.borderColor = "red";
    }

    return (
      <View>
        <View style={inputWrapper}>
          <View style={inputAndIconWrapper}>
            <View style={iconInput}>
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  tintColor: COLORS.secondaryColor,
                }}
                source={icon}
              />
            </View>
            <TextInput
              keyboardType={keyboardType}
              placeholder={placeholder}
              onBlur={formikProps.handleBlur(formikKey)}
              placeholderTextColor={COLORS.secondaryColor}
              onChangeText={formikProps.handleChange(formikKey)}
              style={input}
              {...rest}
            />
          </View>
          {formikKey === "password" ? (
            <TouchableOpacity
              style={iconInput}
              onPress={() => setHidePassword(!hidePassword)}
            >
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  tintColor: COLORS.secondaryColor,
                }}
                source={hidePassword ? closeEye : showEye}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <Text
          style={{
            color: "red",
          }}
        >
          {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
        </Text>
      </View>
    );
  };

  const handleFormSubmit = async (values) => {
    try {
      const response = await register(values);
      

      if (response.token) {
        await AsyncStorage.setItem("token", response.token);
        if (response.user) {
          await AsyncStorage.setItem(
            "user",
            JSON.stringify(response.user)
          );
          dispatch({ type: "setUserInfo", payload: response.user });
          navigation.replace("login");
        }
      }
      console.log(response.message)
    } catch (error) {
      Alert.alert(error.response.data.error);
    }
  };

  const validationSchema = Yup.object().shape({
    user_name: Yup.string()
      .required("User name is required")
      .min(5, "User name is too short...")
      .max(20, "User name is too long"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .min(8, "Password too short...")
      .required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "password must be match")
      .required("confirm password is required"),
  });

  return (
    <View style={styles.container}>
      <View style={styles.backWrapper}>
        <TouchableOpacity
          style={{
            width: 25,
            height: 25,
          }}
        >
          <Image
            style={{
              width: "100%",
              height: "100%",
            }}
            source={back}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 600,
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          Welcome Back.
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: COLORS.secondaryColor,
          }}
        >
          Let's sign up
        </Text>

        <View style={styles.formWrapper}>
          <Formik
            initialValues={{
              user_name: "",
              email: "",
              password: "",
              confirm_password: "",
            }}
            onSubmit={(values) => handleFormSubmit(values)}
            validationSchema={validationSchema}
          >
            {(formikProps) => {
              return (
                <React.Fragment>
                  <InputFilad
                    placeholder="Full Name"
                    keyboardType="text"
                    icon={user}
                    formikProps={formikProps}
                    formikKey="user_name"
                    autoFocus={true}
                    value={formikProps.values["user_name"]}
                  />
                  <InputFilad
                    placeholder="Email"
                    keyboardType="email-address"
                    icon={email}
                    formikProps={formikProps}
                    formikKey="email"
                    value={formikProps.values["email"]}
                  />
                  <InputFilad
                    placeholder="Password"
                    keyboardType="text"
                    icon={lock}
                    secureTextEntry={hidePassword}
                    formikProps={formikProps}
                    formikKey="password"
                    value={formikProps.values["password"]}
                  />
                  <InputFilad
                    placeholder="Confirm Password"
                    keyboardType="text"
                    icon={lock}
                    secureTextEntry={hidePassword}
                    formikProps={formikProps}
                    formikKey="confirm_password"
                    value={formikProps.values["confirm_password"]}
                  />

                  <TouchableOpacity
                    onPress={formikProps.handleSubmit}
                    style={{
                      marginTop: 30,
                      width: width - 32,
                      backgroundColor: COLORS.mainColor,
                      height: 55,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                      marginBottom: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: COLORS.white,
                        fontWeight: 500,
                      }}
                    >
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </React.Fragment>
              );
            }}
          </Formik>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: COLORS.secondaryColor,
            }}
          >
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.replace("login")}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: COLORS.mainColor,
              }}
            >
              {" "}
              Login !
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  backWrapper: {
    height: 100,
    flexDirection: "row",
    alignItems: "flex-end",
  },

  formWrapper: {
    marginVertical: 20,
  },

  forgetPassword: {
    alignItems: "flex-end",
  },

  line: {
    width: "30%",
    height: 0.6,
    backgroundColor: "#ddd",
  },

  otherAccounts: {
    marginTop: 30,
  },

  account: {
    width: width - 32,
    height: 55,
    borderColor: COLORS.secondaryColor,
    borderWidth: Platform.OS == "ios" ? 0.3 : 0.9,
    borderRadius: 10,
    paddingHorizontal: 30,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  accountLogo: {
    width: 30,
    height: 30,
    marginRight: 40,
  },

  accountImage: {
    width: "100%",
    height: "100%",
  },
});
