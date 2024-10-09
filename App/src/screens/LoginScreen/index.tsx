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
import Header from '../../components/Header';

import {z} from 'zod';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import IOSIcons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {colors} from '../../theme/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import responsiveScale from '../../utils/responsiveScale'

const {scale, verticalScale, moderateScale} = responsiveScale;

type FormData = {
  email: string;
  password: string;
};

function LoginScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);


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
        <Header title={'Giriş Yap'} noBackButton={false}/>
      </View>
      <Image
        source={Icon}
        resizeMode="contain"
        style={{
          height: hp('14%'),
          marginTop: verticalScale(18),
          marginBottom: verticalScale(12.5),}}
      />
      <View style={{marginTop: 0, width: wp('88%'), rowGap: moderateScale(20)}}>
        <View style={{width: wp('88%'), alignItems: 'center'}}>
          <Controller
            {...register('email')}
            name="email"
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <View style={styles.inputContainer}>
                <Input
                  fontSize={moderateScale(13)}
                  value={value}
                  style={{paddingStart:moderateScale(0)}}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  heading='Email'
                  placeholder="Email" 
                  icon={EmailIcon}
        />
              </View>
            )}
          />
          {errors.email && (
            <View style={{width: '100%'}}>
              <Text style={[styles.errTxt,{top:moderateScale(2.5)}]}>{errors.email.message}</Text>
            </View>
          )}

          <Controller
            {...register('password')}
            name="password"
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <View style={[styles.inputContainer,{marginBottom:verticalScale(13)}]}>
                <View>
                <View>
                <Input
                  fontSize={moderateScale(13)}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text)
                    setIsButtonEnabled(true)}}
                  style={{paddingStart:moderateScale(0)}}
                  onBlur={onBlur}
                  placeholder="Şifre"
                  icon={PasswordIcon}
                  isPassword
                  />
                <TouchableOpacity
                  onPress={() => setIsVisible(!isVisible)}
                  style={{
                    position: 'relative',
                    justifyContent: 'center',
                  }}>
                  <IOSIcons
                    name={isVisible ? 'eye-off-outline' : 'eye-outline'}
                    size={moderateScale(16)}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                </View>
                <View style={{alignItems:'flex-end',bottom: verticalScale(12)}}>
                <TouchableOpacity
                onPress={() => navigation.navigate(routes.FORGOT_PASSWORD_SCREEN)}>
                <Text style={{fontSize: moderateScale(12.5), paddingEnd: moderateScale(5),marginBottom:verticalScale(20), color: '#66AE7B',bottom:moderateScale(0)}}>
                  Şifreni mi unuttun?
                </Text>
                </TouchableOpacity>
                </View>
                </View>

                
                
              </View>
            )}
          />
          {errors.password && (
            <View style={{width: '100%'}}>
              <Text style={styles.errTxt}>{errors.password.message}</Text>
            </View>
          )}
        </View>
        
        <View style={{alignItems:'center',marginBottom:verticalScale(36),marginTop:verticalScale(4)}}>
          <TouchableOpacity
          onPress={onHandleSubmit}
          style={{
            borderRadius: moderateScale(12.5),
            width: wp('88%'),
            height: hp('5.25%'),
            backgroundColor: colors.greenColor,
            alignItems: 'center',
            marginTop: moderateScale(5),
            justifyContent:'center',
            opacity: isButtonEnabled ? 1 : 0.7,
          }}
          disabled={!isButtonEnabled}>
          <Text style={{fontSize: moderateScale(16), color: 'white',}}>
            Giriş Yap
          </Text>
        </TouchableOpacity>
        </View>      
      </View>
      <View
        style={{width: '100%', alignItems: 'center', top: moderateScale(-22.5)}}>
        <View style={{marginBottom: moderateScale(0),
                      marginTop: moderateScale(0),

                      }}>
          <Divider text="VEYA" />
        </View>
        <View style={{bottom:moderateScale(2.5)}}>
        <SocialButtons
          googleOnPress={() => {}}
          appleOnPress={() => {}}
          fbOnPress={() => {}}
        />
        </View>
        
        <View style={{flexDirection: 'row', marginTop: verticalScale(-3)}}>
          <Text style={{color: '#333333',fontSize: moderateScale(15),fontWeight:'400'}}>Hesabınız yok mu? </Text>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate(routes.SIGNUP_SCREEN)}>
            <Text
              style={{
                paddingStart: moderateScale(5),
                color: '#66AE7B',
                fontSize: moderateScale(15),
                textDecorationLine : 'underline'
              }}
              >
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
    marginTop: verticalScale(5),
    fontWeight:'500',
    fontSize: moderateScale(18),
    marginBottom: moderateScale(20),
    color:'#333333'
  },
  generalInputContainer: {

  },
  inputContainer: {
    alignItems: 'center',
    width: wp('88%'),
    height: hp('9.1725%'),
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
    width: scale(18),
    height: verticalScale(15),
  },
  errTxt: {
    color: '#ff3333',
    paddingStart: moderateScale(15),
    fontWeight: '600',
    textAlign: 'left',
    paddingBottom: moderateScale(10),
  },
});