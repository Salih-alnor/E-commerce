import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import trash from "../assets/images/icons/delete.png";
import add from "../assets/images/icons/add.png";
import back from "../assets/images/icons/back.png";
import halfStar from "../assets/images/icons/half-star.png";

import { useDispatch } from "react-redux";

import COLORS from "../assets/colors";
import axios from "axios";
import AddToCartIcon from "../components/iconsComponents/AddToCartIcon";

const { width, height } = Dimensions.get("screen");
const Favorites = ({ navigation }) => {
  const [favoritesList, setFavoritesList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getFavoritesList = async () => {
      try {
        const response = await axios.get(
          "http://172.20.10.4:4000/api/favorite"
        );
        dispatch({ type: "setFavorites", payload: response.data });
        setFavoritesList(response.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    getFavoritesList();
  }, [navigation]);

  const deleteItemFromFavoritesList = async (id) => {
    try {
      const response = await axios.delete(
        `http://172.20.10.4:4000/api/favorite/${id}`
      );

      setFavoritesList(response.data.favoritesList);
      dispatch({ type: "setFavorites", payload: response.data.favoritesList || [] });
    } catch (error) {
      console.log(error);
    }
  };

  const clearFavoritesList = async () => {
    try {
      const response = await axios.delete(
        `http://172.20.10.4:4000/api/favorite`
      );
      setFavoritesList([]);
      
      dispatch({ type: "clearFavorites" });
    } catch (error) {
      console.log(error);
    }
  };

  const Product = ({ item }) => {
    return (
      <TouchableOpacity style={styles.product}>
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
            <Text style={styles.price}>${item.productId.price}</Text>
            <View style={styles.rate}>
              <View style={styles.star}>
                <Image
                  style={{
                    tintColor: "gold",
                    width: "90%",
                    height: "90%",
                  }}
                  source={halfStar}
                />
              </View>
              <Text
                style={{
                  fontSize: 16,
                  marginRight: 8,
                  marginLeft: 4,
                  fontWeight: "500",
                }}
              >
                4.6
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <AddToCartIcon item={item}/>

          <TouchableOpacity
            onPress={() => deleteItemFromFavoritesList(item.productId._id)}
          >
            <Text
              style={{
                color: "#F55F1F",
                fontSize: 16,
              }}
            >
              Remove
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
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
          Favorites
        </Text>

        <TouchableOpacity
          style={{
            height: 50,
            width: 100,
            alignItems: "flex-end",
            justifyContent: "center",
          }}
          onPress={() => clearFavoritesList()}
        >
          <Text
            style={{
              fontSize: 18,
              color: "#F55F1F",
              fontWeight: 500,
            }}
          >
            Delete all
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={favoritesList}
        renderItem={Product}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    width: width - 32,
    height: 100,
  },

  backBtn: {
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  product: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    // backgroundColor: "#EEE"
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

  info: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  namePruduct: {
    fontSize: 16,
    fontWeight: "500",
  },

  price: {
    color: COLORS.mainColor,
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 10,
  },

  rate: {
    flexDirection: "row",
    alignItems: "center",
  },

  star: {
    width: 23,
    height: 23,
  },

  btnItem: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
});
