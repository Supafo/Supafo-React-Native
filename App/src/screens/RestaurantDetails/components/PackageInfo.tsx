import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../../theme/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'

type Props = {}

const PackageInfo = (props: Props) => {

    const packageInfo = ["Vejeteryan", "Vegan", "Glutensiz", "Laktozsuz"]

  return (
    <View style={styles.main} > 
      <Text style={styles.title}>Paket Özelliği</Text>
      <View style={styles.itemWrapper}>
        {
          packageInfo.map((item, index) => (
            <Text key={index} style={styles.txt}>{item}</Text>
          ))
        }
      </View>
      <View style={styles.label} >
        <Text style={{fontSize: 18, color: '#333333', fontWeight: '500'}} >Alerjen ve İçerikler</Text>
        <AntDesign name='questioncircle' size={20} color={colors.greenColor} />
      </View>
    </View>
  )
}

export default PackageInfo

const styles = StyleSheet.create({
    main: {
        margin: 10,
    },
    title: {
      marginBottom: 10,
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333333',
      paddingStart: 20,
      margin: 10
    },
    itemWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: 10,
        borderColor: 'black',
        borderBottomWidth: 1
    },
    txt:{
        backgroundColor: colors.greenColor,
        padding: 5,
        margin: 5,
        borderRadius: 20,
        color: 'white',
        fontSize: 12
    },
    label: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    }
})
