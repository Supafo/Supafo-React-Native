import React, {useState} from 'react';
import Screen from '../../components/Screen';
import {Image, View, Alert} from 'react-native';
import {ForgotPasswordLockImage} from '../../assets/images';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import routes, {RootStackParamList} from '../../navigation/routes';
import Header from '../../components/Header';
import PhoneInput from '../../components/PhoneInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {OtpInput} from 'react-native-otp-entry';
import Text from '../../components/Text';
import auth from '@react-native-firebase/auth'; // Firebase Authentication'ı ekleyin

function ForgotPasswordBySmsScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+90'); // Default country code for Turkey
  const [isVerify, setIsVerify] = useState(false);
  const [verificationId, setVerificationId] = useState(null); // Verification ID için state ekleyin
  const [code, setCode] = useState(''); // OTP kodu için state ekleyin

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
    <Screen
      header={<Header title="Şifre Sıfırlama" />}
      className="items-center justify-start px-[40px] pt-[35px]">
      <Image
        source={ForgotPasswordLockImage}
        resizeMode="contain"
        className="h-[154px]"
      />
      <View className="mt-[50px] w-full" style={{rowGap: 20}}>
        <PhoneInput
          onChangeNumber={text => setPhone(text)}
          placeholder="Telefon Numarası"
          onChangeCountry={code => setCountryCode(code)} // Ülke kodunu ayarlamak için bir işlev
        />
        <Button
          onPress={sendVerificationCode}
          className="mt-[40px] rounded-[15px]">
          Kod Gönder
        </Button>
      </View>
    </Screen>
  );
}

export default ForgotPasswordBySmsScreen;
