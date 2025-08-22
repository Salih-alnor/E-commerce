import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import COLORS from "../assets/colors";
import axios from "axios";
import location from "../assets/images/icons/location.png";
import clock from "../assets/images/icons/clock.png";
import back from "../assets/images/icons/back.png";
import payPal from "../assets/images/icons/payPal.png";
import card from "../assets/images/icons/credit-card.png";
import cash from "../assets/images/icons/cash.png";
import check from "../assets/images/icons/check.png";
import OrderSummary from "../components/cart-components/OrderSummary";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import Notification from "../components/notifications/Notification";
import { createCashOrder, createCardOrder } from "../services/ordersService";
import { PUBLISHABLE_KEY } from "@env";

const { width, height } = Dimensions.get("screen");

const publishableKey = PUBLISHABLE_KEY;

const CheckOut = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const dispatch = useDispatch();
  useEffect(() => {
    setItems(cartItems);
  }, [navigation]);

  const handlePayment = (method) => {
    if (method === "cash") {
      const fetchCashOrder = async (data) => {
        try {
          const cartId = data.cartId;

          const response = await createCashOrder(cartId);
          console.log(response.message);

          if (response.status === "success") {
            setModalVisible(true);
            setMessage(response.message);
            setStatus(response.status);
            dispatch({ type: "clearCartItems" });
            setTimeout(() => {
              setModalVisible(false);
              navigation.navigate("cart");
            }, 3000);
          }
        } catch (error) {
          console.error(error.response);
        }
      };
      fetchCashOrder(items);
    } else if (method === "card") {
      const fetchPaymentIntent = async (data) => {
        const token = await AsyncStorage.getItem("token");
        try {
          const cartId = data.cartId;

          const response = await createCardOrder(cartId);

          const { clientSecret } = response;
          return clientSecret;
        } catch (error) {
          console.error(error);
        }
      };

      const handlePayment = async (items) => {
        setLoading(true);
        const clientSecret = await fetchPaymentIntent(items);
        if (!clientSecret) return;
        const { error } = await initPaymentSheet({
          merchantDisplayName: "E-Shope",
          allowsDelayedPaymentMethods: true,
          paymentIntentClientSecret: clientSecret,
          returnURL: "myapp://stripe-redirect",
        });
        if (error) {
          Alert.alert("Error", error.message);
          setLoading(false);
          return;
        }

        const { error: paymentError } = await presentPaymentSheet();
        setLoading(false);
        if (paymentError) {
          setModalVisible(true);
          setStatus("unSuccess");
          setMessage(paymentError.message);

          setTimeout(() => {
            setModalVisible(false);
          }, 3000);
        } else {
          setModalVisible(true);
          setStatus("success");
          setMessage("Payment was successful!");
          dispatch({ type: "clearCartItems" });
          
          setTimeout(() => {
            setModalVisible(false);
            navigation.navigate("cart");
          }, 3000);
        }
      };

      handlePayment(items);
    } else if (method === "paypal") {
      const createPayPalPayment = async (item) => {
        navigation.navigate("payPalPayment", {
          cartItem: item,
        });
      };

      createPayPalPayment(items);
    }
  };
  return (
    <StripeProvider publishableKey={publishableKey}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Image style={{ width: "50%", height: "50%" }} source={back} />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
            }}
          >
            Check Out
          </Text>

          <TouchableOpacity
            style={{ width: 50, height: 50 }}
          ></TouchableOpacity>
        </View>

        <View style={styles.locationAndTimeDeleviryWrapper}>
          <TouchableOpacity style={styles.location}>
            <View style={styles.iconWrapper}>
              <Image style={styles.icon} source={location} />
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "600" }}>
                325 15th Eighth Avenue, NewYork
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  color: COLORS.secondaryColor,
                }}
              >
                Saepe eaque fugiat ea voluptatum veniam.
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.location}>
            <View style={styles.iconWrapper}>
              <Image style={styles.icon} source={clock} />
            </View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: COLORS.secondaryColor,
              }}
            >
              6:00 pm, Wednesday 20
            </Text>
          </TouchableOpacity>
        </View>

        <OrderSummary items={items} />

        <View style={styles.paymentMethodsWrapper}>
          <Text style={styles.title}>Choose payment method</Text>

          <View>
            <TouchableOpacity
              style={styles.payMethod}
              onPress={() => setPaymentMethod("cash")}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View style={styles.ImageWrapper}>
                  <Image
                    resizeMode="contain"
                    style={styles.image}
                    source={cash}
                  />
                </View>
                <Text style={{ fontSize: 18, marginTop: 2 }}>Cash</Text>
              </View>
              <View style={styles.ckeckedWrapper}>
                {paymentMethod === "cash" ? (
                  <Image
                    style={[styles.image, { tintColor: COLORS.mainColor }]}
                    source={check}
                  />
                ) : null}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.payMethod}
              onPress={() => setPaymentMethod("card")}
            >
              <View
                style={{
                  flexDirection: "row",
                  // alignItems: 'center',
                }}
              >
                <View style={styles.ImageWrapper}>
                  <Image
                    resizeMode="contain"
                    style={styles.image}
                    source={card}
                  />
                </View>
                <Text style={{ fontSize: 18, marginTop: 2 }}>Credit Card</Text>
              </View>
              <View style={styles.ckeckedWrapper}>
                {paymentMethod === "card" ? (
                  <Image
                    style={[styles.image, { tintColor: COLORS.mainColor }]}
                    source={check}
                  />
                ) : null}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.payMethod}
              onPress={() => setPaymentMethod("paypal")}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View style={styles.ImageWrapper}>
                  <Image
                    resizeMode="contain"
                    style={styles.image}
                    source={payPal}
                  />
                </View>
                <Text style={{ fontSize: 18, marginTop: 2 }}>PayPal</Text>
              </View>
              <View style={styles.ckeckedWrapper}>
                {paymentMethod === "paypal" ? (
                  <Image
                    style={[styles.image, { tintColor: COLORS.mainColor }]}
                    source={check}
                  />
                ) : null}
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.addNewMethod}>
            <Text style={{ fontSize: 18 }}>Add new payment method</Text>
            <Text style={{ fontSize: 25, color: COLORS.mainColor }}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.checkBtnWrapper}>
          <TouchableOpacity
            onPress={() => handlePayment(paymentMethod)}
            disabled={paymentMethod === "" ? true : false}
            style={{
              width: "100%",
              height: 60,
              backgroundColor: paymentMethod === "" ? "#DDD" : COLORS.mainColor,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 30,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: 18,
                fontWeight: "500",
                textTransform: "uppercase",
              }}
            >
              payment
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Notification
        showModal={modalVisible}
        message={message}
        status={status}
      />
    </StripeProvider>
  );
};

export default CheckOut;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    height,
    // backgroundColor: "freen"
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    width: width - 32,
    height: 100,
  },

  backBtn: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  location: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },

  iconWrapper: {
    width: 30,
    height: 30,
    marginRight: 10,
  },

  icon: {
    width: "90%",
    height: "90%",
    tintColor: COLORS.mainColor,
  },

  title: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 16,
  },

  paymentMethodsWrapper: {
    marginTop: 30,
  },

  payMethod: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  ImageWrapper: {
    width: 35,
    height: 35,
  },

  image: {
    width: "80%",
    height: "80%",
  },

  ckeckedWrapper: {
    width: 20,
    height: 20,
  },

  addNewMethod: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },

  checkBtnWrapper: {
    width: "100%",
    position: "absolute",
    bottom: 40,
    left: 16,
    marginTop: 30,
  },
});
