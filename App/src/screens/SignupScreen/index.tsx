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
          <Divider text="OR" />
        </View>
        <SocialButtons
          googleOnPress={() => {}}
          appleOnPress={() => {}}
          fbOnPress={() => {}}
        />
        <View style={styles.footerTextContainer}>
          <RNText style={styles.footerText}>Hesabın var mı? </RNText>
          <TouchableOpacity onPress={() => navigation.navigate(routes.LOGIN_SCREEN)}>
            <RNText style={styles.loginText}>Giriş Yap</RNText>
            <View style={{bottom: moderateScale(1), height:verticalScale(1.25), backgroundColor: '#66AE7B', left: moderateScale(3.25),width:scale(41.5)}}>
            </View>
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
    width: '100%',
    height: verticalScale(62),
  },
  headerTxt: {
    marginTop: verticalScale(15),
    fontSize: moderateScale(18),
    marginBottom: verticalScale(20),

    color:'#333333'
  },
  icon: {
    height: verticalScale(105),
    marginTop: moderateScale(12.5),
    margin: moderateScale(7.5),
  },
  formContainer: {
    width: '100%',
    rowGap: moderateScale(0),
  },
  signupButton: {
    borderRadius: moderateScale(16),
    width: scale(272.5),
    height:verticalScale(34),
    justifyContent:'center',
    backgroundColor: colors.greenColor,
    alignItems: 'center',
    opacity: 0.7,
    marginTop: moderateScale(45),
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    top: moderateScale(20),
  },
  dividerContainer: {
    marginBottom: moderateScale(10),
    marginTop: moderateScale(4),
  },
  footerTextContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(5),
  },
  footerText: {
    color: '#333333',
    fontSize: moderateScale(12.5)
  },
  loginText: {
    color: '#66AE7B',
    fontSize: moderateScale(12),
  },
});

export default SignupScreen;
