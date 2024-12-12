import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from "../assets/colors";
import { useSelector } from 'react-redux';
import FavoriteIcon from './iconsComponents/FavoriteIcon';
import AddToCartIcon from './iconsComponents/AddToCartIcon';

const { width, height } = Dimensions.get("screen");



const Product = ({navigation, data}) => {
  const [items, setItems] = useState([])
  const productsList = useSelector((state) => state.productsReducer.productsList)
  useEffect(() => {
  if(data) {
    setItems(data)
  } else {
    setItems(productsList)
  }
  },[data, navigation])
    const products = ({ item, index }) => {

   
        return (
          <TouchableOpacity
            style={[
              styles.card,
              {
                marginRight: index % 2 == 0 ? 8 : 0,
                marginLeft: index % 2 == 1 ? 8 : 0,
              },
            ]}
            onPress={() =>
              navigation.navigate("details", {
                title: item.title,
                price: item.price,
                description: item.description,
                images: item.images,
                sizes: item.sizes
              })
            }
          >
          

            <FavoriteIcon productId={item._id} style={{
              tintColor: "#FFF",
              width: "100%",
              height: "100%",
            }} heartIcon={{
        position: "absolute",
        top: 8,
        right: 8,
        width: 35,
        height: 35,
        zIndex: 2,
      }}/>
            <View style={styles.image}>
              <Image
                resizeMode="contain"
                style={{
                  width: "80%",
                  height: "90%",
                }}
                source={{uri: `http://172.20.10.4:4000/ProductsImages/${item.images[0]}`}}
              />
            </View>
            <View style={styles.infoCard}>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    marginVertical: 5,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: COLORS.mainColor,
                    fontSize: 16,
                    fontWeight: "500",
                  }}
                >
                  ${item.price}
                </Text>
              </View>
    
             
            <AddToCartIcon item={{productId: item}}/>
            </View>
          </TouchableOpacity>
        );
      };
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={products}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default Product

const styles = StyleSheet.create({
    container: {
     paddingBottom: 100
    },

    card: {
        width: width / 2 - 24,
        height: 220,
        marginTop: 30,
        borderRadius: 8,
        overflow: "hidden",
       
      },
    
      image: {
        height: "70%",
        width: "100%",
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EEE",
        borderRadius: 8,
      },
    
      infoCard: {
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
      },
    
      
})