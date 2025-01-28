import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import splashLogo from "../assets/images/icons/splash.png";
import COLORS from "../assets/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(async () => {
      // await AsyncStorage.setItem("onboardingCompleted", "false");
      const isOnboardingCompleted = await AsyncStorage.getItem(
        "onboardingCompleted"
      );

      const user = await AsyncStorage.getItem("user");

      if (isOnboardingCompleted === "true") {
        if (user) {
          navigation.navigate("tabBar");
        } else {
          navigation.navigate("login");
        }
        return;
      }
      navigation.navigate("onboarding");
    }, 1000); // Change the delay to your desired time in milliseconds
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={splashLogo}
        style={{
          width: 300,
          height: 300,
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
          marginTop: -80,
          textAlign: "center",
        }}
      >
        E-commerce
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
