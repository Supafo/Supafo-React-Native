import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import OrderSummary from './OrderSummary';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import {cardExpiredDate, numberOfMonths} from '../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {confirm} from '../../../../../store/slices/isCartConfirmed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../../../../theme/colors';
import {
  setIsOrdered,
  setOrderDetail,
} from '../../../../../store/slices/orderDetail';
import fireStore from '@react-native-firebase/firestore';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {RootState} from '../../../../../store/store';

type Prop = {
  item: any;
};

const PaymentDetails = ({item}: Prop) => {
  const [cartNumber, setCartNumber] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [cardMonth, setCardMonth] = useState('');
  const [cardExpireYear, setCardExpireYear] = useState('');
  const [CVV, setCVV] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  const [isAcceptSelected, setIsAcceptSelected] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const UserId = useSelector((state: RootState) => state.setUserId.id);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const deleteAllItemsRequest = async () => {
    try {
      const userId = UserId;
      await fireStore()
        .collection(userId)
        .doc('cart')
        .collection('items')
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

  const createOrder = async () => {
    try {
      const userId = UserId;
      const orderDetails = {
        cartNumber,
        orderNote,
        cardMonth,
        cardExpireYear,
        CVV,
        status: 'PreparingOrder',
        createdAt: new Date(),
        items: item,
      };
      await fireStore()
        .collection(userId)
        .doc('orders')
        .collection('ordersList')
        .add(orderDetails);
      console.log('Sipariş başarıyla oluşturuldu.');
    } catch (error) {
      console.error('Siparişi oluştururken bir hata oluştu:', error);
    }
  };

  return (
    <View style={styles.main}>
      <View>
        <View style={styles.container}>
          <View style={{paddingHorizontal: 10}}>
            <Text style={styles.title}>Kart No</Text>
            <TextInput
              style={styles.input}
              onChangeText={(txt: string) => setCartNumber(txt)}
              placeholder={isFocused2 ? '' : '0000 1111 2222 3333'}
              onFocus={() => setIsFocused2(true)}
              onBlur={() => setIsFocused2(false)}
              placeholderTextColor={'#636363'}
              value={cartNumber}
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
                    onChange={item => setCardMonth(item.value)}
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
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={isFocused ? '' : 'CVV'}
                    textAlign={'center'}
                    keyboardType="number-pad"
                    placeholderTextColor={'#636363'}
                    value={CVV}
                  />
                  <View
                    style={{
                      borderWidth: 0.6,
                      borderColor: '#D0D5DD',
                      borderRadius: 100,
                      padding: 2,
                      marginStart: 5,
                    }}>
                    <AntDesign
                      name={'question'}
                      size={24}
                      color={colors.openOrange}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <Pressable
            onPress={toggleModal}
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderTopColor: '#D0D5DD',
              borderBottomColor: '#D0D5DD',
              marginTop: 18,
              paddingVertical: 13,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: '#333333', fontWeight: '500', fontSize: 16}}>
                Kredi Kartı Bilgilendirme
              </Text>
              <View
                style={{
                  borderWidth: 0.6,
                  borderColor: '#66AE7B',
                  borderRadius: 100,
                  backgroundColor: '#66AE7B',
                  padding: 2,
                  marginStart: 5,
                }}>
                <AntDesign name={'question'} size={24} color="white" />
              </View>
            </View>
          </Pressable>
          <View style={styles.noteWrapper}>
            <Text style={styles.title}>Sipariş Notu</Text>
            <TextInput
              style={styles.noteInput}
              onChangeText={txt => setOrderNote(txt)}
              placeholder={isFocused3 ? '' : 'Lütfen sipariş notunuzu giriniz'}
              onFocus={() => setIsFocused3(true)}
              onBlur={() => setIsFocused3(false)}
              multiline
              numberOfLines={5}
              textAlignVertical={'top'}
              placeholderTextColor={'#636363'}
              value={orderNote}
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
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              paddingLeft: 10,
            }}>
            <BouncyCheckbox
              bounceEffectIn={1}
              bounceEffect={0}
              bounceVelocityIn={0}
              bounceVelocityOut={0}
              size={24}
              innerIconStyle={{
                borderRadius: 25,
                borderWidth: 2,
                width: 17,
                height: 17,
              }}
              fillColor="#66AE7B"
              unFillColor="#fff"
              text=""
              iconStyle={{
                borderColor: '#66AE7B',
                borderRadius: 25,
                width: 17,
                height: 17,
              }}
              textStyle={{fontFamily: 'JosefinSans-Regular'}}
              isChecked={isAcceptSelected}
              onPress={(isChecked: boolean) => {
                setIsAcceptSelected(isChecked);
              }}
            />
          </View>
          <View style={{paddingVertical: 20, paddingRight: 20, width: '100%'}}>
            <Text style={{fontSize: 13, color: '#000000'}}>
              <Text style={[styles.policies, {marginRight: 10}]}>
                Ön Bilgilendirme Formunu
              </Text>
              <Text style={{fontSize: 13}}> ve </Text>
              <Text style={styles.policies}>Mesafeli Satış sözleşmesi </Text>
              <Text style={{color: 'black', textDecorationLine: 'none'}}>
                'ni okudum
              </Text>
              <Text>, kabul ediyorum.</Text>
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={async () => {
            dispatch(confirm(true));
            dispatch(setOrderDetail('PreparingOrder'));
            navigation.navigate('OrderDetailScreen');
            dispatch(setIsOrdered(true));
            await deleteAllItemsRequest();
            await createOrder();
          }}>
          <Text style={styles.btnTxt}>Onayla ve Bitir</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>
              Gizliliğiniz ve Güvenliğiniz Önceliğimizdir
            </Text>
            <View style={{paddingHorizontal: 20}}>
              <Text style={styles.description}>Değerli Kullanıcımız,</Text>
              <Text style={styles.description}>
                Güvenliğiniz ve gizliliğiniz bizim için en önemli önceliktir. Bu
                nedenle, kredi kartı bilgilerinizi saklamamayı tercih ediyoruz.
                Kredi kartı bilgilerinizi saklamayarak, kişisel ve finansal
                bilgilerinizin güvenliğini en üst düzeyde tutmayı amaçlıyoruz.
              </Text>
              <Text style={styles.description}>
                Kredi kartı işlemleriniz, güvenli ve şifreli bağlantılar
                üzerinden ödeme hizmeti sağlayıcılarımız
                tarafındangerçekleştirilir. Bu sayede, bilgileriniz sadece işlem
                anında kullanılır ve saklanmaz. Bu yaklaşımımızla, siz değerli
                kullanıcılarımızın güvenini kazanmayı ve verilerinizi korumayı
                hedefliyoruz.
              </Text>
              <Text style={styles.description}>
                Anlayışınız ve desteğiniz için teşekkür ederiz.
              </Text>
            </View>

            <View style={styles.modalLine} />
            <TouchableOpacity style={styles.openButton} onPress={toggleModal}>
              <Text style={styles.confirmTxt}>Anladım</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    // margin: 10,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  noteWrapper: {
    marginTop: 30,
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 15,
    alignSelf: 'center',
  },
  policies: {
    paddingVertical: 10,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    color: '#66AE7B',
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    backgroundColor: '#FEFEFE',
    borderRadius: 15,
    margin: 5,
    borderWidth: 1.5,
    borderColor: 'lightgray',
    padding: 3,
    paddingStart: 20,
    color: '#333333',
    height: 40,
  },
  noteInput: {
    backgroundColor: '#FEFEFE',
    borderRadius: 15,
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
    fontWeight: '500',
    padding: 4,
    marginStart: 5,
    marginBottom: 7,
  },
  label: {
    // backgroundColor: 'white',
    padding: 10,
    borderTopStartRadius: 25,
    borderTopEndRadius: 20,
    alignItems: 'center',
    borderColor: 'lightgray',
    // borderWidth: 1,
  },
  labelTxt: {
    paddingVertical: 10,
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
    borderRadius: 15,
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
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  androidShadow: {
    elevation: 1,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    marginVertical: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  modalLine: {
    backgroundColor: '#66AE7B',
    height: 1,
    width: '100%',
    marginTop: 20,
  },
  openButton: {
    paddingTop: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  confirmTxt: {
    color: colors.greenColor,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 5,
  },
  icons: {
    margin: 5,
  },
  modalTitle: {
    padding: 20,
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  description: {
    color: '#333333',
    fontSize: 12,
    textAlign: 'center',
    padding: 10,
  },
});
