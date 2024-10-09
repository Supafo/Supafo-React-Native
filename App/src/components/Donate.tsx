import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {DonateType} from './components.type';
import {colors} from '../theme/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import responsiveScale from '../utils/responsiveScale';

const {scale, verticalScale, moderateScale} = responsiveScale;

export function Donate(props: DonateType) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={props.backgroundImage}
        style={styles.backgroundImage}
        borderRadius={moderateScale(20)}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image style={styles.icon} source={props.icon} />
          </View>
          {!props.isAvailable ? (
            <View style={styles.headerRight}>
              <Text style={styles.headerRightText}>Yakında</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{props.title}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={props.onPress} style={styles.button}>
            <Text style={styles.buttonText}>{props.buttonTitle}</Text>
          </TouchableOpacity>
          </View>
          
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: verticalScale(20),
    marginTop: verticalScale(30),
    borderRadius: moderateScale(12),
    borderColor: 'lightgray',
    borderWidth: moderateScale(1.3),
    justifyContent: 'center',
    height: hp('23.5%'),
  },
  backgroundImage: {
    flex: 1,
    padding: moderateScale(10),
    height: moderateScale(148),
    borderRadius: moderateScale(20),
    justifyContent: 'space-between',
  },
  icon: {
    width: wp('13%'),
    height: hp('3.75%'),
    borderColor: colors.openGreen,
    borderWidth:1,
    borderRadius: moderateScale(15),
  },
  header: {
    padding: moderateScale(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    borderRadius: moderateScale(10),
    backgroundColor: colors.openGreen,
    alignItems: 'center',
    justifyContent: 'center',
    height:hp('3.75%'),
    paddingHorizontal: moderateScale(10),
  },
  headerRightText: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    color: colors.splashtext,
    textAlign: 'center',
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  titleContainer: {
    width: wp('70%'),
    alignItems: 'center',
    marginBottom:verticalScale(0),
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: '500',
    color: '#66AE7B',
    textAlign:'center'
  },
  buttonContainer: {
    justifyContent:'center',
    marginBottom: verticalScale(40),
  },
  button: {
    borderRadius: moderateScale(12),
    width: wp('30%'),
    height: hp('5%') ,
    backgroundColor: colors.greenColor,
    alignItems: 'center',
    padding: moderateScale(6),
    marginTop: verticalScale(12.5),
    justifyContent:'center',

  },
  buttonText: {
    fontWeight: '400',
    fontSize: moderateScale(14),
    color: 'white',
  },
});
