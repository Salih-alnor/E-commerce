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
} from "react-native";
import React, { useState } from "react";
import back from "../assets/images/icons/back.png";
import lock from "../assets/images/icons/lock.png";
import email from "../assets/images/icons/email.png";
import showEye from "../assets/images/icons/show.png";
import closeEye from "../assets/images/icons/close-eye.png";
import google from "../assets/images/icons/google.png";
import apple from "../assets/images/icons/apple-logo.png";
import facebook from "../assets/images/icons/facebook.png";
import COLORS from "../assets/colors";
import { Formik } from "formik";
import * as Yup from "yup";
const { width, height } = Dimensions.get("screen");

const Login = ({ navigation }) => {
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
          {placeholder === "Password" ? (
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

  const handleFormSubmit = (values) => {
    Alert.alert(JSON.stringify(values));
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .min(8, "Password too short...")
      .required("Password is required"),
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
        Let's sign in
      </Text>

      <View style={styles.formWrapper}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => handleFormSubmit(values)}
          validationSchema={validationSchema}
        >
          {(formikProps) => {
            return (
              <React.Fragment>
                <InputFilad
                  placeholder="Email"
                  keyboardType="email-address"
                  icon={email}
                  formikProps={formikProps}
                  formikKey="email"
                  autoFocus={true}
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

                <View style={styles.forgetPassword}>
                  <TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: Platform.OS == "ios" ? 600 : 500,
                        color: COLORS.mainColor,
                      }}
                    >
                      Recover Password
                    </Text>
                  </TouchableOpacity>
                </View>

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
                    Sign in
                  </Text>
                </TouchableOpacity>
              </React.Fragment>
            );
          }}
        </Formik>
      </View>

      <View
        style={{
          width: width - 32,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.line}></View>
        <Text
          style={{
            color: COLORS.secondaryColor,
            fontWeight: "500",
          }}
        >
          or continue with
        </Text>
        <View style={styles.line}></View>
      </View>

      <View style={styles.otherAccounts}>
        <TouchableOpacity style={styles.account}>
          <View style={styles.accountLogo}>
            <Image style={styles.accountImage} source={google} />
          </View>
          <Text
            style={{
              fontSize: 17,
              color: COLORS.secondaryColor,
              fontWeight: 500,
            }}
          >
            Continue with Google
          </Text>
        </TouchableOpacity>

        {Platform.OS == "ios" ? (
          <TouchableOpacity style={styles.account}>
            <View style={styles.accountLogo}>
              <Image style={styles.accountImage} source={apple} />
            </View>
            <Text
              style={{
                fontSize: 17,
                color: COLORS.secondaryColor,
                fontWeight: 500,
              }}
            >
              Continue with Apple ID
            </Text>
          </TouchableOpacity>
        ) : (
          <View></View>
        )}

        <TouchableOpacity style={styles.account}>
          <View style={styles.accountLogo}>
            <Image style={styles.accountImage} source={facebook} />
          </View>
          <Text
            style={{
              fontSize: 17,
              color: COLORS.secondaryColor,
              fontWeight: 500,
            }}
          >
            Continue with Facebook
          </Text>
        </TouchableOpacity>
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
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("sign-up")}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: COLORS.mainColor,
            }}
          >
            {" "}
            Sign Up !
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

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
    marginVertical: 40,
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
    borderWidth: Platform.OS == "ios" ? 0.3 : 0.4,
    borderRadius: 10,
    paddingHorizontal: 80,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  accountLogo: {
    width: 30,
    height: 30,
    marginRight: 20,
  },

  accountImage: {
    width: "100%",
    height: "100%",
  },
});
