import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import COLORS from "../../assets/colors";
import FavoriteIcon from "../iconsComponents/FavoriteIcon";


const { width, height } = Dimensions.get("screen");

const Featured = ({ title, navigation, products }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(products);
  }, [navigation, products]);



  const product = ({ item, index }) => {
    const itemsLength = products.length;
    return (
      <TouchableOpacity
        style={[
          styles.card,
          {
            marginRight: index === itemsLength - 1 ? 16 : 0,
          },
        ]}
        onPress={() =>
          navigation.navigate("details", {
            name: item.name,
            price: item.price,
            images: item.images,
            sizes: item.sizes,
            colors: item.colors,
            categoryId: item.mainCategory,
            subCategoryId: item.subCategory,
            brandId: item.brand,
            description: item.description,
            quantity: item.quantity,
            id: item._id,
          })
        }
      >

   
        <FavoriteIcon productId={item._id} style={{
              tintColor: "white",
              width: "100%",
              height: "100%",
            }} heartIcon={{
              position: "absolute",
              top: 8,
              right: 8,
              width: 30,
              height: 30,
              zIndex: 2,
            }}/>
      
        
        <View style={styles.image}>
          <Image
            resizeMode="contain"
            style={{
              width: "80%",
              height: "80%",
            }}
            source={{
              uri: `http://172.20.10.4:4000/ProductsImages/${item.images[0]}`,
            }}
          />
        </View>
        <View style={styles.infoCard}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              marginVertical: 5,
            }}
          >
            {item.name}
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
        <TouchableOpacity onPress={() => navigation.navigate("products")}>
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
        data={data}
        renderItem={product}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Featured;

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginHorizontal: 16,
  },

  card: {
    width: width / 2.99,
    height: 160,
    marginLeft: 16,
    marginTop: 20,
    borderRadius: 8,
    overflow: "hidden",
  },

  image: {
    height: "65%",
    width: "100%",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEE",
    borderRadius: 8,
  },

  infoCard: {
    paddingHorizontal: 10,
  },


});
