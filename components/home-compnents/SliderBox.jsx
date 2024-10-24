import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";
import COLORS from "../../assets/colors";
import shoes from "../../assets/images/slideBox/nike-shoes.png";
import shirt from "../../assets/images/slideBox/T-shirt.png";
import headPhone from "../../assets/images/slideBox/head-phone.png";
import smartWatch from "../../assets/images/slideBox/smart-watch.png";

const SliderBox = () => {
  const data = [
    {
      title: "",
      subTitle: "",
      offer: 20,
      image: headPhone,
    },

    {
      title: "",
      subTitle: "",
      offer: 20,
      image: smartWatch,
    },

    {
      title: "",
      subTitle: "",
      offer: 20,
      image: shoes,
    },

    {
      title: "",
      subTitle: "",
      offer: 20,
      image: shirt,
    },
  ];
  return (
    <View style={styles.container}>
      <Swiper
        style={{
          paddingTop: 40,
          paddingBottom: 30,
        }}
        autoplay={true}
        showsPagination={true}
        dotStyle={{
          width: 9,
          height: 9,
          borderRadius: 10
        }}
        activeDotStyle={{
          width: 20,
          height: 9,
          borderRadius: 10
        }}
        activeDotColor={COLORS.mainColor}
      >
        {data.map((item, index) => {
          return (
            <TouchableOpacity style={styles.slide} key={index} >
              <View style={styles.info}>
                <Text style={styles.title}>Get Winter Discount</Text>
                <Text style={styles.subTitle}>For Children</Text>
                <Text style={styles.offer}>20% Off</Text>
              </View>
              <View>
                <Image
                  style={{
                    width: 150,
                    height: 160,
                    bottom: 25,
                    zIndex: 2,
                  }}
                  source={item.image}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </Swiper>
    </View>
  );
};

export default SliderBox;

const styles = StyleSheet.create({
  container: {
    height: 250,
  },

  slide: {
    backgroundColor: COLORS.mainColor,
    height: "60%",
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 16,
  },

  title: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: "bold",
  },

  subTitle: {
    fontSize: 18,
    color: COLORS.white,
    marginVertical: 8,
  },

  offer: {
    fontSize: 25,
    color: COLORS.white,
    fontWeight: "bold",
  },
});
