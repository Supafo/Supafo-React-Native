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


function ForgotPasswordByEmailScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    setIsButtonEnabled(emailPattern.test(''));
  }, []);

  return (
    <Screen
      header={<Header title="Şifre Sıfırlama" />}
      style={styles.screenContainer}>
      <Image
        source={ForgotPasswordLockImage}
        resizeMode="contain"
        style={styles.image}
      />
      <View style={styles.inputContainer}>
        <Input placeholder="example@gmail.com" icon={EmailIcon} heading="Email" />
        <SubmitButton
          onPress={() => navigation.navigate(routes.SET_PASSWORD_SCREEN)}
          isEnabled={isButtonEnabled}
          title="Kod Gönder"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: moderateScale(40),
    paddingTop: moderateScale(35),
  },
  image: {
    height: moderateScale(140),
  },
  inputContainer: {
    marginTop: moderateScale(34),
    width: '100%',
    rowGap: moderateScale(20),
  },
});

export default ForgotPasswordByEmailScreen;