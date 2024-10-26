import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React from "react";
import COLORS from "../../assets/colors";
import casioWatch from "../../assets/images/featured-products/casio-watch.png";
import adidasShoe from "../../assets/images/featured-products/adidas-shoe.png";
import adidasShoe2 from "../../assets/images/featured-products/adidas-shoe-2.png";
import adidasShoe3 from "../../assets/images/featured-products/adidas-shoe-3.png";
import hoodie from "../../assets/images/featured-products/hoodie.png";
import hoodie2 from "../../assets/images/featured-products/hoodie-2.png";
import smartWatch from "../../assets/images/featured-products/smart-watch.png";

import heart from "../../assets/images/icons/heart.png"



const { width, height } = Dimensions.get("screen");

const Featured = ({title, navigation}) => {
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
    },

    {
      title: "Hoodie",
      price: 65.99,
      image: hoodie,
    },

    {
      title: "Hoodie",
      price: 89.99,
      image: hoodie2,
    },

    {
      title: "Adidas",
      price: 250,
      image: adidasShoe2,
    },

    {
      title: "Adidas",
      price: 190,
      image: adidasShoe3,
    },

    {
      title: "Smart Watch",
      price: 300,
      image: smartWatch,
    },
  ];

 


  const product = ({item, index}) => {
   
    const itemsLength = items.length;
    return (
      <TouchableOpacity key={index} style={[styles.card, {
        marginRight: index === itemsLength - 1 ? 16 : 0
      }]}
      onPress={() => navigation.navigate("details", {
        title: item.title,
        price: item.price,
        image: item.image
      })}  
      >

        <TouchableOpacity style={styles.heartIcon}>
          <Image style={{
            width: "100%",
            height: "100%",
            tintColor: COLORS.white
          }} source={heart}/>
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
          <Text style={{
            fontSize: 18,
            fontWeight: "500",
            marginVertical: 5
          }}>{item.title}</Text>
          <Text style={{
            color: COLORS.mainColor,
            fontSize: 15,
            fontWeight: "500"
          }}>${item.price}</Text>
          
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
          }}
        >
          {title}
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              color: COLORS.mainColor,
            }}
          >
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        snapToInterval={width / 2.99 + 16}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={items}
        renderItem={product}
        keyExtractor={(item, index) => index.toString()}
      />
      
    </View>
  );
};

export default Featured;

const styles = StyleSheet.create({
  container: {
   marginVertical: 10
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginHorizontal: 16,
  },

  card: {
    width: width / 2.99,
    height: 180,
    marginLeft: 16,
    marginTop: 20,
    borderRadius: 8,
    overflow: "hidden",
  },

  image: {
    height: "60%",
    width: "100%",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDD",
    borderRadius: 8
  },

  infoCard: {
    paddingHorizontal: 10
  },

  heartIcon: {
    position: "absolute",
    top: 8, right: 8,
    width: 30, height: 30,
    zIndex: 2,
  }
});
