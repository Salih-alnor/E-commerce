import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    TextInput,
    Dimensions,
    Platform,
  } from "react-native";
  import React from "react";
  import back from "../assets/images/icons/back.png";
  import lock from "../assets/images/icons/lock.png";
  import email from "../assets/images/icons/email.png";
  import user from "../assets/images/icons/user.png";
  import showEye from "../assets/images/icons/show.png";
  import closeEye from "../assets/images/icons/close-eye.png";
  import google from "../assets/images/icons/google.png";
  import apple from "../assets/images/icons/apple-logo.png";
  import facebook from "../assets/images/icons/facebook.png";
  import COLORS from "../assets/colors";
  const { width, height } = Dimensions.get("screen");
  
  const SignUp = ({navigation}) => {
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
          Let's sign up
        </Text>
  
        <View style={styles.formWrapper}>

        <View style={styles.inputWrapper}>
            <View style={styles.inputAndIconWrapper}>
              <View style={styles.iconInput}>
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    tintColor: COLORS.secondaryColor,
                  }}
                  source={user}
                />
              </View>
              <TextInput
                keyboardType="text"
                placeholder="Full Name"
                placeholderTextColor={COLORS.secondaryColor}
                style={styles.input}
              />
            </View>
          </View>


          <View style={styles.inputWrapper}>
            <View style={styles.inputAndIconWrapper}>
              <View style={styles.iconInput}>
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    tintColor: COLORS.secondaryColor,
                  }}
                  source={email}
                />
              </View>
              <TextInput
                keyboardType="email-address"
                placeholder="Email"
                placeholderTextColor={COLORS.secondaryColor}
                style={styles.input}
              />
            </View>
          </View>
  
          <View style={styles.inputWrapper}>
            <View style={styles.inputAndIconWrapper}>
              <View style={styles.iconInput}>
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    tintColor: COLORS.secondaryColor,
                  }}
                  source={lock}
                />
              </View>
              <TextInput
                keyboardType="text"
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor={COLORS.secondaryColor}
                style={styles.input}
              />
            </View>
            <TouchableOpacity style={styles.iconInput}>
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  tintColor: COLORS.secondaryColor,
                }}
                source={closeEye}
              />
            </TouchableOpacity>
          </View>


          <View style={styles.inputWrapper}>
            <View style={styles.inputAndIconWrapper}>
              <View style={styles.iconInput}>
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    tintColor: COLORS.secondaryColor,
                  }}
                  source={lock}
                />
              </View>
              <TextInput
                keyboardType="text"
                placeholder="Confirm Password"
                secureTextEntry={true}
                placeholderTextColor={COLORS.secondaryColor}
                style={styles.input}
              />
            </View>
            <TouchableOpacity style={styles.iconInput}>
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  tintColor: COLORS.secondaryColor,
                }}
                source={closeEye}
              />
            </TouchableOpacity>
          </View>

         
          <TouchableOpacity
          onPress={() => navigation.navigate("tabBar")}
            style={{
              marginTop: 30,
              width: width - 32,
              backgroundColor: COLORS.mainColor,
              height: 55,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
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
        </View>
  

  

  
        <View style={{
          flexDirection: "row",
          justifyContent: 'center',
          marginTop: 20
        }}>
          <Text style={{
            fontSize: 16,
            color: COLORS.secondaryColor
          }}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <Text style={{
              fontSize: 16,
              fontWeight: "500",
              color: COLORS.mainColor
            }}> Login !</Text>
          </TouchableOpacity>
        </View>
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
      marginVertical: 40,
    },
  
    inputWrapper: {
      width: width - 32,
      borderColor: COLORS.secondaryColor,
      borderWidth: Platform.OS == "ios" ? 0.3 : 0.4,
      borderRadius: 10,
      marginBottom: 30,
      height: 55,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 10,
    },
  
    inputAndIconWrapper: {
      flexDirection: "row",
      alignItems: "center",
    },
  
    iconInput: {
      width: 20,
      height: 20,
    },
  
    input: {
      paddingLeft: 8,
      width: width - 100,
      fontSize: 16,
      color: COLORS.secondaryColor,
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
  