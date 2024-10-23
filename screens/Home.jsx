import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/home-compnents/Header";
import COLORS from "../assets/colors";
import SearchBox from "../components/home-compnents/SearchBox";

const Home = () => {
  const homeComponents = () => {
    return (
      <View>
        <Header />
        <SearchBox />
      </View>
    );
  };
  return <View style={styles.container}>
    <FlatList 
    data={[""]}
    renderItem={homeComponents}
    keyExtractor={(item, index) => index.toString()}
    />
  </View>;
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
