import React, { useState, useEffect } from "react";
import { View, Button, StatusBar, TouchableOpacity, Text } from "react-native";
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
      console.log(data)
      setUrl(`https://www.sandbox.paypal.com/checkoutnow?token=${data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "#FFF" }}>
      <StatusBar barStyle="dark-content" hidden={true}/>
      
      {url ? (
        <View style={{ flex: 1, justifyContent: 'center',marginTop: 30,  backgroundColor: "#FFF" }}>
          <View>
            <TouchableOpacity onPress={() => navigation.replace("checkout")}><Text style={{
              color: "blue",
              fontSize: 17,
              marginLeft: 16
            }}>Back</Text></TouchableOpacity>
          </View>
          <WebView
          source={{ uri: url }}
          onNavigationStateChange={(navState) => {
            if (navState.url.includes("success")) {
              console.log("Payment Successful");
              setUrl(null);
            }
          }}
        />
        </View>
      ) : (
        null
      )}
    </View>
  );
}
