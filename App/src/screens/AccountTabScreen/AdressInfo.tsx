import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import {FlatList} from 'react-native-gesture-handler';
import {
  AdressInfoComp,
  addressInfoMocks,
} from '../../components/AdressInfoComp';
import {icons} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import routes, {RootStackParamList} from '../../navigation/routes';
import {Button} from '../SignupScreen/components/SocialButtons';
import { moderateScale } from 'react-native-size-matters';

export const AdressInfo = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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
    <View style={{gap: 23, backgroundColor: 'white', flex: 1}}>
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
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.addButton}
          onPress={() => navigation.navigate(routes.ADD_ADDRESS)}>
          <Text style={styles.addButtonText}>Adres Ekle</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textView: {
    marginLeft: 19,
  },
  text: {
    fontSize: moderateScale(16),
    color: 'black',
    fontWeight: '500',
  },
  buttonContainer: {
    marginTop: 24,
    marginHorizontal: 40,
  },
  addButton: {
    backgroundColor: '#66AE7B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
  addButtonText: {
    color: 'white',
    fontSize: moderateScale(16),
    fontWeight: '500',
    lineHeight: 17,
    textAlign: 'center',
  },
});
