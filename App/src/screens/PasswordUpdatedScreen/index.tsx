import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import routes from '../../navigation/routes';
import { StatusBar } from 'react-native';


const PasswordUpdatedScreen = () => {
    const navigation = useNavigation();

  return (
    <View style={styles.main} >
      <StatusBar backgroundColor={'#F5F5FA'} />  
      <Text style={styles.title} >Yeni Şifre Oluştur</Text>
      <View style={styles.container} >
        <Image source={require("../../assets/images/password-updated-img.png")} style={styles.img} />
        <Text style={styles.labelTxt} >Şifreniz Başarıyla Güncellendi !</Text>
        <TouchableOpacity  onPress={() => navigation.navigate(routes.LOGIN_SCREEN)} style={styles.btn} >
            <Text style={styles.btnTxt} >Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default PasswordUpdatedScreen

const styles = StyleSheet.create({
    main:{
        margin: 20,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor:'#F5F5FA',
    },
    title:{
        fontSize: 19,
        color: '#333333',
        fontWeight: '500',
        padding: 10
    },
    container:{
        marginTop: 70,
        width: '100%',
        alignItems: 'center',
    },
    img: {
        width: 200.5,
        height: 192,
        marginBottom: 20,
    },
    labelTxt: {
        color: '#333333',
        fontSize: 16,
        padding: 30,
        fontWeight: '500',
    },
    btn: {
        alignItems: 'center',
        borderRadius: 20,
        padding: 5,
        backgroundColor: '#66AE7B',
        width: '80%',
        margin: 10
    },
    btnTxt: {
        color: 'white',
        fontSize: 15,
        padding: 3
    }
})