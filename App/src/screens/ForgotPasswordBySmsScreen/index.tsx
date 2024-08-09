import React, {useState, useEffect} from 'react';
import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Image } from 'react-native';
import Screen from '../../components/Screen';
import {ForgotPasswordLockImage} from '../../assets/images';
import { ArrowBackIcon } from '../../assets/images';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import routes, {RootStackParamList} from '../../navigation/routes';
import Header from '../../components/Header';
import PhoneInput from '../../components/PhoneInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {OtpInput} from 'react-native-otp-entry';
import auth from '@react-native-firebase/auth'; // Firebase Authentication'ı ekleyin
import RNPickerSelect from 'react-native-picker-select';
import { ArrowDownIcon } from '../../assets/images';


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
    <View style={styles.header}>
      <TouchableOpacity onPress={handleBack}>
        <Image
          source={ArrowBackIcon}
          style={styles.backButton}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Şifre Sıfırlama</Text>
    </View>
    <View style={styles.lockIcon}>
      <Image
        source={ForgotPasswordLockImage}
        style={styles.lockImage}
        resizeMode="contain"
      />
    </View>
    <View style={styles.inputRow}>
      <View style={[styles.inputContainer, styles.countryCodeContainer]}>
        <Text style={styles.label}>Ülke Kodu</Text>
        <View style={styles.countryCodeBox}>
          <Image
            //source={require('../../assets/images/arrow-bottom.png')} // Bayrak resmi
            //style={styles.flagImage}
          />
          <Text style={styles.countryCodeText}>{countryCode}</Text>
          <View style={styles.pickerContainer}>

            <RNPickerSelect
              onValueChange={(value) => setCountryCode(value)}
              items={[
                { label: 'TR +90', value: '+90' },
                { label: 'UK +44', value: '+44' },
                { label: 'USA +1', value: '+1' }
                // Add more country codes as needed
              ]}
              value={countryCode}
              
              placeholder={{
                label: "Ülke kodunu seçin...",
                value: null,
                color: '#9EA0A4',
              }}
            
              Icon={() => {
                return (
                  <View pointerEvents="none">
                    <Image
                      source={ArrowDownIcon}
                      style={styles.pickerIcon}
                    />
                  </View>
                );
              }}/>
                 
                  
          </View>
        </View>
      </View>
      <View style={[styles.inputContainer, styles.phoneNumberContainer]}>
        <Text style={styles.label}>Telefon Numarası</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholder="123 456 78 90"
          placeholderTextColor="#9EA0A4"
        />
      </View>
    </View>
    <TouchableOpacity 
        style={[styles.button, { backgroundColor: isButtonEnabled ? '#70bc63' : '#84a17f' }]} 
        onPress={sendVerificationCode}
        disabled={!isButtonEnabled}
      >
        <Text style={styles.buttonText}>Kod Gönder</Text>
      </TouchableOpacity>
  </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginRight: 15,
  },
  backButton: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    flex: 1,
    color: 'black',
  },
  lockIcon: {
    width: 175,
    height: 175,
    backgroundColor: '#fff',
    marginTop: 30,
    marginBottom: 30,
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  lockImage: {
    width: '100%',
    height: '100%',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  countryCodeContainer: {
    flex: 1,
    marginRight: 10,
    
  },
  phoneNumberContainer: {
    flex: 2,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 22,
    color: 'black',
    height: 50
  },
  countryCodeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 22,
    paddingHorizontal:5,
    height: 50,
  },
  flagImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  
  },
  countryCodeText: {
    fontSize: 16,
    color: 'black',
    flex: 1,
    textAlign: 'center',
  },
  pickerContainer: {
    flex:2,    
  },
  pickerIcon: {
    width:20,
    height:40,
    
  },
  button: {
    backgroundColor: '#A3D8A3',
    padding: 15,
    borderRadius: 22,
    alignItems: 'center',
    marginTop: 60,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  arrowIcon:{
    padding:10,
  }
});

export default ForgotPasswordBySmsScreen;
