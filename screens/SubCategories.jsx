import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React, {useEffect, useState} from "react";
import COLORS from "../assets/colors";
import back from "../assets/images/icons/back.png";
import axios from "axios";
import Category from "../components/home-compnents/Categories";
const { width, height } = Dimensions.get("screen");
const SubCategories = ({route, navigation}) => {
  const [subCategories, setSubCategories] = useState([]);
    useEffect(() => {
      const getSubCategories = async (id) => {
        try {
            const response = await axios.get(`http://172.20.10.4:4000/api/category/${id}/subcategories`);
             setSubCategories(response.data.subCategories || []);
        } catch (error) {
            console.log(error);
        }
      }
      getSubCategories(route.params.id);
    }, [route.params.id]);
    
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
          {route.params.name}
        </Text>

        <View
          style={{
            width: 50,
            height: 50,
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        ></View>
      </View>

      <Category categories={subCategories} navigation={navigation} navigateTo={"brands"}/>
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
