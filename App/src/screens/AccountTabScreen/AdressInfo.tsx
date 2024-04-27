import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import {FlatList} from 'react-native-gesture-handler';
import {
  AdressInfoComp,
  addressInfoMocks,
} from '../../components/AdressInfoComp';
import {icons} from '../../assets/images';

export const AdressInfo = () => {
  const renderItem = ({item}: any) => {
    return (
      <AdressInfoComp
        name="Ev"
        title="Kadıköy, Sürpriz Sokak No:12 "
        leftIcon={
          <Image source={icons.homeAddress} style={{width: 36, height: 36}} />
        }
      />
    );
  };
  return (
    <View style={{gap: 23}}>
      <Header title="Adres Bilgilerim" />
      <View style={styles.textView}>
        <Text style={styles.text}>Kayıtlı Adreslerim</Text>
      </View>
      <View>
        <FlatList
          data={addressInfoMocks}
          renderItem={renderItem}
          scrollEnabled={true}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{height: 25}} />}
          contentContainerStyle={{}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textView: {
    marginLeft: 19,
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
});
