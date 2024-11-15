import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, {useEffect, useState} from "react";
import COLORS from "../../assets/colors";


const Categories = ({categories, navigation, navigateTo, page}) => {
 const [data, setData] = useState();


useEffect(() => {
  setData(categories);
  // setSubCategoryId
}, [categories, navigation])


  const Category = ({ item, index }) => {
    const dataLength = data.length;
  
    return (
      <TouchableOpacity
      onPress={() => navigation.navigate(navigateTo, {
        name: item.name,
        slug: item.slug,
        image: item.image,
        categoryId: item.mainCategory || null,
        subCategoryId:  item._id,
      })}

        style={[
          styles.category,
          {
            marginRight: dataLength - 1 === index ? 16 : 0,
          },
        ]}
        key={index}
      >
        <View style={{
          width: 90,
          height: 60,
          backgroundColor: "#EEE",
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom:10,
          borderRadius: 10,
        }}>
          <Image style={{
            width: "70%",
            height: "70%",
            resizeMode: "contain",
      
          }} source={{uri: `http://172.20.10.4:4000/${page === "home" ? "CategoriesImages" : page === "brand"? "BrandsImages": "SubCategoriesImages"}/${item.image}`}}/>
        </View>
        {page !== "brand" ? <Text style={{
          fontSize: 14,
          fontWeight: "500",
        color: COLORS.secondaryColor
        }}>{item.name}</Text>: <View></View>}
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
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
