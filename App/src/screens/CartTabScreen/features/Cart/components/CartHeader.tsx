import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import fireStore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';

const CartHeader = () => {
  const navigation = useNavigation();
  const [values, setValues] = useState([]);

  const userId = useSelector((state: RootState) => state.setUserId.id)

  
  const deleteAllItemsRequest = async () => {
    try {
      await fireStore()
        .collection(userId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete();
          });
        });
      console.log('Tüm öğeler başarıyla silindi.');
    } catch (error) {
      console.error('Tüm öğeleri silerken bir hata oluştu:', error);
    }
  };

  const deleteAllItems = () => {
    Alert.alert(
      'Öğeler silinecek',
      'Tüm öğeleri silmek istediğinizden emin misiniz? ',
      [
        {
          text: 'Evet',
          onPress: deleteAllItemsRequest,
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
    borderBottomWidth: 0.9,
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
