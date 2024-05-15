import React from 'react';
import Screen from '../../components/Screen';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {EmailIcon, Icon, PasswordIcon} from '../../assets/images';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Divider from '../../components/Divider';
import SocialButtons from './components/SocialButtons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import routes, {RootStackParamList} from '../../navigation/routes';
import {useDispatch} from 'react-redux';
import {updateToken} from '../../store/slices/userSlice';
import Text from '../../components/Text';

function LoginScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  return (
    <View style={styles.main}>
      <Text style={styles.headerTxt}>Giriş Yap</Text>
      <Image
        source={Icon}
        resizeMode="contain"
        className="h-[120px] mt-[37px]"
      />
      <View className="mt-[34px] w-full" style={{rowGap: 20}}>
        <Input placeholder="E-mail" icon={EmailIcon} />
        <Input placeholder="Şifre" icon={PasswordIcon} isPassword />
        <View className="items-end" style={{marginBottom: 20}}>
          <TouchableOpacity
            onPress={() => navigation.navigate(routes.FORGOT_PASSWORD_SCREEN)}>
            <Text
              className="text-[#66AE7B]"
              style={{fontSize: 12, paddingEnd: 5}}>
              Şifreni mi unuttun?
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          onPress={() => {
            dispatch(updateToken('test'));
          }}
          className="mt-[10px] rounded-[20px]">
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
        <Text style={{color: '#333333'}}>Hesabın yok mu? </Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate(routes.SIGNUP_SCREEN)}>
          <Text
            className="text-[#66AE7B]"
            style={{textDecorationLine: 'underline', paddingStart: 5}}>
            Kayıt ol
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    margin: 20,
    backgroundColor: '#F5F5FA',
  },
  headerTxt: {
    color: '#333333',
    fontSize: 18,
    marginBottom: 20,
  },
});
