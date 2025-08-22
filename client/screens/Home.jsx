import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/home-compnents/Header";
import COLORS from "../assets/colors";
import SearchBox from "../components/home-compnents/SearchBox";
import SliderBox from "../components/home-compnents/SliderBox";
import Featured from "../components/home-compnents/Featured";
import Categories from "../components/home-compnents/Categories";


const Home = ({ route, navigation }) => {
  const { favoriteList, productsList, categoriesList } = route.params;

  return (
    <View style={styles.container}>
      <Header navigation={navigation} favoritesList={favoriteList} />
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
              categories={categoriesList}
              navigation={navigation}
              navigateTo="subcategories"
              page="home"
            />
            <Featured
              title="Featured"
              navigation={navigation}
              products={productsList}
            />
            <Featured
              title="Most Popular"
              navigation={navigation}
              products={productsList}
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
