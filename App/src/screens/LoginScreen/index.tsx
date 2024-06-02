import React, {useEffect} from 'react';
import Screen from '../../components/Screen';
import {
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

type FormData = {
  email: string;
  password: string;
};

function LoginScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const schema = z.object({
    email: z.string({message: "Lütfen E-mail'inizi giriniz"}).email("Lütfen geçerli bir e-posta girin"),
    password: z.string({message: "Lütfen şifrenizi giriniz"}),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  
  const onHandleSubmit = handleSubmit(data => {
    const {email, password} = data;
    console.log(data);
    dispatch(updateToken('test'));
  });

  return (
    <View style={styles.main}>
      <Text style={styles.headerTxt}>Giriş Yap</Text>
      <Image
        source={Icon}
        resizeMode="contain"
        className="h-[120px] mt-[37px]"
        style={{right: 10}}
      />
      <View className="mt-[34px] w-full" style={{rowGap: 20}}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <Controller
            {...register('email')}
            name="email"
            control={control}
            render={({field: {onChange, onBlur, value}}) => {
              return (
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
              );
            }}
          />
      
          {errors.email && (
            <View style={{width: '100%'}}>
              <Text style={styles.errTxt}> {errors.email.message} </Text>
            </View>
          )}
          <Controller
            {...register('password')}
            name="password"
            control={control}
            render={({field: {onChange, onBlur, value}}) => {
              return (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Şifre"
                    placeholderTextColor={'gray'}
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
                </View>
              );
            }}
          />

          {errors.password && (
            <View style={{width: '100%'}}>
              <Text style={styles.errTxt}> {errors.password.message} </Text>
            </View>
          )}
        </View>

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
        <Button onPress={onHandleSubmit} className="mt-[10px] rounded-[20px]">
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
    padding: 20,
    backgroundColor: 'white',
  },
  headerTxt: {
    color: '#333333',
    fontSize: 18,
    marginBottom: 20,
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
