import React, { useState, useEffect } from "react";
import { View, Button, StatusBar, Platform, Text } from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";
import { createPayPalOrder } from "../services/ordersService";
import NotificationModal from "../components/notifications/Notification";
import { useSelector, useDispatch } from "react-redux";

export default function PayPalPayment({ route, navigation }) {
  const [url, setUrl] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const { cartItem } = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    createPayment(cartItem);
    // console.log(cartItem)
  }, [navigation]);

  const CLIENT_ID =
    "AUnMvQNid-EeTj0CwgbM-DCxzrxJCqUrsDQCUw8wkcouAstdThbtjgKw407OSkU8KiL4CYOUkO0amgF9";
  const SECRET =
    "EDK3CqG8fKy3p51TngY40x2ABZJLv_vhLePQY23y80-hVYYNUISPZ-i36zghn59GJsWC5ss2aumd0x9c";

  const getAccessToken = async () => {
    try {
      const response = await axios.post(
        "https://api-m.sandbox.paypal.com/v1/oauth2/token", // رابط PayPal للحصول على التوكن
        "grant_type=client_credentials", // نوع التوكن المطلوب
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          auth: {
            username: CLIENT_ID,
            password: SECRET,
          },
        }
      );

      const accessToken = response.data.access_token;
      console.log(accessToken);
      return accessToken;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const createPayment = async (cartItems) => {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      console.error("Access Token not available");
      return;
    }

    try {
      const response = await axios.post(
        "https://api-m.sandbox.paypal.com/v1/payments/payment",
        {
          intent: "sale",
          payer: { payment_method: "paypal" },
          transactions: [
            { amount: { total: cartItems.totalPrice, currency: "USD" } },
          ],
          redirect_urls: {
            return_url: "https://your-app.com/success",
            cancel_url: "https://your-app.com/cancel",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      setUrl(response.data.links[1].href + "useraction=commit");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={{ flex: 1, justifyContent: "center", backgroundColor: "#FFF" }}
    >
      <StatusBar barStyle="dark-content" hidden={true} />

      {url ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            paddingTop: Platform.OS === "ios" ? 40 : 0,
            backgroundColor: "#FFF",
          }}
        >
          <WebView
            source={{ uri: url }}
            // cacheEnabled={false} // تعطيل الكاش
            // incognito={true} // فتح الجلسة في وضع التصفح الخفي
            onNavigationStateChange={async (navState) => {
              if (navState.url.includes("success")) {
                setModalVisible(true);
                setStatus("success");
                setMessage("Payment was successful!");
                dispatch({ type: "clearCartItems" });
                setTimeout(() => {
                  setModalVisible(false);
                  navigation.goBack();
                }, 2000);
                setUrl(null);
                try {
                  const response = await createPayPalOrder(cartItem);
                  console.log(response);
                } catch (error) {
                  console.log(error.response.data);
                }
              } else if (navState.url.includes("cancel")) {
                console.log("Payment was cancelled!");
                setModalVisible(true);
                setStatus("unSuccess");
                setMessage("Payment was cancelled!");
                setTimeout(() => {
                  setModalVisible(false);
                  navigation.goBack();
                }, 2000);
              }
            }}
          />
        </View>
      ) : null}
      <NotificationModal
        showModal={modalVisible}
        message={message}
        status={status}
      />
    </View>
  );
}
