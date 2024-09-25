import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import IOSIcons from 'react-native-vector-icons/Ionicons';
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
    width: scale(17),
    height:verticalScale(17),
    marginBottom:moderateScale(8),
    borderWidth:moderateScale(1),
    borderColor:'#66AE7B',
    backgroundColor:'#66AE7B',
    borderRadius:9999,
  },
  falseIconStyle:{
    width: scale(17),
    height:verticalScale(17),
    marginBottom: moderateScale(8),
    borderWidth:moderateScale(1),
    borderColor:'#66AE7B',
    backgroundColor:'white',
    borderRadius:9999,
  },
  iconInlineStyle:{
    color: '#fff',
    fontSize: moderateScale(16)
  },
  textStyle:{
    color:'#4D4D4D',
    paddingLeft:moderateScale(7.5),
    marginBottom:moderateScale(10),
    fontSize: moderateScale(15),
  }

})
