import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack" ;
import TabBar from './TabBar';
const StackNav = () => {
    const Stack = createStackNavigator( ) ;
  return (
    <Stack.Navigator screenOptions={{
        headerShown:false
    }}>
        <Stack.Screen name='tabBar' component={TabBar}/>
    </Stack.Navigator>
  )
}

export default StackNav

const styles = StyleSheet.create({})