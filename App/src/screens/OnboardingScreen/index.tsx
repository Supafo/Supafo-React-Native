import React, {useRef, useState} from 'react';
import {ONBOARING_DATA} from '../../data/onboarding';
import {useNavigation} from '@react-navigation/native';
import OnboardingScreenComponent from './component';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/routes';

function OnboardingScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const swiperRef = useRef(null);
  const [swipeIndex, setSwipeIndex] = useState(0);
  const isLastIndex = swipeIndex === ONBOARING_DATA.length - 1;
  const isStartIndex = swipeIndex === 0;
  const props = {
    swiperRef,
    setSwipeIndex,
    navigation,
    isLastIndex,
    isStartIndex,
  };
  return <OnboardingScreenComponent {...props} />;
}

export default OnboardingScreen;
