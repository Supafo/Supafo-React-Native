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
import {colors} from '../../theme/colors';


const {scale, moderateScale, verticalScale} = responsiveScale;



function ForgotPasswordByEmailScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [text, setText] = useState('');

  const handleBack = () => {
    navigation.navigate(routes.LOGIN_SCREEN);
  };


  return (
    <View
      style={styles.screenContainer}>
      <Header title="Şifre Sıfırlama" onPress={handleBack}/>
      <View>
        <View>
           <LockIcon lockImage={ForgotPasswordLockImage} />
        </View>
      <View style={{width:'87.5%',justifyContent:'center'}}>
        <Input 
        placeholder="example@gmail.com" 
        icon={EmailIcon} 
        heading="Email"
        onChangeText={(text) => {
          setText(text)
          setIsButtonEnabled(true)
        }} />
        
        <View style={{alignItems:'center', marginBottom: moderateScale(70),marginTop:moderateScale(85)}}>
          <TouchableOpacity
          onPress={() => navigation.navigate(routes.FORGOT_PASSWORD_BY_SMS_SCREEN)}
          style={{
            borderRadius: moderateScale(15),
            width: scale(272.5),
            height:verticalScale(34),
            backgroundColor: colors.greenColor,
            alignItems: 'center',
            marginTop: moderateScale(5),
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