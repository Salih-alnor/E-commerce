import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import COLORS from "../assets/colors";
import back from "../assets/images/icons/back.png";
import { getOrders } from "../services/ordersService";

const { width, height } = Dimensions.get("screen");

const Oreders = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOrders();
        if (response.status === "success") {
          const orders = response.orders;
          orders.reverse();
          setOrders(orders);
        }
      } catch (error) {
        console.log("Error", error.response.data);
      }
    };

    fetchData();
  }, [navigation]);

  const Order = ({ item, index }) => {
    const formatterWithTime = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    const formattedDate = formatterWithTime.format(item.orderId);
    return (
      <View style={styles.ordersContainer}>
        <TouchableOpacity style={styles.order}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 10,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 16,

                  fontWeight: "500",
                  color: "green",
                }}
              >
                <Text style={{ color: "black" }}>Total Price : </Text>$
                {item.totalPrice}
              </Text>
              <Text style={{ marginTop: 5 }}>
                Items : {item.cartItems[0].quantity}
              </Text>
            </View>
            <Text>id : #{item.orderId}</Text>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <View>
              <Text>Status: Pending</Text>
              <Text>Payment type : {item.paymentMethod}</Text>
              <Text>Status payment : {item.statusPayment}</Text>
            </View>

            <View
              style={{
                width: 0.4,
                height: 60,
                backgroundColor: "#ddd",
              }}
            ></View>
            <View>
              <Text style={styles.orderStatusDate}>
                Created : {formattedDate}
              </Text>
              {/* <Text style={styles.orderDate}>Shipping date : 2022-01-05</Text> */}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Image style={{ width: "25%", height: "50%" }} source={back} />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
          }}
        >
          Orders
        </Text>

        <TouchableOpacity
          style={{
            width: 100,
            height: 50,
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        ></TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {orders.map((item, index) => {
          return <Order item={item} key={index} />;
        })}
      </ScrollView>
    </View>
  );
};

export default Oreders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    paddingHorizontal: 16,
    height,
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
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  order: {
    minHeight: 140,
    width: width - 32,
    backgroundColor: COLORS.white,
    padding: 16,
    marginBottom: 20,
    borderRadius: 10,
    borderColor: "#DDD",
    borderWidth: 0.6,
    justifyContent: "space-between",
  },

  orderTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
});
