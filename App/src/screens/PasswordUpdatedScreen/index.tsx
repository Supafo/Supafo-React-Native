import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {StatusBar} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import routes, {RootStackParamList} from '../../navigation/routes';

const PasswordUpdatedScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.main}>
      <StatusBar backgroundColor={'#F5F5FA'} />
      <Text style={styles.title}>Yeni Şifre Oluştur</Text>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/password-updated-img.png')}
          style={styles.img}
        />
        <Text style={styles.labelTxt}>Şifreniz Başarıyla Güncellendi !</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(routes.LOGIN_SCREEN)}
          style={styles.btn}>
          <Text style={styles.btnTxt}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordUpdatedScreen;

const styles = StyleSheet.create({
  main: {
    padding: moderateScale(20),
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  title: {
    fontSize: moderateScale(19),
    color: '#333333',
    fontWeight: '500',
    padding: moderateScale(10),
  },
  container: {
    marginTop: moderateScale(70),
    width: '100%',
    alignItems: 'center',
  },
  img: {
    width: moderateScale(200.5),
    height: moderateScale(192),
    marginBottom: moderateScale(20),
  },
  labelTxt: {
    color: '#333333',
    fontSize: moderateScale(15),
    padding: moderateScale(30),
    fontWeight: '500',
  },
  btn: {
    alignItems: 'center',
    borderRadius: moderateScale(15),
    padding: moderateScale(5),
    backgroundColor: '#66AE7B',
    width: '80%',
    margin: moderateScale(10),
  },
  btnTxt: {
    color: 'white',
    fontSize: moderateScale(15),
    padding: moderateScale(3),
  },
});
