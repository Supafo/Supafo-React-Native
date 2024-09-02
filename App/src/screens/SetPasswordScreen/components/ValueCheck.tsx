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
  },
  trueIconStyle:{
    width: scale(13),
    height:verticalScale(13),
    marginBottom:moderateScale(8),
    borderWidth:moderateScale(1),
    borderColor:'#66AE7B',
    backgroundColor:'#66AE7B',
    borderRadius:9999,
  },
  falseIconStyle:{
    width: scale(13),
    height:verticalScale(13),
    marginBottom: moderateScale(8),
    borderWidth:moderateScale(1),
    borderColor:'#66AE7B',
    backgroundColor:'#66AE7B',
    borderRadius:9999,
  },
  iconInlineStyle:{
    color: '#fff',
    fontSize: moderateScale(12)
  },
  textStyle:{
    color:'#4D4D4D',
    paddingLeft:moderateScale(10),
    marginBottom:moderateScale(10),
    fontSize: moderateScale(11),
  }

})
