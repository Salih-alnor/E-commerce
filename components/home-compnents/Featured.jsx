import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import COLORS from "../../assets/colors";

const Featured = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
          }}
        >
          Featured
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              color: COLORS.mainColor,
            }}
          >
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
    </View>
  );
};

export default Featured;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginHorizontal: 16,
  },
});
