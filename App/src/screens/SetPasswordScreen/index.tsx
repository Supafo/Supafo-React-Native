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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import responsiveScale from '../../utils/responsiveScale';

const {scale, verticalScale, moderateScale} = responsiveScale;

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
  const [pass1,setPass1] = useState('');
  const [pass2,setPass2] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleInputChange = (text, inputNumber) => {
    if (inputNumber === 1) {
      setPass1(text);
    } else if (inputNumber === 2) {
      setPass2(text);
    }

    if (text && pass1 && inputNumber === 2) {
      setIsButtonEnabled(true);
    } else if (text && pass2 && inputNumber === 1) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  };

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
          fontSize={moderateScale(13)}
          onChangeText={text => {
            setPassword(text)
          handleInputChange(password,1)}}
          placeholder="Şifre"
          icon={PasswordIcon}
          isPassword
        />
        <Input
          value={confirmPassword}
          fontSize={moderateScale(13)}
          onChangeText={text => {
            setConfirmPassword(text)
            handleInputChange(confirmPassword,2)}}
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
            text="Büyük harfler içermelidir."
          />
          <ValueCheck
            check={passwordValidations.numberCheck}
            text="Rakam içermelidir."
          />
        </View>
        <View style = {styles.containerNextButton}>
           <Button
          onPress={() => {
            handleContinue();
            navigation.navigate(routes.PASSWORD_UPDATED);
          }}
          disabled={!isButtonEnabled}
          style={[styles.continueButton,{opacity: isButtonEnabled ? 1 : 0.7}]}>
            <Text style={{color:'white'}}>
            Devam Et
            </Text>
         
        </Button>
        </View>
       
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconImage: {
      height: hp('13.75%'),
      marginTop: verticalScale(25),
      marginBottom: verticalScale(5),
  },
  inputContainer: {
    marginTop: verticalScale(28.5),
    width: '100%',
    rowGap: moderateScale(5),
  },
  validationContainer: {
    backgroundColor: 'white',
    borderColor: '#66AE7B',
    borderRadius: moderateScale(15),
    width:wp('100%'),
    height: hp('11.5%'),
    justifyContent:'center',
    marginTop: verticalScale(35),
    paddingStart: moderateScale(15),
    gap: verticalScale(-2.5)
  },
  continueButton: {
    marginTop: verticalScale(282.5),
    borderRadius: moderateScale(12),
    width: wp('88%'),
    opacity: 1
  },
  successScreenContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: moderateScale(40),
    paddingTop: verticalScale(85),
  },
  successImage: {
    height: hp('10%'),
  },
  successMessageContainer: {
    marginTop: verticalScale(43),
    width: wp('100%'),
    rowGap: moderateScale(20),
  },
  successText: {
    textAlign: 'center',
  },
  successButton: {
    marginTop: verticalScale(43),
    borderRadius: moderateScale(15),
  },
  containerNextButton:{
    justifyContent:'center',
    alignItems:'center'
  }
});

export default SetPasswordScreen;
