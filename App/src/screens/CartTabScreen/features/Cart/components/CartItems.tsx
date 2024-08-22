import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RefreshControl} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../../store/store';
import {useWindowDimensions} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import { FlashList } from 'react-native-actions-sheet';

const CartItems = () => {
  const [items, setItems] = useState([]);
  const [itemId, setItemId] = useState();
  const [isRefreshed, setIsRefreshed] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const userId = useSelector((state: RootState) => state.setUserId.id);

  const getDocuments = async () => {
    if (!userId) {
      console.warn('User ID is not available yet');
      return;
    }

    try {
      const cartCollection = await firestore()
        .collection(userId)
        .doc('cart')
        .collection('items')
        .get();
      const documents: any = [];

      cartCollection.docs.forEach(doc => {
        const data = doc.data();
        documents.push({id: doc.id, ...data});
      });

      setItems(documents);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const deleteItem = (itemId: any) => {
    if (userId) {
      firestore()
        .collection(userId)
        .doc('cart')
        .collection('items')
        .doc(itemId)
        .delete();
    }
  };

  const increaseQuantity = (item: any) => {
    if (userId) {
      const newQuantity = item.quantity + 1;
      firestore()
        .collection(userId)
        .doc('cart')
        .collection('items')
        .doc(item.id)
        .update({quantity: newQuantity})
        .then(() => {
          setItems(prevItems =>
            prevItems.map(prevItem =>
              prevItem.id === item.id
                ? {...prevItem, quantity: newQuantity}
                : prevItem,
            ),
          );
        });
    }
  };

  const decreaseQuantity = (item: any) => {
    if (userId) {
      const newQuantity = item.quantity - 1;
      firestore()
        .collection(userId)
        .doc('cart')
        .collection('items')
        .doc(item.id)
        .update({quantity: newQuantity})
        .then(() => {
          if (newQuantity === 0) {
            deleteItem(item.id);
          } else {
            setItems(prevItems =>
              prevItems.map(prevItem =>
                prevItem.id === item.id
                  ? {...prevItem, quantity: newQuantity}
                  : prevItem,
              ),
            );
          }
        });
    }
  };

  const onRefresh = () => {
    setIsRefreshed(true);
    getDocuments();
    setTimeout(() => {
      setIsRefreshed(false);
    }, 1000);
  };

  useEffect(() => {
    getDocuments();
  }, []);

  const contWidth = useWindowDimensions().width * 0.85;

  const rightButtons = [
    <TouchableOpacity
      style={styles.trashBtn}
      onPress={() => deleteItem(itemId)}>
      <Icon name={'trash-can-outline'} size={scale(20)} color={'white'} />
    </TouchableOpacity>,
  ];

  return (
    <View style={styles.main}>
      <FlashList
        data={items}
        style={{height: '67%'}}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshed} onRefresh={onRefresh} />
        }
        renderItem={({item}) => (
          <Swipeable
            onRightActionRelease={() => {
              setItemId(item.id);
            }}
            rightButtons={rightButtons}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={[styles.container, {width: contWidth}]}>
                <Image
                  source={require('../../../../../assets/images/Group.png')}
                />
                <View style={{padding: moderateScale(10)}}>
                  <Text style={{fontSize: moderateScale(16), color: '#333333', padding: moderateScale(2)}}>
                    {item.name}
                  </Text>
                  <Text style={{fontSize: moderateScale(12), padding: moderateScale(2), color: '#333333'}}>
                    Sürpriz Paket
                  </Text>
                  <View style={styles.label}>
                    <View style={styles.quantityWrapper}>
                      <TouchableOpacity
                        style={styles.decreaseBtn}
                        onPress={() => decreaseQuantity(item)}>
                        <Icon name={'minus'} size={scale(16)} color={'white'} />
                      </TouchableOpacity>
                      <Text
                        style={{
                          fontSize: moderateScale(15),
                          color: '#333333',
                          marginLeft: moderateScale(8),
                        }}>
                        {item.quantity}
                      </Text>
                      <TouchableOpacity
                        style={styles.increaseBtn}
                        onPress={() => increaseQuantity(item)}>
                        <Icon name={'plus'} size={scale(16)} color={'white'} />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      }}>
                      <Text
                        style={{
                          fontSize: moderateScale(17),
                          color: '#000000',
                          fontWeight: '500',
                        }}>
                        ₺
                      </Text>
                      <Text
                        style={{
                          fontSize: moderateScale(13),
                          color: '#333333',
                          fontWeight: '500',
                          marginLeft: moderateScale(2),
                        }}>
                        {(item.discountPrice * item.quantity).toFixed(1)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Swipeable>
        )}
      />
    </View>
  );
};

export default CartItems;

const styles = StyleSheet.create({
  main: {
    margin: moderateScale(10),
  },
  container: {
    margin: moderateScale(10),
    borderColor: '#66AE7B',
    borderWidth: moderateScale(1.5),
    borderRadius: moderateScale(20),
    paddingTop: verticalScale(10),
    paddingHorizontal: moderateScale(10),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FEFEFE',
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '88%',
  },
  quantityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: moderateScale(5),
  },
  trashBtn: {
    backgroundColor: '#FF9200',
    width: scale(60),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(20),
    marginEnd: moderateScale(10),
    marginVertical: verticalScale(10),
  },
  increaseBtn: {
    padding: moderateScale(2),
    backgroundColor: '#66AE7B',
    borderRadius: moderateScale(100),
    marginLeft: moderateScale(8),
  },
  decreaseBtn: {
    padding: moderateScale(2),
    backgroundColor: '#D9D9D9',
    borderRadius: moderateScale(100),
    marginVertical: verticalScale(6),
  },
  trashimg: {
    width: 30,
    height: 30,
  },
});
