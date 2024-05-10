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
import {RefreshControl} from 'react-native';
import fireStore from '@react-native-firebase/firestore';


const CartItems = () => {
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState<number>(0);
  const [itemId, setItemId] = useState();
  const [isRefreshed, setIsRefreshed] = useState(false);
  

  const getDocuments = async () => {
    try {
      const querySnapshot = await fireStore().collection('cart').get();
      const docs: any = [];
  
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
  
      console.log('Documents:', docs);
      setItems(docs)
      return docs;
    } catch (error) {
      console.error('Error fetching documents:', error);
      return [];
    }
  };  

  useEffect(() => {
    getDocuments();
  }, [])



  const onRefresh = () => {
  //   setIsRefreshed(true);
  //   useEffect(() => {
  //     fetch(BASE_URL)
  //       .then(resp => resp.json())
  //       .then(json => {
  //         setItems(json);
  //         console.log('json: ', json);
  //       })
  //       .catch(error => console.error(error));
  //   }, []);

  //   setTimeout(() => {
  //     setIsRefreshed(false);
  //   }, 1000);
  // };
  }

  const rightButtons = [
    <TouchableHighlight
      style={styles.trashBtn}
      onPress={() => {
        fetch(`${BASE_URL}/${itemId}`, {method: 'DELETE'}).then(res =>
          console.log(res.status),
        );
      }}>
      <Icon name={'trash-can-outline'} size={20} color={'white'} />
    </TouchableHighlight>,
  ];

  return (
    <View style={styles.main}>
      <FlatList
        data={items}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshed} onRefresh={onRefresh} />
        }
        renderItem={({item}) => {
          return (
            <Swipeable
              onRightActionRelease={() => setItemId(item.id)}
              rightButtons={rightButtons}>
              <View style={styles.container}>
                <Image
                  source={require('../../../../../assets/images/cart-box-img.png')}
                  style={{height: '100%'}}
                />
                <View style={{padding: 10}}>
                  <Text style={{fontSize: 16, color: '#333333', padding: 2}}>
                    {item.title}
                  </Text>
                  <Text style={{fontSize: 12, padding: 2}}>
                    {item.description}
                  </Text>
                  <View style={styles.label}>
                    <View style={styles.quantityWrapper}>
                      <TouchableOpacity
                        style={styles.decreaseBtn}
                        onPress={() => {
                          console.log("wedad");
                          
                        }}>
                        <Icon name={'minus'} size={13} color={'white'} />
                      </TouchableOpacity>
                      <Text style={{fontSize: 18}}> {item.quantity} </Text>
                      <TouchableOpacity
                        style={styles.increaseBtn}
                        onPress={() => console.log("asödadn")
                        }>
                        <Icon name={'plus'} size={13} color={'white'} />
                      </TouchableOpacity>
                    </View>
                    <Text>{item.price * item.quantity} TL</Text>
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

export default CartItems


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
    marginEnd: 10,
    marginVertical: 10,
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

