import { Image, StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import COLORS from "../assets/colors";

import heart from "../assets/images/icons/heart.png"
import back from "../assets/images/icons/back.png"
import shoe from "../assets/images/featured-products/adidas-shoe-2.png"

const { width, height } = Dimensions.get("screen");

const Details = () => {
  return (
    <View style={styles.container}>
       {/* <View style={styles.header}>
        <View style={styles.backBtn}>
            <Image source={back}/>
        </View>

        <View style={styles.favIcon}>
            <Image source={heart}/>
        </View>
       </View> */}

       <View style={styles.productImage}>
        <Image resizeMode='contain' style={{
            width: "100%",
            height: "100%"
        }} source={shoe}/>
       </View>
    </View>
  )
}

export default Details

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flex: 1
    },

    productImage: {
        width,
        height: height * .47,
        overflow: "hidden",
        backgroundColor: "#DDD"
    }
})