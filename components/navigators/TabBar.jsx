import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home';
import Search from '../../screens/Search';
import Cart from '../../screens/Cart';
import Profile from '../../screens/Profile';


import home from "../../assets/images/tabBarIcons/home.png"
import search from "../../assets/images/tabBarIcons/search.png"
import cart from "../../assets/images/tabBarIcons/bag.png"
import profile from "../../assets/images/tabBarIcons/user.png"

const TabBar = () => {
    const Tab = createBottomTabNavigator();

    const Icon = ({src, focuse}) => {
        return <Image style={[styles.icon, {
            tintColor: focuse ? "#6055D8" : "#9E9E9E"
        }]} source={src}/>
    }
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar
    }}>
        <Tab.Screen options={{tabBarIcon : ({focused}) => <Icon src={home} focuse={focused}/>}} name='home' component={Home}/>
        <Tab.Screen options={{tabBarIcon : ({focused}) => <Icon src={search} focuse={focused}/>}} name='search' component={Search}/>
        <Tab.Screen options={{tabBarIcon : ({focused}) => <Icon src={cart} focuse={focused}/>}} name='cart' component={Cart}/>
        <Tab.Screen options={{tabBarIcon : ({focused}) => <Icon src={profile} focuse={focused}/>}} name='profile' component={Profile}/>
    </Tab.Navigator>
  )
}

export default TabBar

const styles = StyleSheet.create({
    icon: {
        width: 24, height: 24,
    },

    tabBar: {
        height: 60,
        
    }
})