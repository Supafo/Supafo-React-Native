import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../../../../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import routes from '../../../../../navigation/routes';

type Props = {};

const IsCartEmpty = (props: Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <Image
        source={require('../../../../../assets/images/bigicon.png')}
        style={styles.logo}
      />
      <Text style={styles.txt}>Sepetinizde ürün bulunmamaktadır</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(routes.HOME_TAB_NAVIGATOR, {screen: 'Anasayfa'})
        }
        style={styles.btn}>
        <Text style={styles.btnTxt}>Sürpriz paketleri keşfet</Text>
      </TouchableOpacity>
    </View>
  );
};

export default IsCartEmpty;

const styles = StyleSheet.create({
  main: {
    margin: moderateScale(20),
    padding: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
  txt: {
    fontSize: moderateScale(16),
    padding: moderateScale(20),
    letterSpacing: moderateScale(1),
    textAlign: 'center',
    color: '#333333',
    fontWeight: '600',
    width: '100%',
  },
  logo: {
    width: scale(153),
    height: scale(204),
  },
  btn: {
    width: '100%',
    backgroundColor: colors.greenColor,
    borderRadius: moderateScale(20),
  },
  btnTxt: {
    textAlign: 'center',
    padding: moderateScale(13),
    color: 'white',
    fontSize: moderateScale(14),
  },
});
