import React from 'react';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import routes, {RootStackParamList} from '../../navigation/routes';
import Screen from '../../components/Screen';
import {SplashIcon} from '../../assets/images';
import {StackNavigationProp} from '@react-navigation/stack';

function SplashScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  setTimeout(() => {
    navigation.navigate(routes.ONBOARDING_SCREEN);
  }, 2500);
  return (
    <Screen className={'justify-center items-center'}>
      <Image source={SplashIcon} className="w-[200px] h-[200px]" />
    </Screen>
  );
}

export default SplashScreen;
