import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import COLORS from "../../assets/colors";
import { useSelector } from "react-redux";
const { width, height } = Dimensions.get("screen");

const Categories = ({ categories, navigation, }) => {
  const [data, setData] = useState();

 

  useEffect(() => {
    setData(categories);
  }, [categories, navigation]);

  const Category = ({ item, index }) => {
   

 const dataLength = categories.length

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("subcategories", {
            name: item.name,
            id: item._id,
          })
        }
        style={[
          styles.category,
          {
            marginRight: dataLength - 1 === index ? 16 : 0,
          },
        ]}
        key={index}
      >
        <View
          style={{
            width: 90,
            height: 60,
            backgroundColor: "#EEE",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
            borderRadius: 10,
          }}
        >
          <Image
            style={{
              width: "70%",
              height: "70%",
              resizeMode: "contain",
            }}
            source={{
              uri: `http://172.20.10.4:4000/CategoriesImages/${item.image}`,
            }}
          />
        </View>
        <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: COLORS.secondaryColor,
            }}
          >
            {item.name}
          </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={Category}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled={true}
        snapToInterval={106}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  category: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginLeft: 16,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    width: width - 32,
    height: 100,
  },

  backBtn: {
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
