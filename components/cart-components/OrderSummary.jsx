import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COLORS from '../../assets/colors'

const OrderSummary = ({data}) => {
  return (
    <View style={styles.orderSummary}>
    <Text style={styles.title}>Order Summary</Text>

    <View>
      <View style={styles.prices}>
        <Text>Items</Text>
        <Text>3</Text>
      </View>

      <View style={styles.prices}>
        <Text>Subtotal</Text>
        <Text>$423</Text>
      </View>

      <View style={styles.prices}>
        <Text>Discount</Text>
        <Text>$12</Text>
      </View>

      <View style={styles.prices}>
        <Text>Delivery Charges</Text>
        <Text>$2</Text>
      </View>

      <View
        style={{
          width: "100%",
          height: 0.4,
          backgroundColor: COLORS.secondaryColor,
          marginVertical: 16,
        }}
      ></View>
    </View>

    <View style={styles.totalPrice}>
      <Text style={{ fontSize: 18, fontWeight: "500" }}>Total</Text>
      <Text style={{ fontSize: 18, fontWeight: "500" }}>${data.totalPrice}</Text>
    </View>
  </View>
  )
}

export default OrderSummary

const styles = StyleSheet.create({
    orderSummary: {
        marginTop: 60,
      },
    
      title: {
        fontSize: 18,
        fontWeight: "500",
        marginBottom: 16,
      },
    
      prices: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
        marginHorizontal: 8,
      },
    
      totalPrice: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
})