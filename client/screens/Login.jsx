//3E:9C:C9:54:DF:DC:D8:1A:5F:81:16:0E:E4:C5:10:88:8C:08:9E:03
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
import React, { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import { login } from "../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get("screen");

// import * as Google from "expo-auth-session/providers/google";
// import {
//   getAuth,
//   GoogleAuthProvider,
//   signInWithCredential,
// } from "firebase/auth";
// import { auth } from "../config/config.firebase";
import * as AppleAuthentication from "expo-apple-authentication";

// import * as WebBrowser from "expo-web-browser";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [hidePassword, setHidePassword] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  const appleSignIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      console.log(credential);
    } catch (error) {
      if (error.code === "ERR_REQUEST_CANCELED") {
        Alert.alert("User Canceled Login");
      }
    }
  };

  // WebBrowser.maybeCompleteAuthSession();

  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   clientId:
  //     "651781481837-fkvu1i53bah3pdhs111qabdfldu3vopi.apps.googleusercontent.com",
  //   redirectUri: "https://auth.expo.io/@salihkreem/e-commerce",
  //   scopes: ["profile", "email"],
  // });

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     const { id_token } = response.params;
  //     const credential = GoogleAuthProvider.credential(id_token);
  //     signInWithCredential(auth, credential)
  //       .then((userCredential) => {
  //         setUserInfo(userCredential.user);
  //       })
  //       .catch((error) => console.log("Login error:", error));
  //   }
  // }, [response]);

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

  const handleFormSubmit = async (values) => {
    const { email, password } = values;
    try {
      const response = await login(email, password);

      if (response.status === "success") {
        if (response.token) {
          await AsyncStorage.setItem("token", response.token);
          if (response.user) {
            await AsyncStorage.setItem("user", JSON.stringify(response.user));
            dispatch({ type: "setUserInfo", payload: response.user });
            navigation.replace("tabBar");
          }
        }
      }
      console.log(response.message);
    } catch (error) {
      console.log(error.response.data.error);
    }
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
                    // autoFocus={true}
                    value={formikProps.values["email"]}
                  />

                  <InputFilad
                    placeholder="Password"
                    keyboardType="default"
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
          <TouchableOpacity
            style={styles.account}
            onPress={() => promptAsync()}
          >
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

          {/* <AppleAuthentication.AppleAuthenticationButton 
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={8}
          style={{
            width: "100%",
            height:55,
            marginBottom: 20,
          }}
          /> */}

          {Platform.OS == "ios" ? (
            <TouchableOpacity style={styles.account} onPress={appleSignIn}>
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
      </ScrollView>
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
