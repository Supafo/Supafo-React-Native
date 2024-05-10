import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../../theme/colors'
import { Image } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'


const Label = () => {
    const data = ["Yaprak Sarma", "Biber Dolma", "Enginar", "Hünkar Beğendi", "Karnıyarık"]
  return (
    <View style={styles.main} >
        <View style={styles.wrapper} >
            <Text>Başkaları ne diyor?</Text>
           <View style={styles.row} >
           <AntDesign name='clockcircleo' size={20} color={colors.greenColor} />
            <Text>Hızlı Sipariş </Text>
           </View>
            <Text>Lezzetli Yemek</Text>
            <Text>Güler Yüzlü Ekip</Text>
        </View>
      <Text style={styles.title} >Senin için ipucu</Text>
      <View style={styles.container} >
      <View>
        <Image source={require("../../../assets/images/gift-package.png")} style={styles.img} />
      </View>
      <View style={styles.itemWrapper}>
        <Text style={styles.labelTitle} >Sürpriz paketinden çıkabilecekler</Text>
        {
          data.map((item, index) => (
                <Text key={index} style={styles.txt}>{item}</Text>
          ))
        }
      </View>
      </View>
      <View style={styles.label} >
        <Text style={{fontSize: 18, color: '#333333', fontWeight: '500'}} >Alerjen ve İçerikler</Text>
        <AntDesign name='questioncircle' size={20} color={colors.greenColor} />
      </View>
    </View>
  )
}

export default Label

const styles = StyleSheet.create({
    main:{
        margin: 10
    },
    wrapper:{

    },
    container:{
        flexDirection: 'row',
         alignItems:'center',
         justifyContent: 'space-evenly',
    },
    title:{
        backgroundColor: '#FF9200',
        color: 'white',
        fontSize: 12,
        borderRadius: 20,
        padding: 3,
        width: 100,
        textAlign: 'center',
        margin: 5
    },
    itemWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: 10,
        width: '65%'
    },
    txt:{
        backgroundColor: colors.greenColor,
        padding: 5,
        margin: 5,
        borderRadius: 20,
        color: 'white',
        fontSize: 11
    },
    labelTitle:{
        fontSize: 15,
        padding: 5,
        fontWeight: '500',
        color: '#333333'
    },
    img:{
        width: 100,
        height: 100
    },
    label: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    }
})