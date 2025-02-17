import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import React from "react";
import add from "../../assets/images/icons/add.png";
import COLORS from "../../assets/colors";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../services/cartService";

const AddToCartIcon = ({ item }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfoReducer.userInfo);

  const addProductToCart = async (item, userInfo) => {
    data = {
      productId: item._id,
      quantity: 1,
      statesProduct: "increasing",
      price: item.price,
    };

    const userId = userInfo._id;

    try {
      const response = await addToCart(data, userId);

      const payload = {
        cartId: response.newCart._id,
        items: response.newCart.items,
        totalPrice: response.newCart.totalPrice,
      };

      dispatch({ type: "getCartItems", payload });

      console.log(response.message)
    } catch (error) {
      console.log(error.response.error);
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
