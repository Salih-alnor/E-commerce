import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import COLORS from "../assets/colors";
import back from "../assets/images/icons/back.png";
import emptyCart from "../assets/images/icons/empty-cart.png";
import trash from "../assets/images/icons/delete.png";
import add from "../assets/images/icons/add.png";
import subtraction from "../assets/images/icons/subtraction.png";
import OrderSummary from "../components/cart-components/OrderSummary";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {removeFromCart} from "../services/cartService"
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
const API = Constants.expoConfig.extra.API;

const { width, height } = Dimensions.get("screen");
const Cart = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfoReducer.userInfo);
  const cart = useSelector((state) => state.cartReducer.cartItems);
  const cartItems = cart.items;
  useEffect(() => {
    if (route.params && route.params.items.items) {
      setData(route.params.items);
      setItems(cartItems.reverse());
      
    }
  }, [route.params, navigation]);

  const deleteProductFromCart = async (item) => {
    

    
    const id = item._id;
    try {
      const response = await removeFromCart(id)

      const payload = {
        cartId: response.newCart._id,
        items: response.newCart.items,
        totalPrice: response.newCart.totalPrice,
      };
      console.log(response.message);
      dispatch({ type: "getCartItems", payload });
    } catch (error) {
      console.log(error.response.error);
    }
  };

  const increase = async (item, statesProduct, userInfo) => {
    const token = await AsyncStorage.getItem("token");
    const data = {
      productId: item.productId._id,
      quantity: 1,
      statesProduct: statesProduct,
      price: item.productId.price,
    };
    const id = userInfo._id;

    try {
      const response = await axios.post(
        `${API}/api/cart/${id}`,
        data,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const payload = {
        cartId: response.data.newCart._id,
        items: response.data.newCart.items,
        totalPrice: response.data.newCart.totalPrice,
      };
      dispatch({ type: "getCartItems", payload });
    } catch (error) {
      console.log(error);
    }
  };

  const Product = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.product}
        onPress={() =>
          navigation.navigate("details", {
            name: item.productId.name,
            price: item.productId.price,
            images: item.productId.images,
            sizes: item.productId.sizes,
            colors: item.productId.colors,
            categoryId: item.productId.mainCategory,
            subCategoryId: item.productId.subCategory,
            brandId: item.productId.brand,
            description: item.productId.description,
            quantity: item.productId.quantity,
            id: item.productId._id,
          })
        }
      >
        <View style={styles.imageAndInfo}>
          <View style={styles.imageProduct}>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={{
                uri: `${API}/ProductsImages/${item.productId.images[0]}`,
              }}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.namePruduct}>{item.productId.name}</Text>
            <Text style={styles.brand}>{item.productId.brand.name}</Text>
            <Text style={styles.price}>${item.productId.price}</Text>
          </View>
        </View>

        <View style={styles.btnItem}>
          <TouchableOpacity
            style={styles.deleteImage}
            onPress={() => deleteProductFromCart(item.productId)}
          >
            <Image
              resizeMode="contain"
              style={[styles.image, { tintColor: "#F65A5A" }]}
              source={trash}
            />
          </TouchableOpacity>

          <View style={styles.addAndSubBtn}>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => increase(item, "decreasing", userInfo)}
            >
              <Image
                style={{
                  width: "40%",
                  height: "40%",
                  tintColor: "green",
                }}
                source={subtraction}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: "#9999",
                marginHorizontal: 5,
              }}
            >
              {item.quantity}
            </Text>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => increase(item, "increasing", userInfo)}
            >
              <Image
                style={{
                  width: "40%",
                  height: "40%",
                  tintColor: COLORS.secondaryColor,
                }}
                source={add}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.navigate("home")}
        >
          <Image style={{ width: "25%", height: "50%" }} source={back} />
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
        disabled={items.length === 0 ? true : false}
          style={{
            width: 100,
            height: 50,
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              width: "100%",
              textAlign: "right",
              color: "#F65A5A",
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            Delete all
          </Text>
        </TouchableOpacity>
      </View>

      {items.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height,
            width,
            borderRadius: 10,
            position: "absolute",
            top: 100,
          }}
        >
          <View
            style={{
              marginBottom: 200,
              alignItems: 'center',
            }}
          >
            <Image
              style={{
                width: 200,
                height: 200,
                resizeMode: "contain",
              }}
              source={emptyCart}
            />
            <Text
              style={{
                fontSize: 28,
                fontWeight: "500",
                textAlign: "center",
                color: "#9999",
              }}
            >
              Your cart is empty
            </Text>
          </View>
        </View>
      ) : null}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.products}>
          {items.length > 0
            ? items.map((item, index) => {
                return <Product item={item} key={index} />;
              })
            : null}
        </View>

        <View
          style={{
            flex: 1,
            minHeight: height / 2 - 100,
            justifyContent: "flex-end",
          }}
        >
          {items.length > 0 ? <OrderSummary items={data} /> : null}

          {items.length > 0 ? (
            <TouchableOpacity
              style={{
                width: "100%",
                height: 60,
                backgroundColor: items.length > 0 ? COLORS.mainColor : "#DDD",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 30,
                marginTop: 40,
                marginBottom: 20,
              }}
              onPress={() =>
                navigation.navigate("checkout", {
                  data,
                  items
                })
              }
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
          ) : null}
        </View>
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
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  products: {
    marginTop: 40,
    minHeight: height / 2 - 100,
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
    justifyContent: "flex-end",
    alignItems: "center",
  },

  addBtn: {
    width: 20,
    height: 20,
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
