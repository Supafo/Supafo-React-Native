import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BASE_URL} from '../../../api/url';

const CartHeader = () => {
  const navigation = useNavigation();
  const [values, setValues] = useState([]);
  console.log(values);

  const deleteItemsRequest = () => {
    fetch('http://192.168.56.2:3000/cartItems', {
      method: 'DELETE',
    }).then(response => console.log(response.status));
  };

  useEffect(() => {
    fetch(BASE_URL)
      .then(resp => resp.json())
      .then(json => {
        setValues(json);
        console.log('json: ', json);
      })
      .catch(error => console.error(error));
  }, []);

  const deleteAllItems = () => {
    Alert.alert(
      'Öğeler silinecek',
      'Tüm öğeleri silmek istediğinizden emin misiniz? ',
      [
        {
          text: 'Evet',
          onPress: deleteItemsRequest,
        },
        {
          text: 'Hayır',
          onPress: () => console.log('Hayır'),
        },
      ],
    );
  };

  return (
    <View style={styles.main}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../../../../../assets/images/arrow-back.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Sepet</Text>
      <TouchableOpacity onPress={deleteAllItems}>
        <Icon name={'trash-can-outline'} size={20} color={'black'} />
      </TouchableOpacity>
    </View>
  );
};

export default CartHeader;

const styles = StyleSheet.create({
  main: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1.5,
    padding: 10,
  },
  title: {
    fontSize: 20,
    color: '#333333',
  },
  icon: {
    width: 25,
    height: 25,
    padding: 5,
  },
});
