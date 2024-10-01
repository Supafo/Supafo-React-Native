import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import IOSIcons from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import responsiveScale from '../../../utils/responsiveScale';

const {scale, moderateScale, verticalScale} = responsiveScale;
export default function ValueCheck({
  check = false,
  text = '',
}: {
  check: boolean;
  text: string;
}) {
  return (
    <View style={styles.iconContainerStyle}>  
      {check ? (
        <View style={styles.trueIconStyle}>
          <IOSIcons
            name="checkmark-outline"
            style={styles.iconInlineStyle}
          />
        </View>
      ) : (
        <View style={styles.falseIconStyle} />
      )}
      <Text style={styles.textStyle}>{text}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  iconContainerStyle:{
    flexDirection: 'row',
    alignItems: 'center',
    bottom: moderateScale(25),
    right: moderateScale(17.5),
  },
  trueIconStyle:{
    width: wp('4.75%'),
    height:hp('2.35%'),
    marginBottom: verticalScale(6.25),
    borderWidth:moderateScale(1),
    borderColor:'#66AE7B',
    backgroundColor:'#66AE7B',
    borderRadius:9999,
  },
  falseIconStyle:{
    width: wp('4.75%'),
    height:hp('2.35%'),
    marginBottom: verticalScale(6.25),
    borderWidth:moderateScale(1),
    borderColor:'#66AE7B',
    backgroundColor:'white',
    borderRadius:9999,
  },
  iconInlineStyle:{
    color: '#fff',
    fontSize: moderateScale(15)
  },
  textStyle:{
    color:'#4D4D4D',
    paddingLeft:moderateScale(7.5),
    marginBottom:verticalScale(10),
    fontSize: moderateScale(14),
  }

})
