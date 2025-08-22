import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import heart from "../../assets/images/icons/heart.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
const API = Constants.expoConfig.extra.API;

const FavoriteIcon = ({ productId, style, heartIcon }) => {
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favoritesReducer.favoritesList);

  const handleFavorite = async (productId) => {
    const favoritesId = favorite.map((item, index) => {
      return item._id;
    });
    if (favoritesId.includes(productId)) {
      const deleteProductFromFavoritesList = async (id) => {
        const token = await AsyncStorage.getItem("token");
        try {
          const response = await axios.delete(
            `${API}/api/favorite/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log(response.data.message);
          dispatch({
            type: "setFavorites",
            payload: response.data.favoritesList,
          });
        } catch (error) {
          console.log(error.response.data.error);
        }
      };

      return await deleteProductFromFavoritesList(productId);
    } else {
      const addProductToFavoriteList = async (id) => {
        const token = await AsyncStorage.getItem("token");
        try {
          const response = await axios.post(
            `${API}/api/favorite/${id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log(response.data.message);

          dispatch({
            type: "setFavorites",
            payload: response.data.favoritesList,
          });
        } catch (error) {
          console.log(error.response.data.error);
        }
      };

      return await addProductToFavoriteList(productId);
    }
  };

  return (
    <TouchableOpacity
      style={heartIcon}
      onPress={() => handleFavorite(productId)}
    >
      <Image style={style} source={heart} />
    </TouchableOpacity>
  );
};

export default FavoriteIcon;

const styles = StyleSheet.create({});
