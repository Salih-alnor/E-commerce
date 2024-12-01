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
import menu from "../assets/images/icons/menu.png";
import trash from "../assets/images/icons/delete.png";
import add from "../assets/images/icons/add.png";
import subtraction from "../assets/images/icons/subtraction.png";
import watch from "../assets/images/featured-products/casio-watch.png";
import OrderSummary from "../components/cart-components/OrderSummary";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const { width, height } = Dimensions.get("screen");
const Cart = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (route.params && route.params.items.items) {
      setData(route.params.items);
      setItems(route.params.items.items);
    }
  }, [route.params]);

  const deleteProductFromCart = async (item) => {
    const data = {
      productId: item._id,
    };

    // وفقًا لـ axios، يتم تمرير البيانات في طلب DELETE كجزء من config (وليس كمعامل مستقل مثل في طلبات POST أو PUT).
    // الكود الحالي يحاول تمرير data كمعامل ثانٍ في طلب axios.delete، مما يؤدي إلى تجاهل البيانات.

    try {
      const response = await axios.delete("http://172.20.10.4:4000/api/cart", {
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      });

      const payload = {
        items: response.data.newCart.items,
        totalPrice: response.data.newCart.totalPrice,
      };

      dispatch({ type: "getCartItems", payload });
    } catch (error) {
      console.log(error);
    }
  };

  const Product = ({ item }) => {
    // console.log(item)
    return (
      <TouchableOpacity style={styles.product}
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
                uri: `http://172.20.10.4:4000/ProductsImages/${item.productId.images[0]}`,
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
                fontSize: 16,
                fontWeight: "400",
                color: "#9999",
              }}
            >
              {item.quantity}
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

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.products}>
          {items.length > 0
            ? items.map((item, index) => {
                return <Product item={item} key={index} />;
              })
            : null}
        </View>

        <View style={{
          flex: 1,
          minHeight: height / 2 - 100,
          justifyContent: "flex-end",
        }}>
          <OrderSummary items={data} />

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
            onPress={() =>
              navigation.navigate("Check Out", {
                data: data,
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
