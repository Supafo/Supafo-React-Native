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
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

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
    marginTop: verticalScale(24),
    borderRadius: moderateScale(20),
    borderColor: 'lightgray',
    borderWidth: moderateScale(1.3),
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    padding: moderateScale(10),
    height: moderateScale(148),
    borderRadius: moderateScale(20),
    justifyContent: 'space-between',
  },
  icon: {
    width: scale(40),
    height: scale(25),
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
    borderRadius: moderateScale(15),
    backgroundColor: '#66AE7B',
    alignItems: 'center',
    justifyContent: 'center',
    height:scale(21.5),
    paddingHorizontal: moderateScale(7.5),
  },
  headerRightText: {
    fontSize: moderateScale(11.5),
    fontWeight: '700',
    color: colors.splashtext,
    textAlign: 'center',
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  titleContainer: {
    width: scale(193),
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(16.5),
    fontWeight: '600',
    color: '#66AE7B',
    textAlign:'center'
  },
  buttonContainer: {
    justifyContent:'center',
  },
  button: {
    borderRadius: moderateScale(26),
    width: scale(117.5),
    height: scale(37.5) ,
    opacity: 0.7,
    backgroundColor: colors.greenColor,
    alignItems: 'center',
    padding: moderateScale(6),
    margin: moderateScale(15),
    justifyContent:'center',

  },
  buttonText: {
    fontWeight: '600',
    fontSize: moderateScale(15),
    color: 'white',
  },
});
