import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import OrderDetailsContainer from './OrderDetailsContainer';

const PreparingOrder = () => {
  return (
    <View style={styles.main}>
      <OrderDetailsContainer />
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../../../assets/images/bigicon.png')}
          style={styles.logo}
        />
      </View>
    </View>
  );
};

export default PreparingOrder;

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
  },
  logoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    margin: 20,
    height: 200,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
});
