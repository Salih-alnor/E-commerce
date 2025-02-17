import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/home-compnents/Header";
import COLORS from "../assets/colors";
import SearchBox from "../components/home-compnents/SearchBox";
import SliderBox from "../components/home-compnents/SliderBox";
import Featured from "../components/home-compnents/Featured";
import Categories from "../components/home-compnents/Categories";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../services/productService";
import { getCategories } from "../services/categoresService";
import { getCartItems } from "../services/cartService";
import { getFavoritesList } from "../services/favoritesService";

const Home = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favoritesReducer.favoritesList);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        dispatch({ type: "getProducts", payload: productsData });

        const cart = await getCartItems();
        
        const cartData = {
          cartId: cart._id,
          items: cart.items,
          totalPrice: cart.totalPrice,
        }
        dispatch({ type: "getCartItems", payload: cartData });

        const favoriteData = await getFavoritesList();

        dispatch({ type: "setFavorites", payload: favoriteData });

        const categoriesData = await getCategories();
        setCategories(categoriesData.categories);
      } catch (error) {
        console.log(error.response.data.error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} favoritesList={favorite} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[""]}
        renderItem={() => (
          <View>
            <SearchBox />
            <SliderBox />
            <Text style={{ fontSize: 20, fontWeight: "600", marginLeft: 16 }}>
              Categories
            </Text>
            <Categories
              categories={categories}
              navigation={navigation}
              navigateTo="subcategories"
              page="home"
            />
            <Featured
              title="Featured"
              navigation={navigation}
              products={products}
            />
            <Featured
              title="Most Popular"
              navigation={navigation}
              products={products}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
