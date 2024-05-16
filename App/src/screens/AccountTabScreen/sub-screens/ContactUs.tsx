import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../../../components/Header'
import { Image } from 'react-native'
import { Icon } from '../../../assets/images'
import { colors } from '../../../theme/colors'

type Props = {}

const ContactUs = (props: Props) => {
    const [email, setEmail] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
  return (
    <View style={styles.main}>
      <Header title={'Bize Ulaşın'}/>
      <View style={styles.wrapper}>
        <View style={styles.imgWrapper}>
        <Image source={Icon} style={styles.img} />
        </View>
       <View style={{width: '100%', marginTop: 20, alignItems:'center'}}>
       <TextInput
            placeholder='E-mail'
            style={styles.inputShortStyle}
        />
        <TextInput
            placeholder='Telefon Numarası'
            style={styles.inputShortStyle}
            keyboardType='number-pad'
        />
        <TextInput
            placeholder='Mesajınızı buraya yazınız...'
            style={styles.inputLongStyle}
            textAlignVertical='top'
        />
       </View>
       <View style={{width: '100%'}}>
       <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnTxt}>Gönder</Text>
        </TouchableOpacity>
       </View>
      </View>
    </View>
  )
}

export default ContactUs

const styles = StyleSheet.create({
    main: {
        alignItems: 'center',
        backgroundColor:'#F5F5FA',
        flex: 1,
    },
    wrapper: {
        width: '100%',
        alignItems:'center'
    },
    imgWrapper: {
        borderColor: colors.greenColor, 
        borderWidth: 1 ,
        padding: 40,
        borderRadius: 100,
        alignItems:'center',
        marginTop: 40,width: 175, height: 175
    },
    img: { width: 70, height: 94, resizeMode:'cover' },
    inputShortStyle:{
        backgroundColor:'white',
        borderColor: '#D0D5DD',
        borderWidth: 1,
        borderRadius: 20,
        width: '90%',
        margin: 10,
        paddingStart: 15
    },
    inputLongStyle: {
        backgroundColor:'white',
        borderColor: '#D0D5DD',
        borderWidth: 1,
        borderRadius: 20,
        width: '90%',
        margin: 10,
        paddingStart: 15,
        height: '30%',
        paddingTop: 20
    },
    btn: {
        width: '100%',
        alignItems:'center',
    },
    btnTxt: {
        width: '80%',
        backgroundColor: colors.greenColor,
        textAlign: 'center',
        padding: 10,
        fontSize: 17,   
        color: 'white',
        borderRadius: 20
    }
})