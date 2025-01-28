import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import heart from "../../assets/images/icons/heart.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";


const FavoriteIcon = ({ productId, style, heartIcon }) => {
  const dispatch = useDispatch();
  

  const AddToFavoriteList = async (productId) => {
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await axios.post(
        `http://172.20.10.4:4000/api/favorite/${productId}`,{}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      dispatch({
        type: "setFavorites",
        payload: response.data.favoritesList,
      });

    } catch (error) {
      console.log(error.response.data.error);
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
