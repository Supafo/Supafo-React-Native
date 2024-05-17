import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../../theme/colors';
import fireStore from '@react-native-firebase/firestore';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

type Props = {
  item: object;
};

const AddCartContainer = ({item}: Props) => {
  const [food, setFood] = useState({});
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setFood(item);
  }, [item]);

  const updateFoodProperty = (property: string, value: number) => {
    const updatedFood = {
      ...food,
      [property]: value,
    };
    setFood(updatedFood);
    if(quantity > 0){
      addItemToFirestore(updatedFood);
    }
  };

  const addItemToFirestore = async (food: object) => {
    fireStore().collection('cart').add(food);
  };

  return (
    <View style={[styles.main, styles.shadow]}>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: '#D9D9D9'}]}
          onPress={() => setQuantity(prev => (prev != 0 ? prev - 1 : 0))}>
          <Icon name="minus" size={16} color={'white'} />
        </TouchableOpacity>
        <Text style={{fontSize: 16}}> {quantity} </Text>
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: colors.greenColor}]}
          onPress={() => setQuantity(prev => prev + 1)}>
          <Icon name="plus" size={16} color={'white'} />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
          <TouchableOpacity
            style={styles.addCartBtn}
            onPress={() => {
              updateFoodProperty('quantity', quantity);
            }}>
            <Text style={styles.btnTxt}>Sepete Ekle</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddCartContainer;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: 10,
  },
  btn: {
    padding: 5,
    borderRadius: 80,
    width: 30,
    margin: 5,
    alignItems: 'center',
  },
  addCartBtn: {
    backgroundColor: colors.greenColor,
    borderRadius: 18,
    padding: 8,
    alignItems: 'center',
    width: '100%',
    marginStart: 10,
  },
  btnTxt: {
    color: 'white',
    fontSize: 16,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
});
