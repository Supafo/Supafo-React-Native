import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../../theme/colors';
import firebase from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';

type Props = {
  item: object;
};

const AddCartContainer = ({item}: Props) => {
  const [food, setFood] = useState(item);
  const [quantity, setQuantity] = useState(1);

  const navigation = useNavigation();
  const userId = useSelector((state: RootState) => state.setUserId.id);

  useEffect(() => {
    setFood(item);
  }, [item]);

  const updateFoodProperty = (property: string, value: number) => {
    const updatedFood = {
      ...food,
      [property]: value,
    };
    //console.log('updatedFood: ', updatedFood);

    setFood(updatedFood);
    if (value > 0) {
      addItemToFirestore(updatedFood);
    }
  };

  const addItemToFirestore = async (food: object) => {
    try {
      const favoritesDoc = await firebase()
        .collection(userId)
        .doc('cart')
        .collection('items')
        .get();

      navigation.navigate('CartTabScreen');

      if (!favoritesDoc.exists) {
        await firebase()
          .collection(userId)
          .doc('cart')
          .collection('items')
          .add(food);
      } else {
        console.log('else durumunda şimdi addcontainer');
      }

      console.log('Item added to favorites successfully');
    } catch (error) {
      console.error('Error adding item to favorites: ', error);
    }
  };

  return (
    <View style={[styles.main]}>
      <View
        style={{backgroundColor: 'white', width: '100%', flexDirection: 'row'}}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={[styles.btn, {backgroundColor: '#D9D9D9'}]}
            onPress={() => {
              const newQuantity = quantity > 0 ? quantity - 1 : 0;
              setQuantity(newQuantity);
            }}>
            <Icon name="minus" size={scale(14)} color={'white'} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: moderateScale(16),
              color: '#000000',
              width: scale(28),
              textAlign: 'center',
            }}>
            {quantity}
          </Text>
          <TouchableOpacity
            style={[styles.btn, {backgroundColor: colors.greenColor}]}
            onPress={() => {
              const newQuantity = quantity + 1;
              setQuantity(newQuantity);
            }}>
            <Icon name="plus" size={scale(14)} color={'white'} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={styles.addCartBtn}
            onPress={() => {
              if (quantity > 0) {
                updateFoodProperty('quantity', quantity);
              }
            }}>
            <Text style={styles.btnTxt}>Sepete Ekle</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddCartContainer;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: moderateScale(20),
    borderTopStartRadius: moderateScale(15),
    borderTopEndRadius: moderateScale(15),
    borderWidth: moderateScale(0.5),
    borderColor: 'gray',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: moderateScale(10),
  },
  btn: {
    padding: moderateScale(6),
    borderRadius: moderateScale(100),
    margin: moderateScale(5),
    alignItems: 'center',
  },
  addCartBtn: {
    backgroundColor: colors.greenColor,
    borderRadius: moderateScale(18),
    padding: moderateScale(8),
    alignItems: 'center',
    width: '100%',
    marginStart: moderateScale(10),
  },
  btnTxt: {
    color: 'white',
    fontSize: moderateScale(16),
  },
});
