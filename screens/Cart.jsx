import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import COLORS from "../assets/colors";
import back from "../assets/images/icons/back.png";
import menu from "../assets/images/icons/menu.png";
import trash from "../assets/images/icons/delete.png";
import add from "../assets/images/icons/add.png";
import subtraction from "../assets/images/icons/subtraction.png";
import watch from "../assets/images/featured-products/casio-watch.png";
import OrderSummary from "../components/cart-components/OrderSummary";

const { width, height } = Dimensions.get("screen");
const Cart = ({ navigation }) => {
  const Product = () => {
    return (
      <View style={styles.product}>
        <View style={styles.imageAndInfo}>
          <View style={styles.imageProduct}>
            <Image resizeMode="contain" style={styles.image} source={watch} />
          </View>
          <View style={styles.info}>
            <Text style={styles.namePruduct}>Watch</Text>
            <Text style={styles.brand}>Casio</Text>
            <Text style={styles.price}>$65</Text>
          </View>
        </View>

        <View style={styles.btnItem}>
          <TouchableOpacity style={styles.deleteImage}>
            <Image
              resizeMode="contain"
              style={[styles.image, { tintColor: "#F65A5A" }]}
              source={trash}
            />
          </TouchableOpacity>

          <View style={styles.addAndSubBtn}>
            <TouchableOpacity style={styles.addBtn}>
              <Image
                style={{
                  width: "40%",
                  height: "40%",
                  tintColor: COLORS.white,
                }}
                source={subtraction}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: COLORS.secondaryColor,
              }}
            >
              3
            </Text>
            <TouchableOpacity style={styles.addBtn}>
              <Image
                style={{
                  width: "40%",
                  height: "40%",
                  tintColor: COLORS.white,
                }}
                source={add}
              />
            </TouchableOpacity>
          </View>
        </View>
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
          <Image style={{ width: "50%", height: "50%" }} source={back} />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
          }}
        >
          Cart
        </Text>

        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <Image style={{ width: "50%", height: "50%" }} source={menu} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.products}>
          <Product />
          <Product />
        </View>
        <OrderSummary />
        <TouchableOpacity
          style={{
            width: "100%",
            height: 60,
            backgroundColor: COLORS.mainColor,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 30,
            marginTop: 40,
            marginBottom: 20,
          }}
          onPress={() => navigation.navigate("Check Out")}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 18,
              fontWeight: "500",
            }}
          >
            Check Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  products: {
    marginTop: 40,
    minHeight: height * 0.4,
  },

  product: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },

  imageAndInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  imageProduct: {
    width: 130,
    height: 100,
    overflow: "hidden",
    backgroundColor: "#EEE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    borderRadius: 16,
  },

  image: {
    width: "80%",
    height: "80%",
  },

  namePruduct: {
    fontSize: 18,
    fontWeight: "500",
  },

  brand: {
    fontSize: 16,
    color: COLORS.secondaryColor,
    marginVertical: 6,
  },

  price: {
    color: COLORS.mainColor,
    fontSize: 16,
    fontWeight: "500",
  },

  btnItem: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  deleteImage: {
    width: 40,
    height: 40,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "flex-end",
  },

  addAndSubBtn: {
    width: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  addBtn: {
    width: 25,
    height: 25,
    backgroundColor: COLORS.mainColor,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
