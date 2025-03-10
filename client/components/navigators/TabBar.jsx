import { Image, StyleSheet, Text, View, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../screens/Home";
import Search from "../../screens/Search";
import Cart from "../../screens/Cart";
import Profile from "../../screens/Profile";
import COLORS from "../../assets/colors";
import home from "../../assets/images/tabBarIcons/home.png";
import search from "../../assets/images/tabBarIcons/search.png";
import cart from "../../assets/images/tabBarIcons/bag.png";
import profile from "../../assets/images/tabBarIcons/user.png";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../services/productService";
import { getCategories } from "../../services/categoresService";
import { getCartItems } from "../../services/cartService";
import { getFavoritesList } from "../../services/favoritesService";

const TabBar = ({ navigation }) => {
  const [cartCount, setCartCount] = useState(0);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favoritesReducer.favoritesList);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        dispatch({ type: "getProducts", payload: productsData });

        const cart = await getCartItems();

        const cartData = {
          cartId: cart._id,
          items: cart.items,
          totalPrice: cart.totalPrice,
        };
        dispatch({ type: "getCartItems", payload: cartData });

        const favoriteData = await getFavoritesList();

        dispatch({ type: "setFavorites", payload: favoriteData });

        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.log(error.response.data.error);
      }
    };

    fetchData();
  }, []);

  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  useEffect(() => {
    setCartCount(cartItems.items.length);
  }, [cartItems]);

  const Tab = createBottomTabNavigator();

  const Icon = ({ src, focuse, iconName }) => {
    return (
      <View>
        {iconName === "cart" && cartCount > 0 ? (
          <View
            style={{
              position: "absolute",
              top: -16,
              right: -10,
              height: 20,
              minWidth: 20,
              backgroundColor: COLORS.mainColor,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                style={{
                  color: COLORS.white,
                  width: "100%",
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                {cartCount}
              </Text>
            </View>
          </View>
        ) : null}

        <Image
          style={[
            styles.icon,
            {
              tintColor: focuse ? COLORS.mainColor : COLORS.secondaryColor,
            },
          ]}
          source={src}
        />
      </View>
    );
  };
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          styles.tabBar,
          {
            paddingTop: Platform.OS === "ios" ? 5 : 0,
            height: Platform.OS === "ios" ? 70 : 60,
          },
        ],
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => <Icon src={home} focuse={focused} />,
        }}
        name="home"
        children={() => (
          <Home
            route={{
              params: {
                favoriteList: favorite,
                productsList: products,
                categoriesList: categories
              },
            }}
            navigation={navigation}
          />
        )}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => <Icon src={search} focuse={focused} />,
        }}
        name="search"
        component={Search}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              src={cart}
              focuse={focused}
              iconName="cart"
              cartCount={cartItems}
            />
          ),
          tabBarStyle: {
            display: "none",
          },
        }}
        name="cart"
        children={() => (
          <Cart
            route={{
              params: {
                items: cartItems,
              },
            }}
            navigation={navigation}
          />
        )}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => <Icon src={profile} focuse={focused} />,
        }}
        name="profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },

  tabBar: {
    backgroundColor: COLORS.white,
    elevation: 0,
    borderTopWidth: 0,
  },
});
