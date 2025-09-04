import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import splashLogo from "../assets/images/icons/splash.png";
import COLORS from "../assets/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";

const Splash = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(async () => {
      const isOnboardingCompleted = await AsyncStorage.getItem(
        "onboardingCompleted"
      );

      
      
      if (isOnboardingCompleted === "true") {
        const user = JSON.parse(await AsyncStorage.getItem("user"));
        if (user) {
          dispatch({ type: "setUserInfo", payload: user });
          navigation.navigate("tabBar");
        } else {
          navigation.navigate("login");
        }
        return;
      }
      navigation.navigate("onboarding");
    }, 1000)
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={splashLogo}
        style={{
          width: 100,
          height: 100,
          resizeMode: "contain",
          tintColor: COLORS.mainColor,
        }}
      />
      <Text
        style={{
          fontSize: 34,
          fontWeight: "bold",
          color: COLORS.mainColor,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        E-Shope
      </Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
  },
});
