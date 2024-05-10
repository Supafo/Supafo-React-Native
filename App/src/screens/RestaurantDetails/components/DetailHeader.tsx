import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { icons } from '../../../assets/images'
import { useNavigation } from '@react-navigation/native'


const DetailHeader = () => {

    const navigation = useNavigation()

  return (
    <View style={styles.main}>
      <View style={styles.headerButtons}>
        <View>
            <TouchableOpacity style={[styles.button, {flex: 1}]} onPress={() => navigation.goBack()} >
            <Image source={require("../../../assets/images/arrow-back.png")} style={styles.icon} />
            </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}} >
        <TouchableOpacity style={styles.button}>
          <Image source={require("../../../assets/images/shareIcon.png")} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("CartTabScreen")}>
          <Image source={require("../../../assets/images/cart-tab-icon.png.png")} style={styles.icon} />
        </TouchableOpacity>
        </View>
       
      </View>
      
      <Image source={require("../../../assets/images/restaurant-img.png")} style={styles.img} />
      <View style={styles.label} >
            <View style={{flex: 1, flexDirection: 'row', alignItems:'center'}} >
                <Image source={require("../../../assets/images/burger-king-logo.png")} />
                <Text style={styles.labelTxt} >Burger King</Text>
            </View>
            <TouchableOpacity style={styles.button}>
                <Image source={require("../../../assets/images/cart-tab-icon.png.png")} style={styles.icon} />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default DetailHeader

const styles = StyleSheet.create({
  main: {
    position: 'relative',
    width: '100%',
    height: 150,
  },
  headerButtons: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 100,
    margin: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    zIndex: 0,
  },
  label: {
    position:'absolute',
    bottom: 3,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelTxt: {
    fontSize: 18,
    color: 'white',
    padding: 10
  }
})
