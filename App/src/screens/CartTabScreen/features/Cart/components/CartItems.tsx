import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BASE_URL} from '../../../api/url';
import {Image} from 'react-native';
import Swipeable from 'react-native-swipeable';

const CartItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(BASE_URL)
      .then(resp => resp.json())
      .then(json => setItems(json))
      .catch(error => console.error(error));
  }, []);

  const rightButtons = [
    <TouchableHighlight>
      <Text>Delete</Text>
    </TouchableHighlight>,
  ];

  return (
    <View style={styles.main}>
      <FlatList
        data={items}
        renderItem={({item}) => {
          const price = item.quantity * item.price;
          return (
            <Swipeable rightButtons={rightButtons}>
              <View style={styles.container}>
                <Image
                  source={require('../../../../../assets/images/cart-box-img.png')}
                  style={styles.img}
                />
                <View style={styles.wrapper}>
                  <Text>{item.name}</Text>
                  <Text>{item.description}</Text>
                  <View style={styles.label}>
                    <Text> - {item.quantity} +</Text>
                    <Text>{price} TL</Text>
                  </View>
                </View>
              </View>
            </Swipeable>
          );
        }}
      />
    </View>
  );
};

export default CartItems;

const styles = StyleSheet.create({
  main: {
    margin: 10,
  },
  container: {
    margin: 10,
    borderColor: '#66AE7B', //Green Color HexCode
    borderWidth: 1.5,
    borderRadius: 20,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#FEFEFE',
  },
  wrapper: {
    padding: 10,
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '85%',
  },
  img: {
    width: 80,
    height: 80,
  },
});
