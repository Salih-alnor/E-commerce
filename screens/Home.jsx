import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/home-compnents/Header";
import COLORS from "../assets/colors";
import SearchBox from "../components/home-compnents/SearchBox";
import SliderBox from "../components/home-compnents/SliderBox";
import Featured from "../components/home-compnents/Featured";
import Categories from "../components/home-compnents/Categories";
import axios from "axios";

const Home = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://172.20.10.4:4000/api/category");
        setCategories(response.data.categories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, [navigation]);

  const homeComponents = () => {
    return (
      <View>
        <SearchBox />
        <SliderBox />
        <Categories categories={categories} navigation={navigation} page={"home"} />
        <Featured title="Featured" navigation={navigation} />
        <Featured title="Most Popular" navigation={navigation} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header />
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
