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

import profile from "../assets/images/icons/profile.png";
import setting from "../assets/images/icons/setting.png";
import mail from "../assets/images/icons/mail.png";
import share from "../assets/images/icons/share.png";
import help from "../assets/images/icons/help.png";
import next from "../assets/images/icons/next.png";



const { width, height } = Dimensions.get("screen");

const sections = [
  {
    image: profile,
    title: "Profile",
    page: "userInformation",
  },

  {
    image: setting,
    title: "Settings",
    page: "settings",
  },

  {
    image: mail,
    title: "Contact",
    page: "contact",
  },

  {
    image: share,
    title: "Share App",
    page: "shareApp",
  },

  {
    image: help,
    title: "Help",
    page: "help",
  },
];

const Profile = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <TouchableOpacity style={styles.imageWrapper}>
          <Image
            resizeMode="contain"
            style={{
              width: "100%",
              height: "100%",
            }}
            source={{uri: "http://172.20.10.4:4000/ProfileImage/profile.png"}}
          />
        </TouchableOpacity>
        <Text style={styles.userName}>Salih alnor</Text>
        <Text style={styles.email}>salihalnor1996@gmail.com</Text>
      </View>
      
      <ScrollView>
        <View style={styles.sections}>
          {sections.map((item, index) => {
            return (
              <TouchableOpacity style={styles.section} key={index} onPress={() => navigation.navigate(item.page)}>
                <View style={styles.iconSection}>
                  <View style={styles.iconWrapper}>
                    <Image style={styles.image} source={item.image} />
                  </View>
                  <Text
                    style={{
                      color: "#999",
                      fontSize: 16,
                      fontWeight: "500",
                      marginLeft: 10,
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
                <View style={styles.iconWrapper}>
                  <Image style={[styles.image, {
                    tintColor: "#9999"
                  }]} source={next} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.signOut}>
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: "#F55F1F",
              }}
            >
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
  },

  profile: {
    height: height / 3.4,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
  },

  userName: {
    fontSize: 25,
    fontWeight: "600",
    marginVertical: 8,
  },

  email: {
    fontSize: 16,
    color: COLORS.secondaryColor,
  },

  sections: {
    marginTop: 60,
  },

  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    height: 30,
    marginVertical: 16,
  },

  iconSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconWrapper: {
    width: 25,
    height: 25,
  },

  image: {
    width: "100%",
    height: "100%",
    tintColor: "#999",
  },

  signOut: {
    alignItems: "center",
    marginTop: 50,
  },
});
