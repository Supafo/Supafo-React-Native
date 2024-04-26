import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BASE_URL} from '../../../api/url';
import {Image} from 'react-native';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CartItems = () => {
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState(0);
  console.log(quantity);

  useEffect(() => {
    fetch(BASE_URL)
      .then(resp => resp.json())
      .then(json => {
        setItems(json);
        console.log(json);
      })
      .catch(error => console.error(error));
  }, []);

  const rightButtons = [
    <TouchableHighlight style={styles.trashBtn}>
      <Icon name={'trash-can-outline'} size={20} color={'white'} />
    </TouchableHighlight>,
  ];

  return (
    <View style={styles.main}>
      <FlatList
        data={items}
        renderItem={({item}) => {
          const price = item.quantity * item.price;
          setQuantity(item.quantity);
          return (
            <Swipeable rightButtons={rightButtons}>
              <View style={styles.container}>
                <Image
                  source={require('../../../../../assets/images/cart-box-img.png')}
                  style={{height: '100%'}}
                />
                <View style={{padding: 10}}>
                  <Text style={{fontSize: 16, color: '#333333', padding: 2}}>
                    {item.name}
                  </Text>
                  <Text style={{fontSize: 12, padding: 2}}>
                    {item.description}
                  </Text>
                  <View style={styles.label}>
                    <View style={styles.quantityWrapper}>
                      <TouchableOpacity
                        style={styles.decreaseBtn}
                        onPress={() => {
                          setQuantity(quantity - 1);
                          console.log('azaldı');
                        }}>
                        <Icon name={'minus'} size={13} color={'white'} />
                      </TouchableOpacity>
                      <Text style={{fontSize: 18}}> {quantity} </Text>
                      <TouchableOpacity
                        style={styles.increaseBtn}
                        onPress={() => setQuantity(quantity + 1)}>
                        <Icon name={'plus'} size={13} color={'white'} />
                      </TouchableOpacity>
                    </View>
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
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '85%',
  },
  quantityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
  },
  trashBtn: {
    backgroundColor: '#FF9200',
    width: 60,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 10,
  },
  increaseBtn: {
    padding: 2,
    backgroundColor: '#66AE7B',
    borderRadius: 100,
    margin: 5,
  },
  decreaseBtn: {
    padding: 2,
    backgroundColor: '#D9D9D9',
    borderRadius: 100,
    margin: 5,
  },
  trashimg: {
    width: 30,
    height: 30,
  },
});
