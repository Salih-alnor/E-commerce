import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import COLORS from "../assets/colors";
import back from "../assets/images/icons/back.png";
import Product from "../components/Product";



const { width, height } = Dimensions.get("screen");

const Products = ({ navigation }) => {


 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Image style={{ width: "50%", height: "50%" }} source={back} />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
          }}
        >
          Products
        </Text>

        <View
          style={{
            width: 50,
            height: 50,
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
        </View>
      </View>

     <Product navigation={navigation}/>
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    // paddingBottom: 100
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
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

});
