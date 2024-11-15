import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../assets/colors'
import Categories from '../components/home-compnents/Categories'
import axios from 'axios'
const Brands = ({route, navigation}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getBrands = async (categoryId, subCategoryId) => {
      try {
        const response = await axios.get(`http://172.20.10.4:4000/api/brand/${categoryId}/${subCategoryId}/brands`);
        setData(response.data.brands);
      } catch (error) {
        console.log(error);
      }
    }

    getBrands(route.params.categoryId, route.params.subCategoryId);
  }, [navigation])
  return (
    <View style={styles.container}>
      <Categories categories={data} page="brand"/>
    </View>
  )
}

export default Brands

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
})