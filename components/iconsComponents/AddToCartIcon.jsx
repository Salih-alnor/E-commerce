import { StyleSheet, Image, View, TouchableOpacity } from 'react-native'
import React from 'react'
import add from "../../assets/images/icons/add.png";
import COLORS from "../../assets/colors";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";

const AddToCartIcon = ({item}) => {
const dispatch = useDispatch();
    const addProductToCart = async (item) => {
      data = {
        productId: item._id,
        quantity: 1,
        price: item.price
    }
   
        try {
            const response = await axios.post(`http://172.20.10.4:4000/api/cart`, data,
            
            
            {
                headers: {
                  'Content-Type': 'application/json', 
                },
              }
            
            )

            dispatch({ type: "getCartItems",payload: response.data.newCart });

            // console.log(response.data.newCart);
        } catch (error) {
            console.log(error);
        }
    }
    
  return (
    <TouchableOpacity
    style={{
      backgroundColor: COLORS.mainColor,
      width: 30,
      height: 30,
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center",
      justifyContent: "center",
    }}
    onPress={() => addProductToCart(item.productId)}
  >
    <Image
      style={{
        width: "50%",
        height: "50%",
        tintColor: COLORS.white,
      }}
      source={add}
    />
  </TouchableOpacity>
  )
}

export default AddToCartIcon

const styles = StyleSheet.create({})