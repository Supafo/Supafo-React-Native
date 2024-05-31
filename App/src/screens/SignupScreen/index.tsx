import React, {useState} from 'react';
import Screen from '../../components/Screen';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {EmailIcon, Icon, PasswordIcon, UserIcon} from '../../assets/images';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Divider from '../../components/Divider';
import SocialButtons from './components/SocialButtons';
import Text from '../../components/Text';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import routes, {RootStackParamList} from '../../navigation/routes';
import PhoneInput from '../../components/PhoneInput';

function SignupScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.main}>
      <Text style={styles.headerTxt}>Kayıt Ol</Text>
      <Image
        source={Icon}
        resizeMode="contain"
        className="h-[120px] mt-[30px]"
        style={{margin: 20}}
      />
      <View className="mt-[3px] w-full" style={{rowGap: 10}}>
        <Input
          value={name}
          onChangeText={text => setName(text)}
          placeholder="Ad Soyad"
          icon={UserIcon}
        />
        <Input
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="E-mail"
          icon={EmailIcon}
        />
        <PhoneInput
          onChangeNumber={text => setPhone(text)}
          placeholder="Telefon Numarası"
        />
        <Input
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Şifre"
          icon={PasswordIcon}
          isPassword
          placeholderTextColor={'green'}
        />
        <Button
           onPress={() => navigation.navigate(routes.LOGIN_SCREEN)}
          className="mt-[20px] rounded-[20px]">Kayıt Ol</Button>
      </View>
      <View className="my-[30px]">
        <Divider text="OR" />
      </View>
      <SocialButtons
        googleOnPress={() => {}}
        appleOnPress={() => {}}
        fbOnPress={() => {}}
      />
      <View className="flex-row mt-[33px]">
        <Text style={{color: '#333333'}}>Hesabın var mı? </Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate(routes.LOGIN_SCREEN)}>
          <Text
            className="text-[#66AE7B]"
            style={{textDecorationLine: 'underline'}}>
            Giriş Yap
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SignupScreen;

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  headerTxt: {
    color: '#333333',
    fontSize: 18,
    marginTop: 0,
    paddingTop: 0
  },
});
