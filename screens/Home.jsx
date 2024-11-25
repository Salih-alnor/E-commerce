import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/home-compnents/Header";
import COLORS from "../assets/colors";
import SearchBox from "../components/home-compnents/SearchBox";
import SliderBox from "../components/home-compnents/SliderBox";
import Featured from "../components/home-compnents/Featured";
import Categories from "../components/home-compnents/Categories";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";



const Home = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const favorite =  useSelector((state) => state.reducer.favoritesList)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        
        const response = await axios.get("http://172.20.10.4:4000/api/category");
        setCategories(response.data.categories);
        
    
      } catch (error) {
        console.log(error);
      }
    };

    const getProducts = async () => {
      try {
        const response = await axios.get("http://172.20.10.4:4000/api/product");
         setProducts(response.data.products);
      } catch (error) {
        
      }
    }

    const getFavoritesList = async () => {
      try {
        const response = await axios.get(
          "http://172.20.10.4:4000/api/favorite"
        );

       
        dispatch({ type: "setFavorites",payload: response.data });
        
      } catch (error) {
        console.log(error);
      }
    };

    const getCartItems = async () => {
      try {
        const response = await axios.get(
          `http://172.20.10.4:4000/api/cart/6741898a4eb5cfdaf31b7d3e`
        );
        // console.log(response.data.items);
        const data = {
          items: response.data.items,
          totalPrice: response.data.totalPrice,
        
        }
        dispatch({ type: "getCartItems", payload: data });
       
      } catch (error) {
        console.log(error);
      }
    };


    getCartItems();
    getFavoritesList();
    fetchCategories();
    getProducts();
  }, [navigation ]);

  const homeComponents = () => {
    return (
      <View>
        <SearchBox />
        <SliderBox />
        <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          marginLeft: 16,
        }}
      >
        Categories
      </Text>
        <Categories categories={categories} navigation={navigation} navigateTo={"subcategories"} page={"home"}/>
        <Featured title="Featured" navigation={navigation} products={products} />
        <Featured title="Most Popular" navigation={navigation} products={products}/>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header navigation={navigation} favoritesList={favorite}/>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[""]}
        renderItem={homeComponents}
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
