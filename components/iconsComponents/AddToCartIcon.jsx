import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import React from "react";
import add from "../../assets/images/icons/add.png";
import COLORS from "../../assets/colors";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage"

const AddToCartIcon = ({ item }) => {
  
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfoReducer.userInfo)

  const addProductToCart = async (item, userInfo) => {
    const token = await AsyncStorage.getItem("token");
    data = {
      productId: item._id,
      quantity: 1,
      statesProduct: "increasing",
      price: item.price,
    };
    
    const id = userInfo._id
 
    try {
      const response = await axios.post(
        `http://172.20.10.4:4000/api/cart/${id}`,
        data,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.message);
      const payload = {
        items: response.data.newCart.items,
        totalPrice: response.data.newCart.totalPrice,
      };

      dispatch({ type: "getCartItems", payload });
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.mainColor,
        width: 25,
        height: 25,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={() => addProductToCart(item, userInfo)}
    >
      <Image
        style={{
          width: "50%",
          height: "50%",
          tintColor: COLORS.white,
        }}
        source={add}
      />
    </TouchableOpacity>
  );
};

export default AddToCartIcon;

const styles = StyleSheet.create({});
