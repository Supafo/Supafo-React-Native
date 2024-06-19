import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../../theme/colors';
import fireStore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import routes from '../../../navigation/routes';

import auth from '@react-native-firebase/auth'

type Props = {
  item: object;
};

const AddCartContainer = ({item}: Props) => {
  const [food, setFood] = useState({});
  const [quantity, setQuantity] = useState(0);

  const navigation = useNavigation();

  const [userId, setuserId] = useState<String>('')
  console.log(typeof userId);
  
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(currentUser => {
      if (currentUser) {
        setuserId(currentUser.uid.toString())
      } else {
        console.log("kullanıcı gelirken hata");
      }
    })
  }, [userId]);

  useEffect(() => {
    setFood(item);
  }, [item]);

  const updateFoodProperty = (property: string, value: number) => {
    const updatedFood = {
      ...food,
      [property]: value,
    };
    setFood(updatedFood);
    if (quantity > 0) {
      addItemToFirestore(updatedFood);
    }
  };

  const addItemToFirestore = async (food: object) => {
    fireStore().collection(userId).add(food);
    navigation.navigate('CartTabScreen');
  };

  return (
    <View style={[styles.main, styles.shadow]}>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: '#D9D9D9'}]}
          onPress={() => setQuantity(prev => (prev != 0 ? prev - 1 : 0))}>
          <Icon name="minus" size={14} color={'white'} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 16,
            color: '#000000',
            width: 28,
            textAlign: 'center',
          }}>
          {' '}
          {quantity}{' '}
        </Text>
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: colors.greenColor}]}
          onPress={() => setQuantity(prev => prev + 1)}>
          <Icon name="plus" size={14} color={'white'} />
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
    padding: 6,
    borderRadius: 100,
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
