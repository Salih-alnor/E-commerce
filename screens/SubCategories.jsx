import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList
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
  const [subCategoryId, setSubCategoryId] = useState(null);
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
            setSubCategoryId(fetchedSubCategories[index].mainCategory);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSubCategories(route.params.subCategoryId);
  }, [route.params.categoryId, navigation]);

  useEffect(() => {
    const filtered = productsList.filter(
      (item) => item.mainCategory._id == route.params.subCategoryId
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
          title: item.title,
          price: item.price,
          description: item.description,
          images: item.images,
          sizes: item.sizes,
        })
      }
    >
      <FavoriteIcon
        productId={item._id}
        style={{
          tintColor: "#FFF",
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

      <Categories
        categories={subCategories}
        subCategoryId={subCategoryId}
        navigation={navigation}
        navigateTo={"brands"}
      />
      <View style={{
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        flex: 1,
      }}>
              <FlatList
                data={filteredProducts} // البيانات المعروضة
                renderItem={renderItem} // عنصر العرض
                keyExtractor={(item) => item._id} // مفتاح فريد لكل عنصر
                numColumns={2} // عدد الأعمدة
                // contentContainerStyle={styles.container} // تنسيق الحاوية
                showsVerticalScrollIndicator={false} // إخفاء مؤشر التمرير
              />
            </View>
    </View>
  );
};

export default SubCategories;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
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
