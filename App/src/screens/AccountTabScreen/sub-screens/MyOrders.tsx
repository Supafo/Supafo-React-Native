import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FlatItemList from '../components/FlatItemList'
import { myOrderData } from '../data/my-orders-data'
import Header from '../../../components/Header'

type Props = {}

const MyOrders = (props: Props) => {
  return (
    <View style={styles.main}>
      <Header title={'Siparişlerim'}/>
      <FlatItemList
        data={myOrderData}
      />
    </View>
  )
}

export default MyOrders

const styles = StyleSheet.create({
    main: {
        backgroundColor:'#F5F5FA',
        flex: 1
    }
})