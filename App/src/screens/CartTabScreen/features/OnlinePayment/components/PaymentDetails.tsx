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
import responsiveScale from '../../../../../utils/responsiveScale';

const {scale, verticalScale, moderateScale} = responsiveScale;
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
                                                    //import axios from "axios";
  const deleteAllItemsRequest = async () => {       //const response = await axios.delete(`/api/cart/delete-all-items/${UserId}`);

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
    {/**const response = await axios.post('/api/order/place-order', orderDetails, {
        headers: { Authorization: `Bearer ${UserId}` }, // Assuming JWT token is used for auth
      }); */}
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
          <View style={{paddingHorizontal: moderateScale(10)}}>
            <Text style={styles.title}>Kart No</Text>
            <TextInput
              style={styles.input}
              onChangeText={(txt: string) => setCartNumber(txt)}
              placeholder={isFocused2 ? '' : '0000 1111 2222 3333'}
              onFocus={() => setIsFocused2(true)}
              onBlur={() => setIsFocused2(false)}
              placeholderTextColor={'#636363'}
              value={cartNumber}
              keyboardType='number-pad'
              maxLength={16}
            />
            <View style={styles.wrapper}>
              <View>
                <Text style={styles.title}>Son Kullanma Tarihi</Text>
                <View style={{flexDirection: 'row'}}>
                  <Dropdown
                    style={[styles.dropdown, {marginEnd: moderateScale(20)}]}
                    data={numberOfMonths}
                    placeholder={'Ay'}
                    labelField="value"
                    valueField="value"
                    value={cardMonth}
                    itemTextStyle={{
                      fontSize: moderateScale(15),
                      color: '#000000',
                      textAlign: 'center',
                    }}
                    containerStyle={{borderRadius: moderateScale(5)}}
                    itemContainerStyle={{
                      borderBottomColor: '#D0D5DD',
                      borderBottomWidth: moderateScale(1),
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
                      fontSize: moderateScale(15),
                      color: '#000000',
                      textAlign: 'center',
                    }}
                    itemContainerStyle={{
                      borderBottomColor: 'lightgray',
                      borderBottomWidth: moderateScale(1),
                    }}
                    placeholderStyle={{textAlign: 'center', color: '#636363'}}
                    selectedTextStyle={{textAlign: 'center', color: '#000000'}}
                    onChange={item => setCardExpireYear(item.value)}
                  />
                </View>
              </View>
              <View style={{alignItems: 'flex-end', marginEnd: moderateScale(10)}}>
                <Text style={[styles.title, {right: moderateScale(20)}]}>CVC</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    width: scale(100),
                  }}>
                  <TextInput
                    style={[styles.dropdown, {width: scale(60)}]}
                    onChangeText={txt => setCVV(txt)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={isFocused ? '' : 'CVC'}
                    textAlign={'center'}
                    maxLength={4}
                    keyboardType="number-pad"
                    placeholderTextColor={'#636363'}
                    value={CVV}
                  />
                </View>
              </View>
            </View>
          </View>
          <Pressable
            onPress={toggleModal}
            style={{
              borderTopWidth: moderateScale(1),
              borderBottomWidth: moderateScale(1),
              borderTopColor: colors.strokeColor,
              borderBottomColor: colors.strokeColor,
              marginTop: moderateScale(25),
              paddingVertical: moderateScale(9),
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
              <Text style={{color: '#333333', fontWeight: '500', fontSize: moderateScale(16)}}>
                Kredi Kartı Bilgilendirme
              </Text>
              <View
                style={{
                  borderWidth: moderateScale(1),
                  borderColor: '#66AE7B',
                  borderRadius: moderateScale(999),
                  backgroundColor: '#66AE7B',
                  padding: moderateScale(2),
                  marginStart: moderateScale(5),
                }}>
                <AntDesign name={'question'} size={scale(20)} color="white" />
              </View>
            </View>
          </Pressable>
          <View style={styles.noteWrapper}>
            <Text style={styles.title}>Sipariş Notu</Text>
            <TextInput
              style={styles.noteInput}
              onChangeText={txt => setOrderNote(txt)}
              placeholder={isFocused3 ? '' : 'Yemekte pul biber, tatlı da gluten olmasın. Teşekkürler..   '}
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
            paddingTop: moderateScale(8.25),
          }}>
          <View
            style={{
              paddingLeft: moderateScale(25),
              marginRight:moderateScale(-7.5),
            }}>
            <BouncyCheckbox
              bounceEffectIn={1}
              bounceEffect={0}
              bounceVelocityIn={0}
              bounceVelocityOut={0}
              size={scale(20)}
              innerIconStyle={{
                borderRadius: moderateScale(25),
                borderWidth: moderateScale(1),
                width: scale(13),
                height: scale(13),
              }}
              fillColor="#66AE7B"
              unFillColor="#fff"
              text=""
              iconStyle={{
                borderColor: '#66AE7B',
                borderRadius: moderateScale(25),
                width: scale(13),
                height: scale(13),
              }}
              textStyle={{fontFamily: 'JosefinSans-Regular'}}
              isChecked={isAcceptSelected}
              onPress={(isChecked: boolean) => {
                setIsAcceptSelected(isChecked);
              }}
            />
          </View>
          <View style={{paddingVertical: verticalScale(16), paddingRight: moderateScale(20), width: '100%'}}>
            <Text style={{fontSize: moderateScale(13), color: '#000000'}}>
              <Text style={[styles.policies, {marginRight: moderateScale(10)}]}>
                Ön Bilgilendirme Formu
              </Text>
              <Text style={{fontSize: moderateScale(11)}}>'nu ve </Text>
              <Text style={styles.policies}>Mesafeli Satış sözleşmesi </Text>
              <Text style={{color: 'black', textDecorationLine: 'none',fontSize: moderateScale(11)}}>
                'ni okudum
              </Text>
              <Text style={{fontSize: moderateScale(11)}}>, kabul ediyorum.</Text>
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={async () => {
            if (isAcceptSelected) {
              dispatch(confirm(true));
              dispatch(setOrderDetail('PreparingOrder'));
              navigation.navigate('OrderDetailScreen');
              dispatch(setIsOrdered(true));
              await deleteAllItemsRequest();
              await createOrder();
            }
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
            <View style={{paddingHorizontal: moderateScale(20)}}>
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
    marginTop: verticalScale(7.5),
  },
  noteWrapper: {
    marginTop: verticalScale(17.5),
    paddingHorizontal: moderateScale(10),
    width: '100%',
    marginBottom: verticalScale(12.5),
    alignSelf: 'center',
  },
  policies: {
    paddingVertical: verticalScale(10),
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    color: '#66AE7B',
    fontSize: moderateScale(11),
    marginLeft: moderateScale(10),
    marginRight: moderateScale(10),
  },
  input: {
    backgroundColor: '#FEFEFE',
    borderRadius: moderateScale(15),
    marginHorizontal: moderateScale(5) ,
    borderWidth: moderateScale(1),
    borderColor: '#D0D5DD',
    padding: moderateScale(3),
    paddingStart: moderateScale(20),
    color: '#333333',
    height: scale(35),
  },
  noteInput: {
    backgroundColor: '#FEFEFE',
    fontSize: moderateScale(11.95),
    borderRadius: moderateScale(15),
    borderWidth: moderateScale(1),
    borderColor: '#D0D5DD',
    height: scale(85),
    paddingStart: moderateScale(20),
    paddingTop: moderateScale(10),
    paddingEnd: moderateScale(20),
    color: '#333333',
    marginStart: moderateScale(10),
    marginEnd: moderateScale(10),
    alignItems: 'center',
  },
  title: {
    paddingStart: moderateScale(8.75),
    color: '#333333',
    fontSize: moderateScale(14),
    fontWeight: '500',
    padding: moderateScale(3.5),
    marginBottom: 0,
  },
  label: {
    backgroundColor: 'white',
    padding: moderateScale(10),
    alignItems: 'center',
    borderTopStartRadius: moderateScale(15),
    borderTopEndRadius: moderateScale(15),
    borderWidth: moderateScale(1),
    borderColor: '#D0D5DD',
  },
  labelTxt: {
    paddingVertical: verticalScale(10),
    fontSize: moderateScale(13),
    color: '#333333',
  },
  btn: {
    alignItems: 'center',
    backgroundColor: '#66AE7B',
    padding: moderateScale(5),
    borderRadius: moderateScale(15),
    width: '95%',
    marginBottom: moderateScale(12.5),
    marginTop: moderateScale(12.5),
  },
  btnTxt: {
    textAlign: 'center',
    color: '#FEFEFE',
    padding: moderateScale(5),
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
  dropdown: {
    height: scale(35),
    borderWidth: moderateScale(1),
    borderColor:'#D0D5DD',
    borderRadius: moderateScale(15),
    paddingHorizontal: moderateScale(8),
    width: scale(70),
    marginStart: moderateScale(7),
    marginBottom: verticalScale(3),
    backgroundColor: 'white',
    color: '#333333',
  },
  shadowEffect: {
    shadowColor: 'black',
    shadowOffset: {
      width: scale(1),
      height: scale(1),
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  androidShadow: {
    elevation: 1,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: scale(1), height: scale(1)},
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
    marginVertical: verticalScale(20),
    backgroundColor: 'white',
    borderRadius: moderateScale(20),
    paddingVertical: verticalScale(20),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: scale(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  modalLine: {
    backgroundColor: '#66AE7B',
    height: scale(1),
    width: '100%',
    marginTop: verticalScale(23.5),
  },
  openButton: {
    marginBottom:moderateScale(-17.5),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: moderateScale(12.5),
  },
  confirmTxt: {
    color: colors.greenColor,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: moderateScale(12),    
  },
  icons: {
    margin: moderateScale(5),
  },
  modalTitle: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: '#333333',
    marginBottom: moderateScale(27.5),
    marginTop: moderateScale(8),
  },
  description: {
    color: '#333333',
    fontSize: moderateScale(10.75),
    textAlign: 'center',
    marginBottom: moderateScale(10),
  },
});
