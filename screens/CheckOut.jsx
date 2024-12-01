import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView
} from "react-native";
import React, { useEffect, useState } from "react";
import COLORS from "../assets/colors";

import location from "../assets/images/icons/location.png";
import clock from "../assets/images/icons/clock.png";
import back from "../assets/images/icons/back.png";

import payPal from "../assets/images/icons/payPal.png"
import card from "../assets/images/icons/credit-card.png"
import cash from "../assets/images/icons/cash.png"
import check from "../assets/images/icons/check.png"
import OrderSummary from "../components/cart-components/OrderSummary";

const { width, height } = Dimensions.get("screen");

const CheckOut = ({ route, navigation }) => {
const [data, setData] = useState([]);
  useEffect(() => {
    setData(route.params.data);
   
  }, [navigation])
  return (
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

        <TouchableOpacity style={{ width: 50, height: 50 }}></TouchableOpacity>
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

     <OrderSummary items={data}/>

      <View style={styles.paymentMethodsWrapper}>
        <Text style={styles.title}>Choose payment method</Text>

        <View>


          <TouchableOpacity style={styles.payMethod}>
            <View style={{
                flexDirection: "row",
            }}>
            <View style={styles.ImageWrapper}>
              <Image resizeMode="contain" style={styles.image} source={payPal}/>
            </View>
            <Text style={{fontSize: 18}}>PayPal</Text>
            </View>
            <View style={styles.ckeckedWrapper}>
             <Image style={[styles.image, {tintColor: COLORS.mainColor}]} source={check}/>
            </View>
          </TouchableOpacity>


          <TouchableOpacity style={styles.payMethod}>
            <View style={{
                flexDirection: "row",
            }}>
            <View style={styles.ImageWrapper}>
              <Image resizeMode="contain" style={styles.image} source={card}/>
            </View>
            <Text style={{fontSize: 18}}>Credit Card</Text>
            </View>
            <View style={styles.ckeckedWrapper}>
             <Image style={[styles.image, {tintColor: COLORS.mainColor}]} source={check}/>
            </View>
          </TouchableOpacity>


          <TouchableOpacity style={styles.payMethod}>
            <View style={{
                flexDirection: "row",
            }}>
            <View style={styles.ImageWrapper}>
              <Image resizeMode="contain" style={styles.image} source={cash}/>
            </View>
            <Text style={{fontSize: 18}}>Cash</Text>
            </View>
            <View style={styles.ckeckedWrapper}>
             <Image style={[styles.image, {tintColor: COLORS.mainColor}]} source={check}/>
            </View>
          </TouchableOpacity>
          
        </View>

        

        <TouchableOpacity style={styles.addNewMethod}>
          <Text style={{fontSize: 18}}>Add new payment method</Text>
          <Text style={{fontSize: 25, color: COLORS.mainColor}}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.checkBtnWrapper}>
        <TouchableOpacity style={{
            width: "100%",
            height: 60,
            backgroundColor: COLORS.mainColor,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 30,
           
        }}>
            <Text style={{
                color: COLORS.white,
                fontSize: 18,
                fontWeight: "500",
                textTransform: "uppercase",
            }}>Send Order</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    marginBottom: 16
  },

  ImageWrapper: {
    width: 35,
    height: 35
  },

  image: {
    width: "80%",
    height: "80%"
  },

  ckeckedWrapper: {
    width: 20,
    height: 20
  },

  addNewMethod: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16
  },

  checkBtnWrapper: {
    width: "100%",
    position: "absolute",
    bottom: 40,
    left: 16,
    marginTop: 30,
  }
});
