import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text as RNText,
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
import auth from '@react-native-firebase/auth';

function SignupScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const __doCreateUser = async () => {
    try {
      
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      const user = userCredential.user;    
       
      navigation.navigate(routes.LOGIN_SCREEN);
    } catch (error) {
      console.error('Kullanıcı oluşturma hatası:', error);
    }
  };

  return (
    <View style={styles.main}>
      <Text style={styles.headerTxt}>Kayıt Ol</Text>
      <Image
        source={Icon}
        resizeMode="contain"
        style={{height: 120, marginTop: 30, margin: 20}}
      />
      <View style={{marginTop: 3, width: '100%', rowGap: 10}}>
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
          value={phone}
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
          onPress={__doCreateUser}
          style={{marginTop: 20, borderRadius: 20}}>
          Kayıt Ol
        </Button>
      </View>
      <View style={{marginTop: 30}}>
        <Divider text="OR" />
      </View>
      <SocialButtons
        googleOnPress={() => {}}
        appleOnPress={() => {}}
        fbOnPress={() => {}}
      />
      <View style={{flexDirection: 'row', marginTop: 33}}>
        <RNText style={{color: '#333333'}}>Hesabın var mı? </RNText>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate(routes.LOGIN_SCREEN)}>
          <RNText style={{color: '#66AE7B', textDecorationLine: 'underline'}}>
            Giriş Yap
          </RNText>
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
    paddingTop: 0,
  },
});
