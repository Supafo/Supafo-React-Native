import React, {useState} from 'react';
import Screen from '../../components/Screen';
import {Image, View} from 'react-native';
import {EmailIcon, ForgotPasswordLockImage} from '../../assets/images';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import routes, {RootStackParamList} from '../../navigation/routes';
import Header from '../../components/Header';
import Input from '../../components/Input';
import PhoneInput from '../../components/PhoneInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {OtpInput} from 'react-native-otp-entry';
import Text from '../../components/Text';

function ForgotPasswordBySmsScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [phone, setPhone] = useState('');
  const [isVerify, setIsVerify] = useState(false);
  if (isVerify) {
    return (
      <Screen
        header={<Header title="Şifre Sıfırlama" />}
        className="items-center justify-start px-[40px] pt-[35px]">
        <View className="flex-1 w-full">
          <View className="flex-1 items-center">
            <View className="justify-center items-center">
              <Text className="text-[18px] font-[500]">Hesabı Doğrula</Text>
              <Text className="mt-[12px]">Size gelen 6 haneli kodu girin.</Text>
            </View>
            <View className="mt-[61px] w-full" style={{rowGap: 20}}>
              <OtpInput
                numberOfDigits={6}
                focusColor="green"
                focusStickBlinkingDuration={500}
                onTextChange={text => console.log(text)}
                onFilled={text => console.log(`OTP is ${text}`)}
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
                }}
              />
            </View>
            <Text className="mt-[40px] text-center">
              Size gelen 6 haneli kodu girin.
            </Text>
            <Button
              onPress={() => navigation.navigate(routes.SET_PASSWORD_SCREEN)}
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
      <View className="mt-[34px] w-full" style={{rowGap: 20}}>
        <PhoneInput
          onChangeNumber={text => setPhone(text)}
          placeholder="Telefon Numarası"
        />
        <Button
          onPress={() => setIsVerify(true)}
          className="mt-[10px] rounded-[15px]">
          Kod Gönder
        </Button>
      </View>
    </Screen>
  );
}

export default ForgotPasswordBySmsScreen;
