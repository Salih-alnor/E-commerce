import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import COLORS from "../assets/colors";
import axios from "axios";
import cart from "../assets/images/tabBarIcons/bag.png";
import halfStar from "../assets/images/icons/half-star.png";
import back from "../assets/images/icons/back.png";
import FavoriteIcon from "../components/iconsComponents/FavoriteIcon";
import { useDispatch, useSelector } from "react-redux";
const { width, height } = Dimensions.get("screen");

const Details = ({ route, navigation }) => {
  const item = route.params;
  const images = item.images;

const dispatch = useDispatch()
const cartItems = useSelector((state) => state.cartReducer.cartItems.items);

  const addProductToCart = async (id) => {
    data = {
      productId: id,
      quantity: 1,
      price: item.price
  }
 
      try {
          const response = await axios.post(`http://172.20.10.4:4000/api/cart`, data,
          
          
          {
              headers: {
                'Content-Type': 'application/json', 
              },
            }
          
          )
          console.log(response.data.message)
          const payload = {
            items: response.data.newCart.items,
            totalPrice: response.data.newCart.totalPrice,
          
          }

          dispatch({ type: "getCartItems",payload });

        
      } catch (error) {
          console.log(error);
      }
  }

  return (
    <View style={styles.container}>
      <View style={styles.productImage}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtnAndFavIcon}
            onPress={() => navigation.goBack()}
          >
            <Image style={styles.icon} source={back} />
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.backBtnAndFavIcon}
          
          >
            <FavoriteIcon style={{
              tintColor: "#DDD",
              width: "60%",
              height: "60%",
            }} heartIcon={{
              width: 50,
              height: 50,
              borderRadius: 50,
              backgroundColor: COLORS.white,
              justifyContent: "center",
              alignItems: "center",
            }} productId={item.id}/>
          </TouchableOpacity>

          
        </View>
        <ScrollView
          horizontal
          snapToInterval={width - 16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={true}
        >
          {images.map((image, index) => {
            return (
              <Image
                key={index}
                resizeMode="contain"
                style={{
                  width,
                  height: height * 0.35,
                  marginTop: 50,
                }}
                source={{
                  uri: `http://172.20.10.4:4000/ProductsImages/${image}`,
                }}
              />
            );
          })}
        </ScrollView>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.info}>
        <View style={styles.titleAndPrice}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>

        <View style={styles.rateWrapper}>
          <View style={styles.rate}>
            <View style={styles.star}>
              <Image
                style={{
                  tintColor: "gold",
                  width: "100%",
                  height: "100%",
                }}
                source={halfStar}
              />
            </View>
            <Text
              style={{
                fontSize: 16,
                marginRight: 8,
                marginLeft: 4,
                fontWeight: "800",
              }}
            >
              4.6
            </Text>
          </View>
          <TouchableOpacity>
            <Text
              style={{
                color: COLORS.secondaryColor,
                fontSize: 13,
              }}
            >
              {"("} 20 Review{")"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.descriptionWrapper}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
            }}
          >
            Description
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                color: COLORS.secondaryColor,
                marginTop: 10,
                lineHeight: 20,
              }}
              numberOfLines={4}
            >
              {item.description}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sizeWrapper}>
          {item.sizes.length > 0 ? (
            <Text
              style={{
                fontSize: 20,
                fontWeight: "500",
                marginVertical: 16,
                marginLeft: 16,
              }}
            >
              Size
            </Text>
          ) : (
            <View></View>
          )}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.sizes}
          >
            {item.sizes.length > 0 ? (
              item.sizes.map((size, index) => {
                const lengthSizes = item.sizes.length;
                return (
                  <TouchableOpacity
                    style={[
                      styles.size,
                      {
                        marginRight: index === lengthSizes - 1 ? 16 : 0,
                      },
                    ]}
                    key={index}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                      }}
                    >
                      {size}
                    </Text>
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text style={{ height: 50 }}></Text>
            )}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.buyAndCart}>
        <TouchableOpacity
          style={styles.buyBtn}
          onPress={() => navigation.navigate("cart")}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 18,
              fontWeight: "500",
            }}
          >
            Buy Now
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartBtn} onPress={() => addProductToCart(item.id) }>
       {cartItems.length > 0 ? 
       ( <View style={{
        position: "absolute",
        top: -5,
        right: 5,
        height: 20,
        minWidth: 20,
        backgroundColor: COLORS.mainColor,
        borderRadius: 10,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View>
          <Text style={{
          color: COLORS.white,
          width: "100%",
          fontSize: 14,
          fontWeight: "600",
        }}>{cartItems.length}</Text>
        </View>
      </View>) : (<View></View>)}
          <Image
            style={{
              width: 30,
              height: 30,
            }}
            source={cart}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    height: "100%",
  },

  productImage: {
    width,
    height: height * 0.45,
    overflow: "hidden",
    backgroundColor: "#EEE",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    top: 60,
    width,
    height: 60,
    paddingHorizontal: 16,
    zIndex: 1,
  },

  backBtnAndFavIcon: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    width: "50%",
    height: "50%",
  },

  info: {
    paddingTop: 20,
  },

  titleAndPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 25,
    fontWeight: "500",
  },
  price: {
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.mainColor,
  },

  rateWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 30,
    paddingHorizontal: 16,
  },

  rate: {
    flexDirection: "row",
    alignItems: "center",
  },

  star: {
    width: 23,
    height: 23,
  },

  descriptionWrapper: {
    paddingHorizontal: 16,
  },

  sizes: {
    flexDirection: "row",
  },

  size: {
    marginLeft: 16,
    width: 50,
    height: 50,
    borderColor: "#DDD",
    borderWidth: 0.3,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  buyAndCart: {
    flexDirection: "row",
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  buyBtn: {
    width: "75%",
    height: 60,
    backgroundColor: COLORS.mainColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },

  cartBtn: {
    width: "25%",
    height: 60,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 16,
  },
});
