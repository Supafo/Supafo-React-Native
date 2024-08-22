import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import routes from '../../../../../navigation/routes';
// Using Header in Component instead of this. /////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!/////////
const OrderHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.main}>
      <TouchableOpacity
        style={{
          position: 'relative',
          left: 0,
        }}
        onPress={() =>
          navigation.navigate(routes.HOME_TAB_NAVIGATOR, {screen: 'Home'})
        }>
        <Image
          source={require('../../../../../assets/images/arrow-back.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Sipariş Detayı</Text>
    </View>
  );
};

export default OrderHeader;

const styles = StyleSheet.create({
  main: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1.5,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    flex: 1,
    textAlign: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    padding: 5,
    margin: 5,
    left: 10,
  },
});
