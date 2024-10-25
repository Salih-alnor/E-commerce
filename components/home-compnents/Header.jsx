import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import COLORS from "../../assets/colors";
import profile from "../../assets/images/profile.jpg";
import notification from "../../assets/images/icons/notification.png";

const Header = () => {
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
            <Image style={styles.profileImage} source={profile} />
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
        <TouchableOpacity style={styles.notificationIcon}>
          <Image
            style={[
              styles.profileImage,
              {
                tintColor: COLORS.secondaryColor,
              },
            ]}
            source={notification}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  container: {
    height: 150,
    paddingHorizontal: 16,
  },

  profile: {
    width: 60,
    height: 60,
    overflow: "hidden",
    borderRadius: 60,
  },

  profileImage: {
    width: "100%",
    height: "100%",
  },

  userInfo: {
    marginLeft: 10,
  },

  notificationIcon: {
    width: 24,
    height: 24,
  },
});
