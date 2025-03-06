import { Image, StyleSheet, Text, TextInput, View, Platform } from 'react-native'
import React from 'react'
import search from "../../assets/images/icons/search.png"
import COLORS from '../../assets/colors'

const SearchBox = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <View style={styles.searchIcon}>
          <Image style={{
            width: "100%",
            height: "100%",
            tintColor:"grey"
          }} source={search}/>
        </View>
        <TextInput 
        style={styles.input}
        keyboardType='default'
        placeholder='Search here'
        placeholderTextColor={Platform.OS == "ios" ? COLORS.secondaryColor : COLORS.secondaryColor}
        />
      </View>
    </View>
  )
}

export default SearchBox

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 16
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    overflow: "hidden"
  },
  searchIcon: {
    width: 30,
    height: 30
  },

  input: {
    width: "100%",
    height: "100%",
    paddingLeft: 10,
    fontSize: 18,    
  }
})