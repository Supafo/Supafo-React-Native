import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Screen from '../../components/Screen';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Text from '../../components/Text';
import Header from '../../components/Header';
import ValueCheck from './components/ValueCheck';
import {Icon, PasswordIcon, SetPasswordSuccessImage} from '../../assets/images';
import routes, { RootStackParamList } from '../../navigation/routes';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {moderateScale, verticalScale} from 'react-native-size-matters';

function SetPasswordScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValidations, setPasswordValidations] = useState({
    lengthCheck: false,
    uppercaseCheck: false,
    numberCheck: false,
  });

  useEffect(() => {
    const validatePassword = () => {
      const lengthCheck = password.length >= 6 && password.length <= 15;
      const uppercaseCheck = /[A-Z]/.test(password);
      const numberCheck = /\d/.test(password);

      setPasswordValidations({
        lengthCheck,
        uppercaseCheck,
        numberCheck,
      });
    };

    validatePassword();
  }, [password]);

  const handleContinue = () => {
    if (
      passwordValidations.lengthCheck &&
      passwordValidations.uppercaseCheck &&
      passwordValidations.numberCheck
    ) {
      setSuccess(true);
    } else {
      console.log('Please fulfill all password requirements.');
    }
  };

  if (success) {
    return (
      <Screen
        header={<Header noBackButton={false} title="Yeni Şifre Oluştur" />}
        style={styles.successScreenContainer}>
        <Image
          source={SetPasswordSuccessImage}
          resizeMode="contain"
          style={styles.successImage}
        />
        <View style={styles.successMessageContainer}>
          <Text style={styles.successText}>Şifreniz Başarıyla Güncellendi!</Text>
          <Button
            onPress={() => navigation.navigate(routes.LOGIN_SCREEN)}
            style={styles.successButton}>
            Giriş Yap
          </Button>
        </View>
      </Screen>
    );
  }

  return (
    <Screen
      header={<Header title="Yeni Şifre Oluştur" />}
      style={styles.screenContainer}>
      <Image
        source={Icon}
        resizeMode="contain"
        style={styles.iconImage}
      />
      <View style={styles.inputContainer}>
        <Input
          value={password}
          fontSize={moderateScale(14)}
          onChangeText={text => setPassword(text)}
          placeholder="Şifre"
          icon={PasswordIcon}
          isPassword
        />
        <Input
          value={confirmPassword}
          fontSize={moderateScale(14)}
          onChangeText={text => setConfirmPassword(text)}
          heading='Şifre Tekrar'
          placeholder="Şifre"
          icon={PasswordIcon}
          isPassword
        />
        <View style={styles.validationContainer}>
          <ValueCheck
            check={passwordValidations.lengthCheck}
            text="6 ile 15 karakter arasında olmalıdır."
          />
          <ValueCheck
            check={passwordValidations.uppercaseCheck}
            text="Büyük harf içermeli."
          />
          <ValueCheck
            check={passwordValidations.numberCheck}
            text="Rakam içermeli."
          />
        </View>
        <Button
          onPress={() => {
            handleContinue();
            navigation.navigate(routes.PASSWORD_UPDATED);
          }}
          style={styles.continueButton}>
          Devam Et
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: moderateScale(40),
    paddingTop: verticalScale(37),
  },
  iconImage: {
    height: verticalScale(117.5),
    marginTop: verticalScale(5),
  },
  inputContainer: {
    marginTop: verticalScale(10),
    width: '100%',
    rowGap: moderateScale(10),
  },
  validationContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#66AE7B',
    borderRadius: moderateScale(15),
    padding: moderateScale(19),
    marginTop: verticalScale(35),
    gap: moderateScale(12),
  },
  continueButton: {
    marginTop: verticalScale(30),
    borderRadius: moderateScale(20),
  },
  successScreenContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: moderateScale(40),
    paddingTop: verticalScale(85),
  },
  successImage: {
    height: verticalScale(150),
  },
  successMessageContainer: {
    marginTop: verticalScale(43),
    width: '100%',
    rowGap: moderateScale(20),
  },
  successText: {
    textAlign: 'center',
  },
  successButton: {
    marginTop: verticalScale(43),
    borderRadius: moderateScale(15),
  },
});

export default SetPasswordScreen;
