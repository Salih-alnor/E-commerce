import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import COLORS from "../assets/colors";
import order from "../assets/images/icons/order.png";
import setting from "../assets/images/icons/setting.png";
import mail from "../assets/images/icons/mail.png";
import share from "../assets/images/icons/share.png";
import help from "../assets/images/icons/help.png";
import next from "../assets/images/icons/next.png";
import remove from "../assets/images/icons/remove.png";
import camera from "../assets/images/icons/camera.png";
import gallery from "../assets/images/icons/gallery.png";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("screen");

const sections = [
  {
    image: order,
    title: "Orders",
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
const defaultProfile = "http://172.20.10.4:4000/ProfileImage/profile.png";
const Profile = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(defaultProfile);

  const userInfo = useSelector((state) => state.userInfoReducer.userInfo);

  const [modalVisible, setModalVisible] = useState(false);

  const pickImage = async (source) => {
    try {
      let result;
      if (source === "camera") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          if (Platform.OS === "android") {
            Alert.alert("Access to camera is required");
          } else {
            alert("Access to camera is required");
          }
        }

        result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      } else {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          if (Platform.OS === "android") {
            Alert.alert("Access to camera roll is required");
          } else {
            alert("Access to camera roll is required");
          }
        }

        result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        setModalVisible(false);
      } else {
        if (Platform.OS === "android") {
          Alert.alert("Canceled!");
          setModalVisible(false);
        } else {
          alert("Canceled!");
          setModalVisible(false);
        }
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const RenderOptions = ({ title, image, action }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onPress={() => action()}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            color: COLORS.mainColor,
          }}
        >
          {title}
        </Text>
        <Image
          source={image}
          style={{
            width: 30,
            height: 30,
            alignSelf: "center",
            tintColor: COLORS.mainColor,
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <TouchableOpacity
          style={styles.imageWrapper}
          onPress={() => setModalVisible(true)}
        >
          <Image
            resizeMode="contain"
            style={{
              width: "100%",
              height: "100%",
            }}
            source={{ uri: selectedImage }}
          />
        </TouchableOpacity>
        <Text style={styles.userName}>{userInfo.name}</Text>
        <Text style={styles.email}>{userInfo.email}</Text>
      </View>

      <ScrollView>
        <View style={styles.sections}>
          {sections.map((item, index) => {
            return (
              <TouchableOpacity
                style={styles.section}
                key={index}
                onPress={() => navigation.navigate(item.page)}
              >
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
                  <Image
                    style={[
                      styles.image,
                      {
                        tintColor: "#9999",
                      },
                    ]}
                    source={next}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.signOut}>
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.removeItem("user");
              await AsyncStorage.removeItem("token");
              navigation.navigate("login");
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                color: "#F55F1F",
              }}
            >
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View
          style={{
            width,
            height: 300,
            backgroundColor: COLORS.mainColor,
            position: "absolute",
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingHorizontal: 16,
          }}
        >
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{
              position: "absolute",
              top: 20,
              right: 10,
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={remove}
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>

          <View
            style={{
              width: "100%",
              height: "auto",
              backgroundColor: COLORS.white,
              paddingHorizontal: 16,
              paddingVertical: 32,
              marginTop: 50,
              borderRadius: 30,
            }}
          >
            <RenderOptions
              title="Tacke photo"
              image={camera}
              action={() => pickImage("camera")}
            />
            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: "#DDD",
                marginVertical: 16,
              }}
            ></View>
            <RenderOptions
              title="Choose photo"
              image={gallery}
              action={() => pickImage("gallery")}
            />
          </View>
        </View>
      </Modal>
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
