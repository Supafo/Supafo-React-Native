import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ArrowRightIcon } from '../../../assets/images'
import Icon from 'react-native-vector-icons/MaterialIcons'


type Props = {
    data: Array<any>
}

const FlatItemList = ({data}: Props) => {
  console.log(data);
  
  const renderItem = ({item}) => {
    return(
      <View style={styles.renderItemWrapper}>
        <Image source={item.icon} style={styles.icon} />
        <Text style={styles.title}>{item.title}</Text>
        <Icon name={'arrow-forward-ios'} size={14} color={'#333333'} />

      </View>
    )
  }

  return (
    <View style={styles.main}>
      <FlatList
        data={data}
        renderItem={renderItem}
      />
    </View>
  )
}

export default FlatItemList

const styles = StyleSheet.create({
  main: {
    margin: 20
  },
  renderItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  },
  icon: {
    height: 20,
    width: 16,
  },
  title: {
    fontSize: 16,
    color: '#333333',
    paddingStart: 10,
    flex: 1
  },

})