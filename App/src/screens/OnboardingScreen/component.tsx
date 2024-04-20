import React from 'react';
import {Image, View} from 'react-native';
import Screen from '../../components/Screen';
import Swiper from 'react-native-swiper';
import Text from '../../components/Text';
import Button from '../../components/Button';
import {ONBOARING_DATA} from '../../data/onboarding';
import routes from '../../navigation/routes';
import {OnboardingScreenComponentType} from './onboarding.type';

function OnboardingScreenComponent({
  swiperRef,
  setSwipeIndex,
  navigation,
  isLastIndex,
  isStartIndex,
}: OnboardingScreenComponentType) {
  return (
    <Screen>
      <Swiper
        ref={swiperRef}
        onIndexChanged={index => setSwipeIndex(index)}
        loop={false}
        activeDotColor="#66AE7B"
        dotColor="#FEFEFE"
        dotStyle={{borderWidth: 2, borderColor: '#66AE7B'}}>
        {ONBOARING_DATA.map(item => (
          <View
            key={item.id}
            className="flex-1 justify-center items-center px-8">
            <View className="mb-12">
              <Image
                source={item.image}
                resizeMode="contain"
                className="w-[250px] h-[250px]"
              />
            </View>
            <Text className="text-black text-[17px] text-center px-6">
              {item.text}
            </Text>
          </View>
        ))}
      </Swiper>
      <View className="flex-row gap-4 px-4">
        <View className="flex-1">
          <Button
            disabled={isStartIndex}
            onPress={() => {
              swiperRef.current?.scrollBy(-1);
            }}
            rounded>
            Atla
          </Button>
        </View>
        <View className="flex-1">
          <Button
            onPress={() => {
              if (isLastIndex) {
                navigation.navigate(routes.AUTH_SCREEN);
              } else {
                swiperRef.current?.scrollBy(1);
              }
            }}
            rounded>
            {isLastIndex ? 'Sona Ermek' : 'Sonraki'}
          </Button>
        </View>
      </View>
    </Screen>
  );
}

export default OnboardingScreenComponent;
