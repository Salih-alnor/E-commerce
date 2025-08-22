import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import back from "../assets/images/icons/back.png";
import AddToCartIcon from "../components/iconsComponents/AddToCartIcon";
import FavoriteIcon from "../components/iconsComponents/FavoriteIcon";
import COLORS from "../assets/colors";
const { width, height } = Dimensions.get("screen");

const Brand = ({ route, navigation }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const productsList = useSelector(
    (state) => state.productsReducer.productsList
  );

  

  useEffect(() => {
    const filtered = productsList.filter(
      (item) =>
        item.mainCategory._id === route.params.mainCategoryId &&
        item.subCategory._id === route.params.subCategoryId &&
        item.brand._id === route.params.brandId
    );
    setFilteredProducts(filtered);
  }, [productsList, route.params]);

  const renderItem = ({ item, index }) => (
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
          name: item.name,
          price: item.price,
          description: item.description,
          images: item.images,
          sizes: item.sizes,
          id: item._id
        })
      }
    >
      <FavoriteIcon
        productId={item._id}
        style={{
          tintColor: item.isFavorite ? COLORS.red : COLORS.white,
          width: "100%",
          height: "100%",
        }}
        heartIcon={{
          position: "absolute",
          top: 8,
          right: 8,
          width: 35,
          height: 35,
          zIndex: 2,
        }}
      />
      <View style={styles.image}>
        <Image
          resizeMode="contain"
          style={{
            width: "80%",
            height: "90%",
          }}
          source={{
            uri: `http://172.20.10.2:4000/ProductsImages/${item.images[0]}`,
          }}
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
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            ${item.price}
          </Text>
        </View>
        <AddToCartIcon item={item} />
      </View>
    </TouchableOpacity>
  );

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
          {route.params.name}
        </Text>

        <View
          style={{
            width: 100,
            height: 50,
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        ></View>
      </View>

      {filteredProducts != null ? (
        <FlatList
          data={filteredProducts} 
          renderItem={renderItem} 
          keyExtractor={(item) => item._id} 
          numColumns={2} 
          contentContainerStyle={{ paddingHorizontal: 16 }} 
          showsVerticalScrollIndicator={false} 
        />
      ) : (
        <View>
          <Text>Not products found</Text>
        </View>
      )}
    </View>
  );
};

export default Brand;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingBottom: 20,
    flex: 1,
  },

  header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    height: 100,
  },

  backBtn: {
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "flex-start",
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
    backgroundColor: "#EEE",
    borderRadius: 8,
  },

  infoCard: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});
