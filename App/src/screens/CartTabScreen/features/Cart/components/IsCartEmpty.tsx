import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {};

const IsCartEmpty = (props: Props) => {
  return (
    <View style={styles.main}>
      <Text style={styles.txt}>
        Şu anda sepetiniz boş görünüyor lütfen sepetinize ürün ekleyiniz..
      </Text>
    </View>
  );
};

export default IsCartEmpty;

const styles = StyleSheet.create({
  main: {
    margin: 20,
    padding: 10,
    borderColor: '#66AE7B',
    borderWidth: 1.5,
    borderRadius: 20,
  },
  txt: {
    fontSize: 18,
    padding: 20,
    letterSpacing: 1,
    textAlign: 'center',
  },
});
