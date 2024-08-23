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
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Input from '../../components/Input';
import PhoneInput from '../../components/PhoneInput';
import { EmailIcon, Icon, PasswordIcon, UserIcon } from '../../assets/images';
import { colors } from '../../theme/colors';
import Header from '../../components/Header';

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
        <Input
          value={name}
          fontSize={moderateScale(14)}
          onChangeText={(text) => setName(text)}
          placeholder="Ad Soyad"
          icon={UserIcon}
        />
        <Input
          fontSize={moderateScale(14)}
          value={email}
          onChangeText={(text) => setEmail(text)}
          heading='Email'
          placeholder="example@gmail.com" 
          icon={EmailIcon}
        />
        <PhoneInput
          value={phone}
          onChangeNumber={(text) => setPhone(text)}
          placeholder="123 456 78 90"
          heading='Telefon Numarası'
          fontSize={moderateScale(14)}
        />
        <Input
          fontSize={moderateScale(14)}
          value={password}
          onChangeText={(text) => {
            setPassword(text)
            setIsButtonEnabled(true)}}
          placeholder="Şifre"
          icon={PasswordIcon}
          isPassword
        />
        <View style={{alignItems:'center'}}>
          <TouchableOpacity
          onPress={__doCreateUser}
          style={[styles.signupButton,{opacity: isButtonEnabled? 1 : 0.8}]}
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
          <RNText style={styles.footerText}>Hesabınız var mı? </RNText>
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
  headerTxt: {
    marginTop: verticalScale(15),
    fontSize: moderateScale(18),
    marginBottom: verticalScale(20),

    color:'#333333'
  },
  icon: {
    height: verticalScale(105),
    marginTop: verticalScale(12.5),
    margin: moderateScale(10),
  },
  formContainer: {
    width: '100%',
    rowGap: moderateScale(3),
  },
  signupButton: {
    borderRadius: moderateScale(20),
    width: moderateScale(295),
    height:verticalScale(40),
    justifyContent:'center',
    backgroundColor: colors.greenColor,
    alignItems: 'center',
    padding: moderateScale(7.5),
    opacity: 0.8,
    marginTop: moderateScale(37.5),
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    top: moderateScale(20),
  },
  dividerContainer: {
    marginBottom: verticalScale(10),
    marginTop: verticalScale(4),
  },
  footerTextContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(5),
  },
  footerText: {
    color: '#333333',
  },
  loginText: {
    color: '#66AE7B'
  },
});

export default SignupScreen;
