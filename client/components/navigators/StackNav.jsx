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
import SignUp from "../../screens/SignUp";
import SubCategories from "../../screens/SubCategories";
import Brands from "../../screens/Brands";
import Favorites from "../../screens/Favorites";
import Splash from "../../screens/Splash";
import Brand from "../../screens/Brand";
import PayPalPayment from "../../screens/PayPalPayment";
import Oreders from "../../screens/Oreders";
const StackNav = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="splash"
        component={Splash}
      />

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
        name="sign-up"
        component={SignUp}
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
        name="checkout"
        component={CheckOut}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="products"
        component={Products}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="subcategories"
        component={SubCategories}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="brands"
        component={Brands}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="brand"
        component={Brand}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          headerTitleAlign: "center",
        }}
        name="favorites"
        component={Favorites}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          headerTitleAlign: "center",
        }}
        name="payPalPayment"
        component={PayPalPayment}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          headerTitleAlign: "center",
        }}
        name="orders"
        component={Oreders}
      />
    </Stack.Navigator>
  );
};

export default StackNav;

const styles = StyleSheet.create({});
