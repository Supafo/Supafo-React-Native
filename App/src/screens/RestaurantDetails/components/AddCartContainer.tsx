import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {}

const AddCartContainer = (props: Props) => {
  return (
    <View style={styles.main} >
      <Text>AddCartContainer</Text>
    </View>
  )
}

export default AddCartContainer

const styles = StyleSheet.create({
    main:{
        backgroundColor:'green',
        height: 80
    }
})