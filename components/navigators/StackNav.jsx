import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabBar from "./TabBar";
import Details from "../../screens/Details";
import CheckOut from "../../screens/CheckOut";
import COLORS from "../../assets/colors";
import Products from "../../screens/Products";
import Onboarding from "../../screens/Onboarding";
import Login from "../../screens/Login";
const StackNav = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="onboarding"
        component={Onboarding}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="login"
        component={Login}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="tabBar"
        component={TabBar}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="details"
        component={Details}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Check Out"
        component={CheckOut}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="products"
        component={Products}
      />
    </Stack.Navigator>
  );
};

export default StackNav;

const styles = StyleSheet.create({});
