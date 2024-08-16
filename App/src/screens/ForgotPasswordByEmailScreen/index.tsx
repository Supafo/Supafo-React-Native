import React, { useEffect, useState } from 'react';
import Screen from '../../components/Screen';
import {Image, StyleSheet, View} from 'react-native';
import {EmailIcon, ForgotPasswordLockImage} from '../../assets/images';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import routes, {RootStackParamList} from '../../navigation/routes';
import Header from '../../components/Header';
import Input from '../../components/Input';
import SubmitButton from '../ForgotPasswordBySmsScreen/components/SubmitButton';
import { moderateScale } from 'react-native-size-matters';
import HeaderEmailScreen from '../ForgotPasswordBySmsScreen/components/Header';
import LockIcon from '../ForgotPasswordBySmsScreen/components/LockIcon';
import { ArrowBackIcon } from '../../assets/images';



function ForgotPasswordByEmailScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleBack = () => {
    navigation.navigate(routes.LOGIN_SCREEN);
  };

  useEffect(() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    setIsButtonEnabled(emailPattern.test(''));
  }, []);

  return (
    <View
      style={styles.screenContainer}>
      <HeaderEmailScreen title="Şifre Sıfırlama" onBackPress={handleBack} backButtonImage={ArrowBackIcon} />
      <LockIcon lockImage={ForgotPasswordLockImage} />
      <View >
        <Input placeholder="example@gmail.com" icon={EmailIcon} heading="Email" />
        <SubmitButton
          onPress={() => navigation.navigate(routes.SET_PASSWORD_SCREEN)}
          isEnabled={isButtonEnabled}
          title="Kod Gönder"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: moderateScale(20),
    backgroundColor: '#fff',
  },
  image: {
    height: moderateScale(140),
    width: moderateScale(140),
  },
  inputContainer: {
    marginTop: moderateScale(34),
    width: '100%',
    rowGap: moderateScale(20),
  },
});

export default ForgotPasswordByEmailScreen;