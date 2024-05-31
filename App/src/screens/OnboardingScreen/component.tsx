import React from 'react';
import {Dimensions, Image, TouchableOpacity, View} from 'react-native';
import Screen from '../../components/Screen';
import Swiper from 'react-native-swiper';
import Text from '../../components/Text';
import Button from '../../components/Button';
import {ONBOARING_DATA} from '../../data/onboarding';
import routes from '../../navigation/routes';
import {OnboardingScreenComponentType} from './onboarding.type';

const screenWidth = Dimensions.get('window').width;

function OnboardingScreenComponent({
  swiperRef,
  setSwipeIndex,
  navigation,
  isLastIndex,
  isStartIndex,
}: OnboardingScreenComponentType) {
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1,
        width: screenWidth,
      }}>
      <Swiper
        ref={swiperRef}
        onIndexChanged={index => setSwipeIndex(index)}
        loop={false}
        activeDotColor="#66AE7B"
        dotColor="#FEFEFE"
        activeDotStyle={{marginBottom: 30}}
        dotStyle={{borderWidth: 2, borderColor: '#66AE7B', marginBottom: 30}}>
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
            <Text
              className="text-black text-[15px] text-center px-4"
              style={{textAlign: 'center', marginTop: 20, fontWeight: '600'}}>
              {item.text}
            </Text>
          </View>
        ))}
      </Swiper>
      <View
        className="flex-row gap-4 px-4"
        style={{position: 'absolute', bottom: 70, alignItems: 'center'}}>
        <View className="flex-1" style={{marginStart: 20, marginEnd: 20}}>
          <TouchableOpacity
            style={{
              backgroundColor: 'transparent',
              width: 50,
              left: 0,
              position: 'absolute',
            }}
            disabled={isStartIndex}
            onPress={() => {
              navigation.navigate(routes.AUTH_SCREEN);
              console.log('basıldı');
            }}>
            <Text
              style={{
                fontSize: 16,
                color: isStartIndex ? 'lightgray' : '#333333',
                fontWeight: '600',
              }}>
              Atla
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-1">
          <TouchableOpacity
            style={{
              backgroundColor: 'transparent',
              width: 100,
              right: 0,
              position: 'absolute',
              alignItems: 'center',
            }}
            onPress={() => {
              if (isLastIndex) {
                navigation.navigate(routes.AUTH_SCREEN);
              } else {
                swiperRef.current?.scrollBy(1);
              }
            }}>
            <Text style={{fontSize: 16, color: '#333333', fontWeight: '600'}}>
              {' '}
              {isLastIndex ? 'Bitti' : 'Sonraki'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default OnboardingScreenComponent;
