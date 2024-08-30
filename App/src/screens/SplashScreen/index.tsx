import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import routes, {RootStackParamList} from '../../navigation/routes';
import Screen from '../../components/Screen';
import {SplashIcon} from '../../assets/images';
import {StackNavigationProp} from '@react-navigation/stack';
import responsiveScale from '../../utils/responsiveScale';

const {scale, moderateScale, verticalScale} = responsiveScale;

function SplashScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  setTimeout(() => {
    navigation.navigate(routes.ONBOARDING_SCREEN);
  }, 2500);
  return (
    <Screen style={styles.screenStyle}>
      <Image source={SplashIcon} style={styles.imageStyle} />
    </Screen>
  );
}

export default SplashScreen;

const styles=StyleSheet.create({
  imageStyle:{
    width: scale(200),
    height:verticalScale(200)
  },
  screenStyle:{
    justifyContent:'center',
    alignItems:'center'
  }
})
