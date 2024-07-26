import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RefreshControl} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../../store/store';
import BasketTick from '../../../../../assets/images/basket_tick.svg';
import {useWindowDimensions} from 'react-native';
import {scale} from 'react-native-size-matters';
import {colors} from '../../../../../theme/colors';

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
      <Icon name={'trash-can-outline'} size={20} color={'white'} />
    </TouchableOpacity>,
  ];

  return (
    <View style={styles.main}>
      <FlatList
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
                <View style={{padding: 10}}>
                  <Text style={{fontSize: 16, color: '#333333', padding: 2}}>
                    {item.name}
                  </Text>
                  <Text style={{fontSize: 12, padding: 2, color: '#333333'}}>
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
                          fontSize: 15,
                          color: '#333333',
                          marginLeft: scale(8),
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
                          fontSize: scale(17),
                          color: '#000000',
                          fontWeight: '500',
                        }}>
                        ₺
                      </Text>
                      <Text
                        style={{
                          fontSize: scale(13),
                          color: '#333333',
                          fontWeight: '500',
                          marginLeft: scale(2),
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
    margin: 10,
  },
  container: {
    margin: 10,
    borderColor: '#66AE7B',
    borderWidth: 1.5,
    borderRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
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
    paddingTop: 5,
  },
  trashBtn: {
    backgroundColor: '#FF9200',
    width: 60,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginEnd: 10,
    marginVertical: 10,
  },
  increaseBtn: {
    padding: 2,
    backgroundColor: '#66AE7B',
    borderRadius: 100,
    marginLeft: scale(8),
  },
  decreaseBtn: {
    padding: 2,
    backgroundColor: '#D9D9D9',
    borderRadius: 100,
    marginVertical: 6,
  },
  trashimg: {
    width: 30,
    height: 30,
  },
});
