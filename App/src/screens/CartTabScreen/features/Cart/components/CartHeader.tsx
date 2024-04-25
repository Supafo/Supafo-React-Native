import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';

const CartHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../../../../../assets/images/arrow-back.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Sepet</Text>
      <TouchableOpacity>
        <Image
          source={require('../../../../../assets/images/trash.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CartHeader;

const styles = StyleSheet.create({
  main: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  icon: {
    width: 25,
    height: 25,
    padding: 5,
  },
});
