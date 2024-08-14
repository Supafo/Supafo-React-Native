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
import Input from '../../components/Input';

import {z} from 'zod';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import IOSIcons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {colors} from '../../theme/colors';
import {moderateScale} from 'react-native-size-matters';

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
    try {
      await signIn(email, password);
    } catch (error) {
      console.error('Error while signIn: ', error);
      Alert.alert('Error', error.message);
    }
  });

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      dispatch(updateToken(userCredential.user.uid));
    } catch (e) {
      console.error('Error while signIn: ', e);
      throw new Error('Network request failed. Please try again.');
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
        style={{height: moderateScale(120),
          marginTop: moderateScale(12.5),
          margin: moderateScale(12.5)}}
      />
      <View style={{marginTop: 0, width: '100%', rowGap: 20}}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <Controller
            {...register('email')}
            name="email"
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <View style={styles.inputContainer}>
                <Input
                  fontSize={15}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  heading='Email'
                  placeholder="example@gmail.com" 
                  icon={EmailIcon}
        />
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
                <Input
                  fontSize={15}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry={!isVisible}
                  placeholder="Şifre"
                  icon={PasswordIcon}
                  isPassword
                  placeholderTextColor={'gray'}        
                  />
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
        <TouchableOpacity
          onPress={onHandleSubmit}
          style={{
            borderRadius: 20,
            width: '100%',
            backgroundColor: colors.greenColor,
            alignItems: 'center',
            padding: 10,
            marginTop: moderateScale(10),
          }}>
          <Text style={{fontSize: moderateScale(17), color: 'white'}}>
            Giriş Yap
          </Text>
        </TouchableOpacity>
      
      </View>
      <View
        style={{width: '100%', alignItems: 'center', top: moderateScale(40)}}>
        <View style={{marginBottom: moderateScale(30)}}>
          <Divider text="OR" />
        </View>
        <SocialButtons
          googleOnPress={() => {}}
          appleOnPress={() => {}}
          fbOnPress={() => {}}
        />
        <View style={{flexDirection: 'row', marginTop: moderateScale(20)}}>
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
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: moderateScale(20),
    backgroundColor: 'white',
  },
  headerTxt: {
    marginTop: moderateScale(15),
    fontSize: moderateScale(18),
    fontWeight:'500',
    marginBottom: moderateScale(20),
    color:'#333333'
  },
  inputContainer: {
    alignItems: 'center',
    width: '100%',
  },
  input: {
    backgroundColor: 'white',
    margin: moderateScale(10),
    paddingLeft: moderateScale(35),
    padding: moderateScale(7),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    width: '100%',
    borderColor: '#D0D5DD',
    paddingStart: moderateScale(35),
    color: '#000000',
  },
  icon: {
    width: moderateScale(18),
    height: moderateScale(15),
  },
  errTxt: {
    color: '#ff3333',
    paddingStart: moderateScale(15),
    fontWeight: '600',
    textAlign: 'left',
    paddingBottom: moderateScale(10),
  },
});