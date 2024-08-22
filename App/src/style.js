import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const Appstyles = StyleSheet.create({
  text: {
    color: '#000000',
    fontSize: moderateScale(18),
  },
  mediumText: {
    fontSize: moderateScale(12),
    color: '#000000',
    fontWeight: '600'
  }
});

export default Appstyles;
