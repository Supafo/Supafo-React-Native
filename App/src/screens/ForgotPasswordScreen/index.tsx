import React from 'react';
import Screen from '../../components/Screen';
import {Image, TouchableOpacity, View} from 'react-native';
import {
  EmailIcon,
  EmailIconDark,
  ForgotPasswordImage,
  Icon,
  PasswordIcon,
  SMSIcon,
} from '../../assets/images';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import routes, {RootStackParamList} from '../../navigation/routes';
import Header from '../../components/Header';

function ForgotPasswordScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <Screen
      header={<Header title="Sıfırlama Yöntemi Seç"/>}
      className="items-center justify-center px-[40px]">
     <View style={{alignItems: 'center', justifyContent:'space-evenly', width: '100%', flex: 1}}>
     <Image
        source={ForgotPasswordImage}
        resizeMode="contain"
        className="h-[154px]"
      />
      <View className="mt-[10px] w-full" style={{rowGap: 20}}>
        <Button
          image={EmailIconDark}
          onPress={() =>
            navigation.navigate(routes.FORGOT_PASSWORD_BY_EMAIL_SCREEN)
          }
          variant="light"
          className="mt-[15px] rounded-[15px]">
          Mail ile doğrula
        </Button>
        <Button
          image={SMSIcon}
          onPress={() =>
            navigation.navigate(routes.FORGOT_PASSWORD_BY_SMS_SCREEN)
          }
          variant="light"
          className="rounded-[15px] mt-[15px]" style={{alignItems: 'center', width: '100%'}}>
          SMS ile doğrula
        </Button>
      </View>
     </View>
    </Screen>
  );
}

export default ForgotPasswordScreen;
