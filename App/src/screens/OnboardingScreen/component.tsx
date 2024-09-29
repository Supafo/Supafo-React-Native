import React from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Screen from '../../components/Screen';
import Swiper from 'react-native-swiper';
import Text from '../../components/Text';
import Button from '../../components/Button';
import {ONBOARING_DATA} from '../../data/onboarding';
import routes from '../../navigation/routes';
import {OnboardingScreenComponentType} from './onboarding.type';
import responsiveScale from '../../utils/responsiveScale';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const {scale, moderateScale, verticalScale} = responsiveScale;

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
    style={styles.viewStyle}>
      <Swiper
        ref={swiperRef}
        onIndexChanged={index => setSwipeIndex(index)}
        loop={false}
        activeDotColor="#66AE7B"
        dotColor="#FEFEFE"
        activeDotStyle={styles.dotStyle}
        dotStyle={[styles.dotStyle,{borderWidth: 1, borderColor: '#66AE7B', }]}>
        {ONBOARING_DATA.map(item => (
          <View
            key={item.id}
            style={styles.cointainerImageStyle}>
            <View>
              <Image
                source={item.image}
                resizeMode="contain"
                style={styles.imageStyle}
              />
            </View>
            <Text
              style={styles.infoTextStyle}>
              {item.text}
            </Text>
          </View>
        ))}
      </Swiper>
      <View
        style={styles.container}>
        <View  style={styles.containerButtonBackStyle}>
          <TouchableOpacity
            style={styles.buttonBackStyle}
            onPress={() => {
              navigation.navigate(routes.AUTH_SCREEN);
            }}>
            <Text
              style={styles.buttonTextStyle}
              >
              Atla
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerButtonNextStyle}>
          <TouchableOpacity
            style={styles.buttonNextStyle}
            onPress={() => {
              if (isLastIndex) {
                navigation.navigate(routes.AUTH_SCREEN);
              } else {
                swiperRef.current?.scrollBy(1);
              }
            }}>
            <Text style={styles.buttonTextStyle}>
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

const styles = StyleSheet.create({
  viewStyle:{
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    width: screenWidth,
  },
  cointainerImageStyle:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(8),
    marginBottom: verticalScale(60),

  },
  container:{
    flexDirection: 'row',               
    justifyContent: 'space-between',    
    paddingHorizontal: moderateScale(4), 
    position: 'absolute',
    bottom: moderateScale(42.5),          
    alignItems: 'center',   
    marginRight: moderateScale(4), 

  },
  imageStyle:{
    width: wp('60%'),
    height: hp('27%'),
  },
  infoTextStyle:{
    textAlign: 'center',
    fontWeight: '400',
    color: 'black',                    
    fontSize: moderateScale(15),
    marginTop: verticalScale(27.5),
    marginBottom: verticalScale(115),
    marginHorizontal: moderateScale(17.5),
  },
  buttonTextStyle:{
    fontSize: moderateScale(15),
     color: '#333333',
    fontWeight: '500'
  },
  buttonBackStyle:{
    backgroundColor: 'transparent',
    width: screenWidth * 0.13, 
    left: screenWidth * -0.03, 
    position: 'relative',
    alignItems:'flex-start',

  },
  buttonNextStyle:{
    backgroundColor: 'transparent',
    width: screenWidth * 0.26,
    left: screenWidth * 0.14,
    position: 'relative',
    alignItems: 'flex-end',
  },
  dotStyle: {
    marginBottom: moderateScale(22),
     width: scale(10),
     height:verticalScale(9.5),
     borderRadius:999,
     right:moderateScale(3),
     marginStart:moderateScale(5.25),
  },
  containerButtonBackStyle:{
    flex:1,
    marginStart: moderateScale(20),
    marginEnd: moderateScale(20)
  },
  containerButtonNextStyle:{
    flex:1,
  }
})
