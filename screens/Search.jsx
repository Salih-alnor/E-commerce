import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
} from "react-native";
import React, {useEffect, useState} from "react";
import COLORS from "../assets/colors";
import back from "../assets/images/icons/back.png";
import clear from "../assets/images/icons/remove.png";
import search from "../assets/images/icons/search.png";
import Products from "./Products";
import Product from "../components/Product";
import { useSelector } from 'react-redux';
import filter from 'lodash.filter';
const { width, height } = Dimensions.get("screen");

const Search = ({ navigation }) => {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("")
  const productsList = useSelector((state) => state.productsReducer.productsList)
useEffect(() => {
  setData(productsList)
  setFullData(productsList)
  
}, [productsList])



  const handleSearch = (query) => {
    setText(query);
    setSearchQuery(query);
    if (query.length === 0) {
      setData(fullData);
      return;
    }
    const formattedQuery = query.toLowerCase();
    const filterData = filter(fullData, (product) => {
     return contains(product, formattedQuery); 
    
    });
    setData(filterData)
    
 };

 const contains = ({ name, brand }, formattedQuery) => {
  const nameBrand = brand.name;
  if (name.toLowerCase().includes(formattedQuery) || nameBrand.toLowerCase().includes(formattedQuery)) {
    return true;
  }
  return false;
};


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Image style={{ width: "50%", height: "50%" }} source={back} />
        </TouchableOpacity>

        <View style={styles.searchBox}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: width - 82,
              height: 40,
            }}
          >
            <View
              style={{
                width: 24,
                height: 24,
                marginRight: 10,
              }}
            >
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  tintColor: COLORS.secondaryColor,
                }}
                source={search}
              />
            </View>
            <TextInput
              keyboardType="search"
              value={searchQuery}
              
              onChangeText={(query) => handleSearch(query)}
              placeholder="Search"
              placeholderTextColor={
                Platform.OS == "ios"
                  ? COLORS.secondaryColor
                  : COLORS.secondaryColor
              }
              style={{
                fontSize: 18,
                width: width - 150,
                textDecorationLine: "none",
              }}
            />
          </View>
          {text !== "" && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => {
                setSearchQuery(""),
                setData(fullData)
              }}
            >
              <Image style={styles.clearButtonText} source={clear} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.searchResults}>
         <View style={{
          flexDirection: "row"
         }}>
          <Text style={{fontSize: 16, color: COLORS.secondaryColor, fontWeight: "400"}}>Results for </Text>
          {searchQuery ? <Text style={{fontSize: 16, fontWeight: "500"}}>"{searchQuery}"</Text>: <Text></Text>}
         </View>
         <Text style={{fontSize: 14, color: COLORS.mainColor, fontWeight: "500"}}>{data.length} Results Found</Text>
      </View>
      <Product navigation={navigation} data={data}/>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
    flex: 1,
    paddingBottom: 50
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
    width: width - 32,
    height: 100,
  },

  backBtn: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  searchBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 45,
    width: width - 82,
  },

  clearButton: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 13,
    right: 10,
    zIndex: 1,
    borderRadius: 20,
  },

  clearButtonText: {
    width: "100%",
    height: "100%",
  },

  searchResults: {
   width: width - 32,
   height: 40,
   flexDirection: "row",
   alignItems: "center",
   justifyContent: "space-between"
  }
});
