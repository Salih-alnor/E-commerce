import React, { useState, useEffect } from "react";
import { View, Button } from "react-native";
import { WebView } from "react-native-webview";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PayPalPayment({route, navigation}) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    createPayment(route);
  }, [navigation])

  const createPayment = async (items) => {
    const token = await AsyncStorage.getItem("token");
    try {
      const {cartId} = items.params;
      const response = await fetch(
        `http://172.20.10.4:4000/api/order/create-paypal-payment/${cartId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setUrl(`https://www.paypal.com/checkoutnow?token=${data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center'}}>
      {url ? (
        <WebView
          source={{ uri: url }}
          onNavigationStateChange={(navState) => {
            if (navState.url.includes("success")) {
              console.log("Payment Successful");
              setUrl(null);
            }
          }}
        />
      ) : (
        null
      )}
    </View>
  );
}
