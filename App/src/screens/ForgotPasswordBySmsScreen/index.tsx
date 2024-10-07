import React, {useState, useEffect} from 'react';
import { 
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,} from 'react-native';
import Screen from '../../components/Screen';
import {ForgotPasswordLockImage} from '../../assets/images';
import { ArrowBackIcon } from '../../assets/images';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import routes, {RootStackParamList} from '../../navigation/routes';
import Header from '../../components/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {OtpInput} from 'react-native-otp-entry';
import auth from '@react-native-firebase/auth'; // Firebase Authentication'ı ekleyin
import { ArrowDownIcon } from '../../assets/images';
import HeaderSmsScreen from '../ForgotPasswordBySmsScreen/components/Header';
import LockIcon from '../ForgotPasswordBySmsScreen/components/LockIcon';
import CountryCodeInput from '../ForgotPasswordBySmsScreen/components/CountryCodeInput';
import PhoneNumberInput from '../ForgotPasswordBySmsScreen/components/PhoneNumberInput';
import SubmitButton from '../ForgotPasswordBySmsScreen/components/SubmitButton';
import PhoneInput from '../../components/PhoneInput'
import responsiveScale from '../../utils/responsiveScale';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors} from '../../theme/colors';


const {scale, moderateScale, verticalScale} = responsiveScale;


function ForgotPasswordBySmsScreen() {

  const handleSendCode = () => {
    // Send code logic here
    //navigation.navigate(routes.SET_PASSWORD_SCREEN)
    console.log('Send code clicked', countryCode, phone);
  };

  const handleBack = () => {
    navigation.navigate(routes.LOGIN_SCREEN);
  };

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+90'); // Default country code for Turkey
  const [isVerify, setIsVerify] = useState(false);
  const [verificationId, setVerificationId] = useState(null); // Verification ID için state ekleyin
  const [code, setCode] = useState(''); // OTP kodu için state ekleyin
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isButtonActive2, setIsButtonActive2] = useState(false);

  useEffect(() => {
    
    const phoneNumberPattern = /^[0-9]{10,15}$/; // Telefon numarasının formatını kontrol edin
    setIsButtonEnabled(phoneNumberPattern.test(phone));
  }, [phone]);

  {/*
     const handleSendCode = async () => {
    const phoneNumber = `${countryCode}${phone.replace(/^0+/, '')}`; // Combine country code and phone number, removing leading zeros
    try {
      await axios.post('/api/send-sms', { phone: phoneNumber }); // Adjust the endpoint based on your API structure
      Alert.alert('Kod gönderildi', 'Doğrulama kodu SMS olarak gönderildi.');
      navigation.navigate(routes.SET_PASSWORD_SCREEN, { phone: phoneNumber }); // Navigate to the next screen with phone number if needed
    } catch (error) {
      console.error('SMS gönderme hatası:', error);
      Alert.alert('Hata', 'SMS doğrulama kodu gönderilemedi. Lütfen tekrar deneyin.');
    }
  };* */}

  const sendVerificationCode = async () => {
    const phoneNumber = `${countryCode}${phone.replace(/^0+/, '')}`; // Ülke kodunu ve telefon numarasını birleştirin, baştaki sıfırları kaldırın
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setVerificationId(confirmation.verificationId);
      setIsVerify(true);
    } catch (error) {
      console.error('SMS doğrulama hatası:', error);
      Alert.alert(
        'Hata',
        'SMS doğrulama kodu gönderilemedi. Lütfen tekrar deneyin.',
      );
    }
  };

  const confirmVerificationCode = async () => {
    try {
      const credential = auth.PhoneAuthProvider.credential(
        verificationId,
        code,
      );
      await auth().signInWithCredential(credential);
      navigation.navigate(routes.SET_PASSWORD_SCREEN);
    } catch (error) {
      console.error('OTP doğrulama hatası:', error);
      Alert.alert('Hata', 'Kod doğrulanamadı. Lütfen tekrar deneyin.');
    }
  };

  if (isVerify) {
    return (
      <Screen
        header={<Header title="Tek Seferlik Kod" />}
        style={{ alignItems: 'center',
          justifyContent: 'flex-start',
          paddingHorizontal: moderateScale(40),
          paddingTop: moderateScale(75),}}>
        <View style = {{flex : 1, width: '100%'}}>
          <View style={{flex:1, alignItems:'center'}}>
            <View style={{justifyContent:'center', alignItems:'center'}}>
              <Text
                style={{fontSize: moderateScale(21),fontWeight:'500',color: '#333333'}}>
                Hesabı Doğrula
              </Text>
              <Text  style={{color: '#333333',marginTop:moderateScale(12)}}>
                Size gelen 6 haneli kodu girin.
              </Text>
            </View>
            <View  style={{rowGap: 20,marginTop:moderateScale(61),width:'100%'}}>
              <OtpInput
                numberOfDigits={6}
                focusColor="green"
                focusStickBlinkingDuration={500}
                onTextChange={text => {
                  setCode(text)
                  setIsButtonActive(true)}}
                onFilled={text => {
                  confirmVerificationCode()
                  }}
                textInputProps={{
                  accessibilityLabel: 'One-Time Password',
                }}
                autoFocus
                theme={{
                  containerStyle: {
                    width: '100%',
                    gap: moderateScale(16.5),
                    justifyContent:'center',
                  },
                  pinCodeContainerStyle: {
                    backgroundColor: '#fff',
                    borderColor: '#D0D5DD',
                    borderWidth: moderateScale(1.5),
                    width: scale(32.5),
                    height: verticalScale(40),
                    borderRadius: moderateScale(5),
                  },
                  pinCodeTextStyle: {
                    color: '#333333',
                  },
                }}
              />
            </View>
            <Text  style={{color: '#333333', marginTop:moderateScale(40),textAlign:'center'}}>
              Size gelen 6 haneli kodu girin.
            </Text>
            <Button
              onPress={confirmVerificationCode}
              style={{marginTop: moderateScale(40), borderRadius:moderateScale(15), opacity: isButtonActive ? 1 : 0.7}}>
                <Text style={{textAlign:'center',fontSize:moderateScale(16)}}>
                  Kod Gönder
                </Text>
             
            </Button>
          </View>
        </View>
      </Screen>
    );
    
   
  }

  return (
    <View style={styles.container}>
    <Header title="Şifre Sıfırlama" noBackButton={true}/>
    <View style={{flex:1,flexDirection:'column',alignItems:'center'}}>
    <View style={{justifyContent:'center', marginTop:moderateScale(-27.5)}}>
      <LockIcon lockImage={ForgotPasswordLockImage} />
    </View>
    <View style={{ width:wp('88%'),alignItems:'center',justifyContent:'center',marginTop:moderateScale(-30)}}>
      <View style={styles.inputRow}>
    <PhoneInput
          value={phone}
          onChangeNumber={(text) => {
            setPhone(text)
            setIsButtonActive2(true)}}
          placeholder="123 456 78 90"
          heading='Telefon Numarası'
          fontSize={moderateScale(14)}
        />
    </View>
    <View style={{alignItems:'center', marginBottom: moderateScale(70),width:'100%'}}>
          <TouchableOpacity
          onPress={sendVerificationCode}
          style={{
            borderRadius: moderateScale(15),
            width: wp('88%'),
            height:hp('5.25%'),
            backgroundColor: colors.greenColor,
            alignItems: 'center',
            marginTop: verticalScale(405),
            justifyContent:'center',
            opacity: isButtonActive2 ? 1 : 0.7,
          }}
          disabled={!isButtonActive2}>
          <Text style={{fontSize: moderateScale(16), color: 'white',}}>
            Kod Gönder
          </Text>
        </TouchableOpacity>
      
        </View>      
    </View>
    </View>
</View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom:  verticalScale(81.5),
  },
});

export default ForgotPasswordBySmsScreen;
