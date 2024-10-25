import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/home-compnents/Header";
import COLORS from "../assets/colors";
import SearchBox from "../components/home-compnents/SearchBox";
import SliderBox from "../components/home-compnents/SliderBox";
import Featured from "../components/home-compnents/Featured";



const Home = ({navigation}) => {
  const homeComponents = () => {
    return (
      <View>
        
        <SearchBox />
        <SliderBox />
        <Featured title="Featured" navigation={navigation}/>
        <Featured title="Most Popular"/>
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
