import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ArrowRightIcon } from '../../../assets/images'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'

type Props = {
    data: Array<any>
}

const FlatItemList = ({data}: Props) => {
  
  const navigation = useNavigation();

  const renderItem = ({item}) => {
    return(
      <TouchableOpacity onPress={() => navigation.navigate(item.navigation, item.navigation == 'ORDER_HELP_DETAIL' ?  {
        title: item.title,
        description: item.description    
      }: 
      null
      )} style={styles.renderItemWrapper}>
       {
        item.icon !== null ?
        <Image source={item.icon} style={styles.icon} />
        :
        null
       }
        <Text style={styles.title}>{item.title}</Text>
        <Icon name={'arrow-forward-ios'} size={14} color={'#333333'} />
      </TouchableOpacity>
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
    margin: 10,
    padding: 5,
    width: '98%'
  },
  icon: {
    height: 20,
    width: 16,
    marginEnd: 10
  },
  title: {
    fontSize: 15,
    color: '#333333',
    flex: 1
  },

})