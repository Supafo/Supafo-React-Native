import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {EmailIcon, Icon, PasswordIcon} from '../../assets/images';
import Button from '../../components/Button';
import Divider from '../../components/Divider';
import SocialButtons from './components/SocialButtons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import routes, {RootStackParamList} from '../../navigation/routes';
import {useDispatch} from 'react-redux';
import {updateToken} from '../../store/slices/userSlice';
import Text from '../../components/Text';

import {z} from 'zod';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import IOSIcons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

type FormData = {
  email: string;
  password: string;
};

function LoginScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const schema = z.object({
    email: z
      .string({message: "Lütfen E-mail'inizi giriniz"})
      .email('Lütfen geçerli bir e-posta girin'),
    password: z.string({message: 'Lütfen şifrenizi giriniz'}),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onHandleSubmit = handleSubmit(async data => {
    const {email, password} = data;
    __signIn(email, password);
    //console.log(data);
  });

  const __signIn = async (email: string, password: string) => {
    try {
      let response = await auth().signInWithEmailAndPassword(email, password);
      if (response) {
        console.log(response);
        dispatch(updateToken('test'));
      }
    } catch (e: any) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '267447479976-vikv93gapd9026tbaocfc78puok95ign.apps.googleusercontent.com',
    });
  }, []);

  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices();
      // Get the users ID token
      const {idToken, user} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      //console.log("idToken: ", idToken);

      //console.log("googleUser: ", user);

      // Sign-in the user with the credential
      dispatch(updateToken('test'));
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.main}>
      <View style={{width: '100%', alignItems: 'center'}}>
        <Text style={styles.headerTxt}>Giriş Yap</Text>
      </View>
      <Image
        source={Icon}
        resizeMode="contain"
        style={{height: 120, marginTop: 37}}
      />
      <View style={{marginTop: 34, width: '100%', rowGap: 20}}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <Controller
            {...register('email')}
            name="email"
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="E-mail"
                  placeholderTextColor={'gray'}
                />
                <View
                  style={{
                    position: 'absolute',
                    justifyContent: 'center',
                    left: 10,
                    top: 25,
                  }}>
                  <Image source={EmailIcon} style={styles.icon} />
                </View>
              </View>
            )}
          />
          {errors.email && (
            <View style={{width: '100%'}}>
              <Text style={styles.errTxt}>{errors.email.message}</Text>
            </View>
          )}
          <Controller
            {...register('password')}
            name="password"
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Şifre"
                  placeholderTextColor={'gray'}
                  secureTextEntry={!isVisible}
                />
                <View
                  style={{
                    position: 'absolute',
                    justifyContent: 'center',
                    left: 10,
                    top: 25,
                  }}>
                  <Image source={PasswordIcon} style={styles.icon} />
                </View>
                <TouchableOpacity
                  onPress={() => setIsVisible(!isVisible)}
                  style={{
                    position: 'absolute',
                    justifyContent: 'center',
                    right: 10,
                    top: 25,
                  }}>
                  <IOSIcons
                    name={isVisible ? 'eye-off-outline' : 'eye-outline'}
                    size={16}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
          {errors.password && (
            <View style={{width: '100%'}}>
              <Text style={styles.errTxt}>{errors.password.message}</Text>
            </View>
          )}
        </View>
        <View style={{alignItems: 'flex-end', marginBottom: 20}}>
          <TouchableOpacity
            onPress={() => navigation.navigate(routes.FORGOT_PASSWORD_SCREEN)}>
            <Text style={{fontSize: 12, paddingEnd: 5, color: '#66AE7B'}}>
              Şifreni mi unuttun?
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          onPress={onHandleSubmit}
          style={{marginTop: 10, borderRadius: 20}}>
          Giriş Yap
        </Button>
      </View>
      <View style={{marginVertical: 33}}>
        <Divider text="OR" />
      </View>
      <SocialButtons
        googleOnPress={onGoogleButtonPress}
        appleOnPress={() => {}}
        fbOnPress={() => {}}
      />
      <View style={{flexDirection: 'row', marginTop: 33}}>
        <Text style={{color: '#333333'}}>Hesabın yok mu? </Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate(routes.SIGNUP_SCREEN)}>
          <Text
            style={{
              textDecorationLine: 'underline',
              paddingStart: 5,
              color: '#66AE7B',
            }}>
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
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  headerTxt: {
    marginTop: 30,
    color: '#333333',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 19,
  },
  inputContainer: {
    alignItems: 'center',
    width: '100%',
  },
  input: {
    backgroundColor: 'white',
    margin: 10,
    padding: 7,
    borderRadius: 20,
    borderWidth: 0.5,
    width: '100%',
    borderColor: '#000000',
    paddingStart: 35,
    color: '#000000',
  },
  icon: {
    width: 18,
    height: 15,
  },
  errTxt: {
    color: '#ff3333',
    paddingStart: 15,
    fontWeight: '600',
    textAlign: 'left',
    paddingBottom: 10,
    paddingTop: 0,
  },
});
