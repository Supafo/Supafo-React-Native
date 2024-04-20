import React from 'react';
import Screen from '../../components/Screen';
import {Image, TouchableOpacity, View} from 'react-native';
import {EmailIcon, Icon, PasswordIcon} from '../../assets/images';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Divider from '../../components/Divider';
import SocialButtons from './components/SocialButtons';
import Text from '../../components/Text';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import routes, {RootStackParamList} from '../../navigation/routes';
import {useDispatch} from 'react-redux';
import {updateToken} from '../../store/slices/userSlice';

function LoginScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  return (
    <Screen className="items-center">
      <Image
        source={Icon}
        resizeMode="contain"
        className="h-[154px] mt-[37px]"
      />
      <View className="mt-[34px] w-full" style={{rowGap: 20}}>
        <Input placeholder="E-mail" icon={EmailIcon} />
        <Input placeholder="Şifre" icon={PasswordIcon} isPassword />
        <View className="items-end">
          <TouchableOpacity
            onPress={() => navigation.navigate(routes.FORGOT_PASSWORD_SCREEN)}>
            <Text className="text-[#66AE7B]">Şifreni mi unuttun?</Text>
          </TouchableOpacity>
        </View>
        <Button
          onPress={() => {
            dispatch(updateToken('test'));
          }}
          className="mt-[10px] rounded-[15px]">
          Giriş Yap
        </Button>
      </View>
      <View className="my-[33px]">
        <Divider text="OR" />
      </View>
      <SocialButtons
        googleOnPress={() => {}}
        appleOnPress={() => {}}
        fbOnPress={() => {}}
      />
      <View className="flex-row mt-[33px]">
        <Text>Hesabın yok mu? </Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate(routes.SIGNUP_SCREEN)}>
          <Text className="text-[#66AE7B]">Kayıt ol</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

export default LoginScreen;
