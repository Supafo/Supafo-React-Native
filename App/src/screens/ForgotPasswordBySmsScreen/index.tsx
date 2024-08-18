import React, {useState, useEffect} from 'react';
import { 
  View,
  Text,
  StyleSheet,
  Alert,} from 'react-native';
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
import {moderateScale, verticalScale} from 'react-native-size-matters';
import PhoneInput from '../../components/PhoneInput'


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

  useEffect(() => {
    
    const phoneNumberPattern = /^[0-9]{10,15}$/; // Telefon numarasının formatını kontrol edin
    setIsButtonEnabled(phoneNumberPattern.test(phone));
  }, [phone]);

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
        className="items-center justify-start px-[40px] pt-[35px]">
        <View className="flex-1 w-full">
          <View className="flex-1 items-center">
            <View className="justify-center items-center">
              <Text
                className="text-[18px] font-[500]"
                style={{color: '#333333'}}>
                Hesabı Doğrula
              </Text>
              <Text className="mt-[12px]" style={{color: '#333333'}}>
                Size gelen 6 haneli kodu girin.
              </Text>
            </View>
            <View className="mt-[61px] w-full" style={{rowGap: 20}}>
              <OtpInput
                numberOfDigits={6}
                focusColor="green"
                focusStickBlinkingDuration={500}
                onTextChange={text => setCode(text)}
                onFilled={text => confirmVerificationCode()}
                textInputProps={{
                  accessibilityLabel: 'One-Time Password',
                }}
                autoFocus
                theme={{
                  containerStyle: {
                    width: '100%',
                  },
                  pinCodeContainerStyle: {
                    backgroundColor: '#fff',
                    borderColor: '#D0D5DD',
                    borderWidth: 1.5,
                  },
                  pinCodeTextStyle: {
                    color: '#333333',
                  },
                }}
              />
            </View>
            <Text className="mt-[40px] text-center" style={{color: '#333333'}}>
              Size gelen 6 haneli kodu girin.
            </Text>
            <Button
              onPress={confirmVerificationCode}
              className="mt-[40px] rounded-[15px]">
              Kod Gönder
            </Button>
          </View>
        </View>
      </Screen>
    );
    
   
  }

  return (
    <View style={styles.container}>
    <HeaderSmsScreen title="Şifre Sıfırlama" onBackPress={handleBack} backButtonImage={ArrowBackIcon} />
    <LockIcon lockImage={ForgotPasswordLockImage} />
    <View style={styles.inputRow}>
    <PhoneInput
          value={phone}
          onChangeNumber={(text) => setPhone(text)}
          placeholder="123 456 78 90"
          heading='Telefon Numarası'
          fontSize={moderateScale(14)}
        />
    </View>
    <SubmitButton
      onPress={sendVerificationCode}
      isEnabled={isButtonEnabled}
      title="Kod Gönder"
    />
</View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(20),
    backgroundColor: '#fff',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(15),
  },
});

export default ForgotPasswordBySmsScreen;
