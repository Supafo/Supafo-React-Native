import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Congrats} from '../../../../assets/images';
import {colors} from '../../../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import routes from '../../../../navigation/routes';

type Props = {};

const RateSuccess = (props: Props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.main}>
      <Image
        source={require('../../../../assets/images/tebrikler-new.png')}
        style={styles.img}
      />
      <View style={{width: '100%', alignItems: 'center', marginTop: 40}}>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 40,
            fontSize: 16,
            color: '#000000',
            padding: 3,
          }}>
          Değerlendirmeniz satıcıya ulaştı!
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            color: '#000000',
            padding: 3,
          }}>
          {'Bizi tercih ettiğiniz için '}
        </Text>
        <Text style={{color: '#FF9200', fontSize: 16}}>
          {'Teşekkür Ederiz!'}
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'flex-end',
          width: '100%',
          alignItems: 'center',
          marginTop: 80,
        }}>
        <TouchableOpacity
          style={[styles.btn, {borderColor: colors.greenColor, borderWidth: 1}]}
          onPress={() => navigation.navigate(routes.RATE_AND_COMMENTS)}>
          <Text style={[styles.btnTxt, {color: colors.greenColor}]}>
            Değerlendirmeler ve Yorumlar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: colors.greenColor}]}
          onPress={() =>
            navigation.navigate(routes.HOME_TAB_NAVIGATOR, {screen: 'Anasayfa'})
          }>
          <Text style={[styles.btnTxt, {color: 'white'}]}>Ana Sayfaya Dön</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RateSuccess;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 40,
  },
  btn: {
    padding: 10,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
    margin: 10,
  },
  btnTxt: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
  img: {
    width: '100%',
    height: 300,
  },
});
