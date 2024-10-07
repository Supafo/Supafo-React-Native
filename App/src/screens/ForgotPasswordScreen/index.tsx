import React from 'react';
import Screen from '../../components/Screen';
import {Image, TouchableOpacity, View, StyleSheet} from 'react-native';
import {
  EmailIconDark,
  ForgotPasswordImage,
  SMSIcon,
} from '../../assets/images';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import routes, {RootStackParamList} from '../../navigation/routes';
import Header from '../../components/Header';
import Text from '../../components/Text';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import responsiveScale from '../../utils/responsiveScale';

const {scale, moderateScale, verticalScale} = responsiveScale;

function ForgotPasswordScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <Screen
      header={<Header title="Sıfırlama Yöntemi Seç" />}
      style={styles.screenContainer}>
      <View style={styles.mainContainer}>
        <Image
          source={ForgotPasswordImage}
          resizeMode="contain"
          style={styles.image}
        />
        <View style={styles.buttonContainer}>
          <Button
            image={EmailIconDark}
            onPress={() =>
              navigation.navigate(routes.FORGOT_PASSWORD_BY_EMAIL_SCREEN)
            }
            variant="light"
            style={styles.button}>
               <Text style={styles.buttonText}>
               Email ile Doğrula
              </Text>
            
          </Button>
          <Button
            image={SMSIcon}
            onPress={() =>
              navigation.navigate(routes.FORGOT_PASSWORD_BY_SMS_SCREEN)
            }
            variant="light"
            style={styles.button}>
              <Text style={styles.buttonText}>
              SMS ile Doğrula
              </Text>
            
          </Button>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(225),
    paddingHorizontal: moderateScale(40),
  },
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: wp('88%'),
    flex: 0.6,
    marginBottom: verticalScale(115),
  },
  image: {
    height: hp('20%'),
    marginBottom: verticalScale(55)
  },
  buttonContainer: {
    width: wp('88%'),
    marginTop: verticalScale(12.5),
  },
  button: {
    marginTop: verticalScale(11),
    height: hp('5.25%'),
    borderRadius: moderateScale(15),
    alignItems: 'center',
    width: wp('88%'),
  },
  buttonText: {
    fontSize: moderateScale(14.5),
    fontWeight:'400',
  }
});

export default ForgotPasswordScreen;
