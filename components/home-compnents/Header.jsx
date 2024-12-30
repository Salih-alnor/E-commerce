import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import COLORS from "../../assets/colors";
import favorites from "../../assets/images/icons/heart.png";
import { useSelector } from "react-redux";

const Header = ({ navigation, favoritesList }) => {
  
const products = favoritesList || 0;

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
          paddingTop: 50,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={styles.profile}>
            <Image
              style={styles.profileImage}
              source={{
                uri: "http://172.20.10.4:4000/ProfileImage/profile.png",
              }}
            />
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <Text>Hello!</Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              Salih alnor
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.favorites}
          onPress={() => navigation.navigate("favorites")}
        >
          {products.length > 0 ? (
            <View
              style={{
                position: "absolute",
                top: -16,
                right: -10,
                height: 20,
                minWidth: 20,
                backgroundColor: COLORS.mainColor,
                borderRadius: 10,
                paddingHorizontal: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{
                    color: COLORS.white,
                    width: "100%",
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  {products.length}
                </Text>
              </View>
            </View>
          ) : null}
          <Image
            style={[
              styles.profileImage,
              {
                tintColor: COLORS.secondaryColor,
              },
            ]}
            source={favorites}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  container: {
    height: 130,
    paddingHorizontal: 16,
  },

  profile: {
    width: 50,
    height: 50,
    overflow: "hidden",
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
  },

  profileImage: {
    width: "100%",
    height: "100%",
  },

  userInfo: {
    marginLeft: 10,
  },

  favorites: {
    width: 35,
    height: 35,
    borderWidth: 0.9,
    borderColor: "#ddd",
    padding: 4,
    borderRadius: 6,
  },
});
