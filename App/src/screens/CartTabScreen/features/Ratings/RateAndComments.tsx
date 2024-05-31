import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import {Ayse, Berk, StarIcon} from '../../../../assets/images';
import {colors} from '../../../../theme/colors';
import CommentContainer from './components/CommentContainer';
import Header from '../../../../components/Header';
import {useNavigation} from '@react-navigation/native';
import routes from '../../../../navigation/routes';

const RateAndComments = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <Header title="Değerlendirmeler ve Yorumlar" />
      <View style={[styles.row, {margin: 20}]}>
        <View style={{margin: 10}}>
          <Text style={styles.title}>5,0</Text>
          <View style={styles.row}>
            <Image source={StarIcon} style={styles.star} />
            <Image source={StarIcon} style={styles.star} />
            <Image source={StarIcon} style={styles.star} />
            <Image source={StarIcon} style={styles.star} />
            <Image source={StarIcon} style={styles.star} />
          </View>
        </View>
        <View
          style={{
            alignItems: 'flex-start',
            width: 220,
            justifyContent: 'center',
            paddingStart: 35,
          }}>
          <View style={[styles.row, {alignItems: 'center', margin: 3}]}>
            <Text
              style={{fontSize: 16, paddingEnd: 10, top: 2, color: '#000000'}}>
              5
            </Text>
            <View>
              <View style={styles.line} />
              <View style={[styles.overLine, {width: 170}]} />
            </View>
          </View>
          <View style={[styles.row, {alignItems: 'center', margin: 3}]}>
            <Text
              style={{fontSize: 16, paddingEnd: 10, top: 2, color: '#000000'}}>
              4
            </Text>
            <View>
              <View style={styles.line} />
              <View style={[styles.overLine, {width: 150}]} />
            </View>
          </View>
          <View style={[styles.row, {alignItems: 'center', margin: 3}]}>
            <Text
              style={{fontSize: 16, paddingEnd: 10, top: 2, color: '#000000'}}>
              3
            </Text>
            <View>
              <View style={styles.line} />
              <View style={[styles.overLine, {width: 120}]} />
            </View>
          </View>
          <View style={[styles.row, {alignItems: 'center', margin: 3}]}>
            <Text
              style={{fontSize: 16, paddingEnd: 10, top: 2, color: '#000000'}}>
              2
            </Text>
            <View>
              <View style={styles.line} />
              <View style={[styles.overLine, {width: 90}]} />
            </View>
          </View>
          <View style={[styles.row, {alignItems: 'center', margin: 3}]}>
            <Text
              style={{fontSize: 16, paddingEnd: 10, top: 2, color: '#000000'}}>
              1
            </Text>
            <View>
              <View style={styles.line} />
              <View style={[styles.overLine, {width: 60}]} />
            </View>
          </View>
        </View>
      </View>
      <ScrollView style={{height: '65%'}} showsVerticalScrollIndicator={false}>
        <CommentContainer img={Berk} name="Ayşe Kartal" />
        <CommentContainer img={Ayse} name="Berk Yılmaz" />
        <CommentContainer img={Berk} name="Ayşe Kartal" />
        <CommentContainer img={Ayse} name="Berk Yılmaz" />
      </ScrollView>
      <View
        style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate(routes.HOME_TAB_NAVIGATOR)}>
          <Text style={styles.btnTxt}>Ana Sayfaya Dön</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RateAndComments;

const styles = StyleSheet.create({
  main: {backgroundColor: 'white'},
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
  },
  star: {
    width: 13,
    height: 13,
    margin: 3,
  },
  line: {
    backgroundColor: '#E5E5E5',
    width: 170,
    height: 8,
    position: 'absolute',
    zIndex: 0,
    borderRadius: 10,
  },
  overLine: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: colors.openOrange,
    height: 8,
    borderRadius: 10,
  },
  btn: {
    padding: 10,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
    backgroundColor: colors.greenColor,
    top: 10,
  },
  btnTxt: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    color: 'white',
  },
});
