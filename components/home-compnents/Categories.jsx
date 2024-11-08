import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COLORS from '../../assets/colors';

const Categories = () => {

    const data = ["cate1", "cat2", "cat3", "cat4", "cat5", "cat6", "cat7", "cat2", "cat3", "cat4", "cat5", "cat6", "cat7"];

    const Category = ({item, index}) => {
        const dataLength = data.length;
        return(
            <View style={[styles.category, {
                marginRight: dataLength - 1 === index  ? 16 : 0,
            }]} key={index}>
                <Text>{item}</Text>
            </View>
        )
    }
  return (
    <View>
      <Text style={{
        fontSize: 20,
        fontWeight: "600",
        marginLeft: 16 
      }}>Categories</Text>

      <FlatList 
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={Category}
      keyExtractor={(item, index) => index.toString()}
      pagingEnabled={true}
      snapToInterval={106}
      />
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({

    category: {
        width: 90, height: 90,
        borderRadius: 10,
        marginLeft: 16,
        marginVertical: 20,
        backgroundColor: "#EEE",
        alignItems: 'center',
        justifyContent: 'center',
    }
})