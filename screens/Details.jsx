import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import COLORS from "../assets/colors";

import heart from "../assets/images/icons/heart.png";
import cart from "../assets/images/tabBarIcons/bag.png";
import halfStar from "../assets/images/icons/half-star.png";
import back from "../assets/images/icons/back.png";

const { width, height } = Dimensions.get("screen");

const Details = ({ route, navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.productImage}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtnAndFavIcon}
            onPress={() => navigation.goBack()}
          >
            <Image style={styles.icon} source={back} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.backBtnAndFavIcon}>
            <Image
              style={[
                styles.icon,
                {
                  tintColor: COLORS.secondaryColor,
                },
              ]}
              source={heart}
            />
          </TouchableOpacity>
        </View>
        <Image
          resizeMode="contain"
          style={{
            width: "80%",
            height: "80%",
          }}
          source={route.params.image}
        />
      </View>
      <View style={styles.info}>
        <View style={styles.titleAndPrice}>
          <Text style={styles.title}>{route.params.title}</Text>
          <Text style={styles.price}>${route.params.price}</Text>
        </View>

        <View style={styles.rateWrapper}>
          <View style={styles.rate}>
            <View style={styles.star}>
              <Image
                style={{
                  tintColor: "gold",
                  width: "100%",
                  height: "100%",
                }}
                source={halfStar}
              />
            </View>
            <Text
              style={{
                fontSize: 16,
                marginRight: 8,
                marginLeft: 4,
                fontWeight: "800",
              }}
            >
              4.6
            </Text>
          </View>
          <TouchableOpacity>
            <Text
              style={{
                color: COLORS.secondaryColor,
                fontSize: 13,
              }}
            >
              {"("} 20 Review{")"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.descriptionWrapper}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
            }}
          >
            Description
          </Text>
          <Text
            style={{
              color: COLORS.secondaryColor,
              marginTop: 10,
              lineHeight: 20,
            }}
          >
            Culpa aliquam consequuntur veritatis at consequuntur praesentium
            beatae temporibus nobis. Velit dolorem facilis neque autem. Itaque
            voluptatem expedita qui eveniet id veritatis eaque. Blanditiis quia
            placeat nemo. Nobis laudantium nesciunt perspiciatis sit eligendi.
          </Text>
        </View>

        <View style={styles.sizeWrapper}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              marginVertical: 16,
              marginLeft: 16,
            }}
          >
            Size
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.sizes}
          >
            <TouchableOpacity style={styles.size}>
              <Text>44</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.size}>
              <Text>43</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.size}>
              <Text>42</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.size}>
              <Text>41</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.size}>
              <Text>40</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.size}>
              <Text>39</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.size, { marginRight: 16 }]}>
              <Text>38</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
      <View style={styles.buyAndCart}>
        <TouchableOpacity style={styles.buyBtn} onPress={() => navigation.navigate('Check Out')}>
          <Text style={{
            color: COLORS.white,
            fontSize: 18,
            fontWeight: "500"
          }}>Buy Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartBtn}>
          <Image style={{
            width: 30,
            height: 30,
            
          }} source={cart} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    height: "100%",
  },

  productImage: {
    width,
    height: height * 0.45,
    overflow: "hidden",
    backgroundColor: "#DDD",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    top: 60,
    width,
    height: 60,
    paddingHorizontal: 16,
    zIndex: 1,
  },

  backBtnAndFavIcon: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    width: "50%",
    height: "50%",
  },

  info: {
    paddingTop: 20,
  },

  titleAndPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 25,
    fontWeight: "500",
  },
  price: {
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.mainColor,
  },

  rateWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 30,
    paddingHorizontal: 16,
  },

  rate: {
    flexDirection: "row",
    alignItems: "center",
  },

  star: {   
    width: 23,
    height: 23,
  },

  descriptionWrapper: {
    paddingHorizontal: 16,
  },

  sizes: {
    flexDirection: "row",
  },

  size: {
    marginLeft: 16,
    width: 50,
    height: 50,
    borderColor: "#DDD",
    borderWidth: 0.3,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  buyAndCart: {
    flexDirection: "row",
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30
    
  },

  buyBtn: {
    width: "75%",
    height: 60,
    backgroundColor: COLORS.mainColor,
    alignItems: 'center',
    justifyContent: "center",
    borderRadius: 30,
  },

  cartBtn: {
    width: "25%",
    height: 60,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 16
  }
});
