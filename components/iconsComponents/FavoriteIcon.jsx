import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import heart from "../../assets/images/icons/heart.png";
import axios from "axios";
import { useDispatch } from "react-redux";
// import COLORS from "../../assets/colors";

const FavoriteIcon = ({ productId, style, heartIcon }) => {
  const dispatch = useDispatch();

  const AddToFavoriteList = async (productId) => {
    try {
      const response = await axios.post(
        `http://172.20.10.4:4000/api/favorite/${productId}`
      );

      

      dispatch({
        type: "setFavorites",
        payload: response.data.favorites,
      });

      dispatch({
        type: "getProducts",
        payload: response.data.products,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TouchableOpacity
      style={heartIcon}
      onPress={() => AddToFavoriteList(productId)}
    >
      <Image style={style} source={heart} />
    </TouchableOpacity>
  );
};

export default FavoriteIcon;

const styles = StyleSheet.create({});
