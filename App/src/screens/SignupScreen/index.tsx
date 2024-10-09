import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text as RNText } from 'react-native';
import Button from '../../components/Button';
import Divider from '../../components/Divider';
import SocialButtons from './components/SocialButtons';
import Text from '../../components/Text';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import routes, { RootStackParamList } from '../../navigation/routes';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Input from '../../components/Input';
import PhoneInput from '../../components/PhoneInput';
import { EmailIcon, Icon, PasswordIcon, UserIcon } from '../../assets/images';
import { colors } from '../../theme/colors';
import Header from '../../components/Header';
import {widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP} from 'react-native-responsive-screen';
import responsiveScale from '../../utils/responsiveScale';

const {scale, moderateScale, verticalScale} = responsiveScale;

function SignupScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);


  const __doCreateUser = async () => {
    if (name && email && phone && password) {
      try {
        {/*
          const response = await axios.post('YOUR_API_URL/register', {
        name,
        email,
        phoneNumber: phone,
        password,
      });
      * */}
        const userCredential = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        const user = userCredential.user;

        // Firestore'a kullanıcı bilgilerini kaydetme
        await firestore().collection('users').doc(user.uid).set({
          name,
          email,
          phone,
        });

        navigation.navigate(routes.LOGIN_SCREEN);
      } catch (error) {
        console.error('Kullanıcı oluşturma hatası:', error);
      }
    }
  };

  return (
    <View style={styles.main}>
      <Header title={'Kayıt Ol'} noBackButton={false}/>
      <Image
        source={Icon}
        resizeMode="contain"
        style={styles.icon}
      />
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Input
          value={name}
          fontSize={moderateScale(13)}
          style={{paddingStart:moderateScale(0)}}
          onChangeText={(text) => setName(text)}
          placeholder="Ad Soyad"
          icon={UserIcon}
          user={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
          fontSize={moderateScale(13)}
          value={email}
          style={{paddingStart:moderateScale(0)}}
          onChangeText={(text) => setEmail(text)}
          heading='Email'
          placeholder="example@gmail.com" 
          icon={EmailIcon}
          />
        </View>
        <View style={styles.inputContainer}>
          <PhoneInput
          value={phone}
          onChangeNumber={(text) => setPhone(text)}
          placeholder="123 456 78 90"
          heading='Telefon Numarası'
          fontSize={moderateScale(13)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
          fontSize={moderateScale(13)}
          value={password}
          style={{paddingStart:moderateScale(0)}}
          onChangeText={(text) => {
            setPassword(text)
            setIsButtonEnabled(true)}}
          placeholder="Şifre"
          icon={PasswordIcon}
          isPassword
          />
        </View>
        <View style={{alignItems:'center'}}>
          <TouchableOpacity
          onPress={__doCreateUser}
          style={[styles.signupButton,{opacity: isButtonEnabled? 1 : 0.7}]}
          disabled={!isButtonEnabled}>
          <Text style={{fontSize: moderateScale(16), color: 'white'}}>
            Kayıt Ol
          </Text>
        </TouchableOpacity>
        </View>
        
      </View>
      <View style={styles.footer}>
        <View style={styles.dividerContainer}>
          <Divider text="VEYA" />
        </View>
        <View> 
        <SocialButtons
          googleOnPress={() => {}}
          appleOnPress={() => {}}
          fbOnPress={() => {}}
        />
        </View>
        
        <View style={styles.footerTextContainer}>
          <RNText style={styles.footerText}>Hesabın var mı? </RNText>
          <TouchableOpacity onPress={() => navigation.navigate(routes.LOGIN_SCREEN)}>
            <RNText style={styles.loginText}>Giriş Yap</RNText>
            
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor:'white',
    paddingHorizontal: moderateScale(20),
    fontWeight:'500',
    alignItems: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    width: wp('88%'),
    height: hp('9.1725%'),
  },
  headerTxt: {
    marginTop: verticalScale(15),
    fontSize: moderateScale(18),
    marginBottom: verticalScale(20),

    color:'#333333'
  },
  icon: {
    height: hp('14%'),
    marginTop: verticalScale(18),
    marginBottom: verticalScale(10),
  },
  formContainer: {
    width: wp('88%'),
  },
  signupButton: {
    borderRadius: moderateScale(15),
    width: wp('88%'),
    height: hp('5.25%'),
    justifyContent:'center',
    backgroundColor: colors.greenColor,
    alignItems: 'center',
    opacity: 0.7,
    marginTop: verticalScale(22.5),
    marginBottom: verticalScale(10),
  },
  footer: {
    width: wp('88%'),
    alignItems: 'center',
  },
  dividerContainer: {
    marginTop: moderateScale(4),
  },
  footerTextContainer: {
    flexDirection: 'row',
  },
  footerText: {
    color: '#333333',
    fontSize: moderateScale(15),
    fontWeight:'400',
  },
  loginText: {
    color: '#66AE7B',
    fontWeight:'400',
    fontSize: moderateScale(15),
    textDecorationLine:'underline',
  },
});

export default SignupScreen;
