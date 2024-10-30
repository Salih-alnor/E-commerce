import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'

import casioWatch from "../assets/images/featured-products/casio-watch.png";
import adidasShoe from "../assets/images/featured-products/adidas-shoe.png";
import adidasShoe2 from "../assets/images/featured-products/adidas-shoe-2.png";
import adidasShoe3 from "../assets/images/featured-products/adidas-shoe-3.png";
import hoodie from "../assets/images/featured-products/hoodie.png";
import hoodie2 from "../assets/images/featured-products/hoodie-2.png";
import smartWatch from "../assets/images/featured-products/smart-watch.png";
import heart from "../assets/images/icons/heart.png";
import add from "../assets/images/icons/add.png";
import COLORS from "../assets/colors";

const { width, height } = Dimensions.get("screen");

const items = [
    {
      title: "Casio",
      price: 99.99,
      image: casioWatch,
    },

    {
      title: "Adidas",
      price: 129,
      image: adidasShoe,
      sizes: [45, 44, 43, 42, 41, 40, 39, 38]
    },

    {
      title: "Hoodie",
      price: 65.99,
      image: hoodie,
      sizes: ['4XL', '3XL', 'XXL', 'XL', 'L', 'M', 'S', 'XS']
    },

    {
      title: "Hoodie",
      price: 89.99,
      image: hoodie2,
      sizes: ['4XL', '3XL', 'XXL', 'XL', 'L', 'M', 'S', 'XS']
    },

    {
      title: "Adidas",
      price: 250,
      image: adidasShoe2,
      sizes: [45, 44, 43, 42, 41, 40, 39, 38]
    },

    {
      title: "Adidas",
      price: 190,
      image: adidasShoe3,
      sizes: [45, 44, 43, 42, 41, 40, 39, 38]
    },

    {
      title: "Smart Watch",
      price: 300,
      image: smartWatch,
    },

    {
      title: "Hoodie",
      price: 65.99,
      image: hoodie,
      sizes: ['4XL', '3XL', 'XXL', 'XL', 'L', 'M', 'S', 'XS']
    },

    {
      title: "Hoodie",
      price: 89.99,
      image: hoodie2,
      sizes: ['4XL', '3XL', 'XXL', 'XL', 'L', 'M', 'S', 'XS']
    },

    {
      title: "Adidas",
      price: 250,
      image: adidasShoe2,
      sizes: [45, 44, 43, 42, 41, 40, 39, 38]
    },

    {
      title: "Adidas",
      price: 190,
      image: adidasShoe3,
      sizes: [45, 44, 43, 42, 41, 40, 39, 38]
    },

    {
      title: "Smart Watch",
      price: 300,
      image: smartWatch,
    },

    {
      title: "Hoodie",
      price: 65.99,
      image: hoodie,
      sizes: ['4XL', '3XL', 'XXL', 'XL', 'L', 'M', 'S', 'XS']
    },

    {
      title: "Hoodie",
      price: 89.99,
      image: hoodie2,
      sizes: ['4XL', '3XL', 'XXL', 'XL', 'L', 'M', 'S', 'XS']
    },

    {
      title: "Adidas",
      price: 250,
      image: adidasShoe2,
      sizes: [45, 44, 43, 42, 41, 40, 39, 38]
    },

    {
      title: "Adidas",
      price: 190,
      image: adidasShoe3,
      sizes: [45, 44, 43, 42, 41, 40, 39, 38]
    },

    {
      title: "Smart Watch",
      price: 300,
      image: smartWatch,
    },
  ];

const Product = ({navigation}) => {
    const products = ({ item, index }) => {
        return (
          <TouchableOpacity
            style={[
              styles.card,
              {
                marginRight: index % 2 == 0 ? 8 : 0,
                marginLeft: index % 2 == 1 ? 8 : 0,
              },
            ]}
            onPress={() =>
              navigation.navigate("details", {
                title: item.title,
                price: item.price,
                image: item.image,
                sizes: item.sizes
              })
            }
          >
            <TouchableOpacity style={styles.heartIcon}>
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  tintColor: COLORS.white,
                }}
                source={heart}
              />
            </TouchableOpacity>
            <View style={styles.image}>
              <Image
                resizeMode="contain"
                style={{
                  width: "80%",
                  height: "90%",
                }}
                source={item.image}
              />
            </View>
            <View style={styles.infoCard}>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    marginVertical: 5,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: COLORS.mainColor,
                    fontSize: 15,
                    fontWeight: "500",
                  }}
                >
                  ${item.price}
                </Text>
              </View>
    
              <TouchableOpacity onPress={() => navigation.navigate("cart")} style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: COLORS.mainColor,
                justifyContent: 'center',
                  alignItems: 'center',
              }}>
                <Image style={{
                  width: "40%",
                  height: "40%",
                  tintColor: COLORS.white,
                }} source={add}/>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        );
      };
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={products}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default Product

const styles = StyleSheet.create({
    container: {
     paddingBottom: 100
    },

    card: {
        width: width / 2 - 24,
        height: 220,
        marginTop: 30,
        borderRadius: 8,
        overflow: "hidden",
       
      },
    
      image: {
        height: "70%",
        width: "100%",
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#DDD",
        borderRadius: 8,
      },
    
      infoCard: {
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
      },
    
      heartIcon: {
        position: "absolute",
        top: 8,
        right: 8,
        width: 30,
        height: 30,
        zIndex: 2,
      },
})