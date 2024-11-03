import { Image, StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import AppIntroSlider from 'react-native-app-intro-slider'
import onboarding1 from "../assets/images/login-signUp/onboarding1.png"
import onboarding2 from "../assets/images/login-signUp/onboarding2.png"
import onboarding3 from "../assets/images/login-signUp/onboarding3.png"
import next from "../assets/images/login-signUp/next.png"
import COLORS from '../assets/colors'

const {width, height} = Dimensions.get('screen')

const Onboarding = ({navigation}) => {
    const data = [
        {
            title: "One touch shopping",
            subTitle: "Browse thousands of products easily through an interface designed for a fun and seamless shopping experience.",
            image: onboarding1,
        },

        {
            title: "Safe and convenient payment",
            subTitle: "Enjoy an easy and secure shopping experience, with multiple options to suit everyone.",
            image: onboarding2,
        },

        {
            title: "Save with exclusive offers",
            subTitle: "Take advantage of renewed offers and discounts on your favorite products.",
            image: onboarding3,
        },
    ]

   

    const Items = ({item, index}) => {
       return(
        <View key={index} style={styles.container}>
            <View style={styles.imageWrapper}>
                <Image resizeMode='contain' style={styles.image} source={item.image}/>
            </View>

            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subTitle}>{item.subTitle}</Text>

        </View>
       )
    }

    const renderPrevButton = () => {
        return (
          <View>
            <Text style={{fontSize: 18, color: 'grey', marginLeft: 16, fontWeight: "600"}}>Back</Text>
          </View>
        )
      }

      const renderNextButton = () => {
        return (
          <View>
            <Text style={{fontSize: 18, color: COLORS.mainColor, marginRight: 16, fontWeight: "600"}}>Next</Text>
          </View>
        )
      }

      const renderDoneButton = () => {
        return (
          <View style={styles.doneBtn}>
            <Text style={{fontSize: 18 , color: COLORS.white, marginRight: 16, fontWeight: "600"}}>Getting Started</Text>
            <Image style={{
              width: 20,
              height: 20,
              tintColor: COLORS.white
            }} source={next}/>
          </View>
        )
      }
  return (
    
      <AppIntroSlider 
       data={data}
       renderItem={Items}
       keyExtractor={(item, index) => index.toString()}
       renderPrevButton={renderPrevButton}
       showPrevButton={true}
       renderNextButton={renderNextButton}
       showNextButton={true}
       renderDoneButton={renderDoneButton}
       showDoneButton={true}
       dotStyle={styles.dot}
       activeDotStyle={styles.activeDot}
       onDone={() => navigation.navigate("tabBar")}
      />
  
  )
}

export default Onboarding

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingHorizontal: 16
    },

    imageWrapper: {
        width,
        height: height * 0.5,
        alignItems: 'center',
        justifyContent: 'center', 
    },

    image: {
        width: "80%",
        height: "80%"
    },

    title: {
        fontSize: 35,
        fontWeight: "600",
        textAlign: "center"
    },

    subTitle: {
        fontSize: 18,
        marginTop: 16,
        color: COLORS.secondaryColor,
        textAlign: "center"
    },

    doneBtn: {
        backgroundColor: COLORS.mainColor,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
        bottom: 12,

    },

    dot: {
        backgroundColor: "#DDD",
        marginBottom: 300,
      },

      activeDot: {
        marginBottom: 300,
        width: 30, 
        backgroundColor: COLORS.mainColor
      },
})