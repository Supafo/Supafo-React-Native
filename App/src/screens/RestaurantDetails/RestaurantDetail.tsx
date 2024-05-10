import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DetailHeader from './components/DetailHeader'
import RestaurantInfoContainer from './components/RestaurantInfoContainer'
import PackageInfo from './components/PackageInfo'
import Label from './components/Label'
import AddCartContainer from './components/AddCartContainer'

type Props = {}

const RestaurantDetail = (props: Props) => {
  return (
    <View>
      <DetailHeader/>
      <RestaurantInfoContainer/>
      <PackageInfo/>
      <Label/>
      <AddCartContainer/>
    </View>
  )
}

export default RestaurantDetail

const styles = StyleSheet.create({})