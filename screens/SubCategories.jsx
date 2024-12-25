import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import COLORS from "../assets/colors";
import back from "../assets/images/icons/back.png";
import axios from "axios";
import Categories from "../components/home-compnents/Categories";
const { width, height } = Dimensions.get("screen");
import { useSelector } from "react-redux";
import FavoriteIcon from "../components/iconsComponents/FavoriteIcon";
import AddToCartIcon from "../components/iconsComponents/AddToCartIcon";
const SubCategories = ({ route, navigation }) => {
  const [subCategories, setSubCategories] = useState([]);
  const [mainCategoryId, setMainCategoryId] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const productsList = useSelector(
    (state) => state.productsReducer.productsList
  );

  useEffect(() => {
    const getSubCategories = async (id) => {
      try {
        const response = await axios.get(
          `http://172.20.10.4:4000/api/category/${id}/subcategories`
        );
        const fetchedSubCategories = response.data.subCategories || [];
        setSubCategories(fetchedSubCategories || []);
        for (let index = 0; index < fetchedSubCategories.length; index++) {
          if (id === fetchedSubCategories[index].mainCategory) {
            setMainCategoryId(fetchedSubCategories[index].mainCategory);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSubCategories(route.params.id);
  }, [route.params.id, navigation]);

  useEffect(() => {
    const filtered = productsList.filter(
      (item) => item.mainCategory._id === route.params.id
    );
    setFilteredProducts(filtered);
  }, [productsList, route.params, navigation]);

  const Category = ({ item, index }) => {
    const dataLength = subCategories.length;

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("brands", {
            name: item.name,
            mainCategoryId: mainCategoryId,
            subCategoryId: item._id,
          })
        }
        style={[
          styles.category,
          {
            marginRight: dataLength - 1 === index ? 16 : 0,
          },
        ]}
        key={index}
      >
        <View
          style={{
            width: 90,
            height: 60,
            backgroundColor: "#EEE",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
            borderRadius: 10,
          }}
        >
          <Image
            style={{
              width: "70%",
              height: "70%",
              resizeMode: "contain",
            }}
            source={{
              uri: `http://172.20.10.4:4000/SubCategoriesImages/${item.image}`,
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "500",
            color: COLORS.secondaryColor,
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

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
            uri: `http://172.20.10.4:4000/ProductsImages/${item.images[0]}`,
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
        <AddToCartIcon item={{ productId: item }} />
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

      <FlatList
        data={subCategories}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={Category}
        contentContainerStyle={{ paddingBottom: 20 }}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled={true}
        snapToInterval={106}
      />

      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      />
      <View
        style={{
          backgroundColor: "#fff",
          paddingHorizontal: 16,
          flex: 1,
        }}
      ></View>
    </View>
  );
};

export default SubCategories;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },

  category: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginLeft: 16,
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
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
