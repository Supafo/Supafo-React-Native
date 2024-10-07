import React, { useEffect, useState } from 'react';
import Screen from '../../components/Screen';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {EmailIcon, ForgotPasswordLockImage} from '../../assets/images';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import routes, {RootStackParamList} from '../../navigation/routes';
import Header from '../../components/Header';
import Input from '../../components/Input';
import SubmitButton from '../ForgotPasswordBySmsScreen/components/SubmitButton';
import HeaderEmailScreen from '../ForgotPasswordBySmsScreen/components/Header';
import LockIcon from '../ForgotPasswordBySmsScreen/components/LockIcon';
import { ArrowBackIcon } from '../../assets/images';
import responsiveScale from '../../utils/responsiveScale';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {colors} from '../../theme/colors';


const {scale, moderateScale, verticalScale} = responsiveScale;



function ForgotPasswordByEmailScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [text, setText] = useState('');

  {/*
    useEffect(() => {
    // Simple email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsButtonEnabled(emailPattern.test(email));
  }, [email]);

  const handleSendEmail = async () => {
    try {
      await axios.post('/api/forgot-password', { email }); // Adjust the endpoint based on your API structure
      Alert.alert('Başarılı', 'Şifre sıfırlama e-postası gönderildi.');
      navigation.navigate(routes.LOGIN_SCREEN); // Navigate to login or another screen
    } catch (error) {
      console.error('E-posta gönderme hatası:', error);
      Alert.alert('Hata', 'E-posta gönderilemedi. Lütfen tekrar deneyin.');
    }
  };
    * */}
  const handleBack = () => {
    navigation.navigate(routes.LOGIN_SCREEN);
  };


  return (
    <View
      style={styles.screenContainer}>
      <Header title="Şifre Sıfırlama" onPress={handleBack}/>
      <View>
        <View style={{marginTop:moderateScale(-27.5)}}>
           <LockIcon lockImage={ForgotPasswordLockImage} />
        </View>
      <View style={{width:wp('88%'),justifyContent:'center',marginTop:moderateScale(-30),}}>
        <Input 
        placeholder="Email" 
        icon={EmailIcon} 
        heading="Email"
        onChangeText={(text) => {
          setText(text)
          setIsButtonEnabled(true)
        }} />
        
        <View style={{alignItems:'center', marginBottom: moderateScale(0),marginTop:verticalScale(402.5)}}>
          <TouchableOpacity
          onPress={() => navigation.navigate(routes.FORGOT_PASSWORD_BY_SMS_SCREEN)}
          style={{
            borderRadius: moderateScale(15),
            width: wp('88%'),
            height:hp('5.25%'),
            backgroundColor: colors.greenColor,
            alignItems: 'center',
            marginTop: verticalScale(80),
            justifyContent:'center',
            opacity: isButtonEnabled ? 1 : 0.7,
          }}
          disabled={!isButtonEnabled}>
          <Text style={{fontSize: moderateScale(16), color: 'white',}}>
            Kod Gönder
          </Text>
        </TouchableOpacity>
        </View>      
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'center'
  },
});

export default ForgotPasswordByEmailScreen;