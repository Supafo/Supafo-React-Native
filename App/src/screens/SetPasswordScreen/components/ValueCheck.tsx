import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import IOSIcons from 'react-native-vector-icons/Ionicons';
import { moderateScale, verticalScale } from 'react-native-size-matters';

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
    width:moderateScale(18),
    height:verticalScale(18),
    marginBottom:verticalScale(8),
    borderWidth:moderateScale(1),
    borderColor:'#66AE7B',
    backgroundColor:'#66AE7B',
    borderRadius:9999,
  },
  falseIconStyle:{
    width:moderateScale(18),
    height:verticalScale(18),
    marginBottom:verticalScale(8),
    borderWidth:moderateScale(2),
    borderColor:'#66AE7B',
    backgroundColor:'#66AE7B',
    borderRadius:9999,
  },
  iconInlineStyle:{
    color: '#fff',
    fontSize: moderateScale(16)
  },
  textStyle:{
    color:'#4D4D4D',
    paddingLeft:moderateScale(10),
    marginBottom:verticalScale(10),
  }

})
