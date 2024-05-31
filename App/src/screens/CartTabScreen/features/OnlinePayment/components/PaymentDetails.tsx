import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import OrderSummary from './OrderSummary';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import {cardExpiredDate, numberOfMonths} from '../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {confirm} from '../../../../../store/slices/isCartConfirmed';
import routes from '../../../../../navigation/routes';

const PaymentDetails = () => {
  const [cartNumber, setCartNumber] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [cardMonth, setcardMonth] = useState('');
  const [cardExpireYear, setCardExpireYear] = useState('');
  const [CVV, setCVV] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  //const confirmValue = useSelector((state: RootState) => state.confirmedCart.isConfirmed);

  return (
    <View style={styles.main}>
      <View>
        <View style={styles.container}>
          <Text style={styles.title}>Kart No</Text>
          <TextInput
            style={styles.input}
            onChangeText={(txt: string) => setCartNumber(txt)}
            placeholder={'0000 1111 2222 3333'}
            placeholderTextColor={'#636363'}
          />
          <View style={styles.wrapper}>
            <View>
              <Text style={styles.title}>Son Kullanma Tarihi</Text>
              <View style={{flexDirection: 'row'}}>
                <Dropdown
                  style={[styles.dropdown, {marginEnd: 20}]}
                  data={numberOfMonths}
                  placeholder={'Ay'}
                  labelField="value"
                  valueField="value"
                  value={cardMonth}
                  itemTextStyle={{
                    fontSize: 15,
                    color: '#000000',
                    textAlign: 'center',
                  }}
                  containerStyle={{borderRadius: 5}}
                  itemContainerStyle={{
                    borderBottomColor: 'lightgray',
                    borderBottomWidth: 1,
                  }}
                  placeholderStyle={{textAlign: 'center', color: '#636363'}}
                  selectedTextStyle={{textAlign: 'center', color: '#000000'}}
                  onChange={item => setcardMonth(item.value)}
                />
                <Dropdown
                  style={[styles.dropdown]}
                  data={cardExpiredDate}
                  placeholder={'Yıl'}
                  labelField="value"
                  valueField="value"
                  value={cardExpireYear}
                  itemTextStyle={{
                    fontSize: 15,
                    color: '#000000',
                    textAlign: 'center',
                  }}
                  itemContainerStyle={{
                    borderBottomColor: 'lightgray',
                    borderBottomWidth: 1,
                  }}
                  placeholderStyle={{textAlign: 'center', color: '#636363'}}
                  selectedTextStyle={{textAlign: 'center', color: '#000000'}}
                  onChange={item => setCardExpireYear(item.value)}
                />
              </View>
            </View>
            <View style={{alignItems: 'flex-start', marginEnd: 10}}>
              <Text style={styles.title}>CVV</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: 100,
                }}>
                <TextInput
                  style={[styles.dropdown, {width: 60}]}
                  onChangeText={txt => setCVV(txt)}
                  placeholder={'CVV'}
                  textAlign={'center'}
                  keyboardType="number-pad"
                  placeholderTextColor={'#636363'}
                />
                <View
                  style={{
                    borderWidth: 0.6,
                    borderColor: '#D0D5DD',
                    padding: 5,
                    borderRadius: 80,
                  }}>
                  <Image
                    source={require('../../../../../assets/images/question-vector.png')}
                    style={{marginStart: 5, alignItems: 'center'}}
                  />
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              marginStart: 5,
              padding: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{backgroundColor: '#66AE7B', borderRadius: 100}}>
              <Icon name={'check'} size={16} color={'white'} />
            </View>
            <Text style={{marginStart: 5, color: '#333333'}}>
              3D Secure ile ödemek istiyorum
            </Text>
          </View>
          <View style={styles.noteWrapper}>
            <Text style={styles.title}>Sipariş Notu</Text>
            <TextInput
              style={styles.noteInput}
              onChangeText={txt => setOrderNote(txt)}
              placeholder={'Lütfen sipariş notunuzu giriniz'}
              multiline
              numberOfLines={5}
              textAlignVertical={'top'}
              placeholderTextColor={'#636363'}
            />
          </View>
        </View>
        <OrderSummary />
      </View>
      <View style={[styles.label, styles.shadowEffect, styles.androidShadow]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
          }}>
          {/*Radio Button eklenecek */}
          <View
            style={{
              backgroundColor: '#66AE7B',
              borderRadius: 100,
              justifyContent: 'center',
            }}>
            <Icon name={'check'} size={18} color={'white'} />
          </View>
          <Text style={styles.labelTxt}>
            Ön Bilgilendirme Formunu ve Mesafeli Satış sözleşmesini okudum,
            kabul ediyorum.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            dispatch(confirm(true));
            navigation.navigate('OrderDetailScreen');
          }}>
          <Text style={styles.btnTxt}>Onayla ve Bitir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentDetails;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'space-between',
  },
  container: {
    margin: 10,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  noteWrapper: {
    marginTop: 10,
    width: '98%',
  },
  input: {
    backgroundColor: '#FEFEFE',
    borderRadius: 20,
    margin: 5,
    borderWidth: 1.5,
    borderColor: 'lightgray',
    padding: 3,
    paddingStart: 20,
    color: '#333333',
  },
  noteInput: {
    backgroundColor: '#FEFEFE',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#D0D5DD',
    height: 100,
    paddingStart: 20,
    paddingTop: 20,
    paddingEnd: 20,
    color: '#333333',
    marginStart: 10,
    marginEnd: 8,
    alignItems: 'center',
  },
  title: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '600',
    padding: 4,
    marginStart: 5,
    marginBottom: 7,
  },
  label: {
    backgroundColor: 'white',
    paddingBottom: 10,
    paddingStart: 10,
    paddingEnd: 10,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    alignItems: 'center',
    borderColor: 'lightgray',
    borderTopWidth: 1,
  },
  labelTxt: {
    padding: 20,
    fontSize: 13,
    color: '#333333',
  },
  btn: {
    alignItems: 'center',
    backgroundColor: '#66AE7B',
    padding: 5,
    borderRadius: 10,
    width: '100%',
    marginBottom: 12,
  },
  btnTxt: {
    textAlign: 'center',
    color: '#FEFEFE',
    padding: 5,
    fontSize: 16,
    fontWeight: '600',
  },
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 20,
    paddingHorizontal: 8,
    width: 80,
    marginStart: 7,
    marginBottom: 3,
    backgroundColor: 'white',
    color: '#333333',
  },
  shadowEffect: {
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  androidShadow: {
    elevation: 1,
  },
});
