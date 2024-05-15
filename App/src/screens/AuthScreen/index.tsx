import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Icon} from '../../assets/images';
import Button from '../../components/Button';
import AuthBanner from './components/AuthBanner';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import routes, {RootStackParamList} from '../../navigation/routes';

function AuthScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.main}>
      <Image source={Icon} resizeMode="contain" className="h-[204px]" />
      <View style={styles.btnContainer}>
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
      <View style={styles.banner}>
        <AuthBanner />
      </View>
    </View>
  );
}

export default AuthScreen;

const styles = StyleSheet.create({
  main: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 20,
    flex: 1,
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    margin: 20,
  },
  banner: {
    width: '95%',
  },
});
