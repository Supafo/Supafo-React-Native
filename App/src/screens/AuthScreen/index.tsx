import React from 'react';
import Screen from '../../components/Screen';
import {Image, View} from 'react-native';
import {Icon} from '../../assets/images';
import Button from '../../components/Button';
import AuthBanner from './components/AuthBanner';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import routes, {RootStackParamList} from '../../navigation/routes';

function AuthScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <Screen className="justify-center items-center px-[40px]">
      <Image source={Icon} resizeMode="contain" className="h-[204px]" />
      <View className="mt-[84px] w-full">
        <Button
          onPress={() => {
            navigation.navigate(routes.LOGIN_SCREEN);
          }}
          className="mb-[16px] rounded-full">
          Giriş Yap
        </Button>
        <Button
          onPress={() => {
            navigation.navigate(routes.SIGNUP_SCREEN);
          }}
          variant="light"
          className="rounded-full">
          Kayıt Ol
        </Button>
      </View>
      <View className="w-full mb-[63px] absolute bottom-0">
        <AuthBanner />
      </View>
    </Screen>
  );
}

export default AuthScreen;
