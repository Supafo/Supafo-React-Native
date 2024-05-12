import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../../theme/colors';
import {Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  rate: number;
};

const Label = ({rate}: Props) => {
  const data = [
    'Yaprak Sarma',
    'Biber Dolma',
    'Enginar',
    'Hünkar Beğendi',
    'Karnıyarık',
  ];

  return (
    <View style={styles.main}>
      <View style={[styles.wrapper, styles.shadow]}>
        <View style={{margin: 10}}>
          <Text
            style={{
              fontSize: 16,
              color: '#333333',
              fontWeight: '600',
              padding: 10,
            }}>
            Başkaları ne diyor?
          </Text>
          <View style={[styles.rateWrapper]}>
            <View style={styles.row}>
              <Icon name={'star'} size={16} color={colors.greenColor} />
              <Icon name={'star'} size={16} color={colors.greenColor} />
              <Icon name={'star'} size={16} color={colors.greenColor} />
              <Icon name={'star'} size={16} color={colors.greenColor} />
              <Icon name={'star'} size={16} color={colors.greenColor} />
              <Text style={styles.wrapperTxt}>{rate} (500+)</Text>
            </View>
            <View style={[styles.line, {marginStart: 30, marginBottom: 5}]} />
          </View>
          <View style={styles.row}>
            <AntDesign
              name="clockcircleo"
              size={16}
              color={colors.greenColor}
            />
            <Text style={styles.wrapperTxt}>Hızlı Sipariş </Text>
          </View>
          <View style={styles.row}>
            <Icon
              name="silverware-fork-knife"
              size={16}
              color={colors.greenColor}
            />
            <Text style={styles.wrapperTxt}>Lezzetli Yemek</Text>
          </View>
          <View style={styles.row}>
            <AntDesign name="smileo" size={18} color={colors.greenColor} />
            <Text style={styles.wrapperTxt}>Güler Yüzlü Ekip</Text>
          </View>
          <View>
            <Text
              style={{
                color: colors.greenColor,
                fontSize: 11,
                textAlign: 'center',
                padding: 15,
              }}>
              Satıcının son 6 aydaki 196 derecelendirmeye dayanmaktadır.
            </Text>
          </View>
          <View style={styles.line} />
        </View>
        <Text style={styles.title}>Senin için ipucu</Text>
        <View style={styles.container}>
          <View>
            <Image
              source={require('../../../assets/images/gift-package.png')}
              style={styles.img}
            />
          </View>
          <View style={styles.itemWrapper}>
            <Text style={styles.labelTitle}>
              Sürpriz paketinden çıkabilecekler
            </Text>
            {data.map((item, index) => (
              <Text key={index} style={styles.txt}>
                {item}
              </Text>
            ))}
          </View>
        </View>
      </View>
      <View style={[styles.label, styles.shadow]}>
        <Text style={{fontSize: 16, color: '#333333', fontWeight: '500'}}>
          Taşıma Şekli
        </Text>
        <TouchableOpacity style={{margin: 7}}>
          <AntDesign
            name="questioncircle"
            size={20}
            color={colors.greenColor}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Label;

const styles = StyleSheet.create({
  main: {
    marginTop: 10,
    marginBottom: 10,
  },
  wrapper: {
    backgroundColor: 'white',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    backgroundColor: '#FF9200',
    color: 'white',
    fontSize: 12,
    borderRadius: 20,
    padding: 3,
    width: 100,
    textAlign: 'center',
    marginTop: 10,
    marginStart: 10,
  },
  itemWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: 10,
    width: '65%',
  },
  row: {
    flexDirection: 'row',
    marginStart: 30,
    margin: 3,
    alignItems: 'center',
  },
  rateWrapper: {
    width: '40%',
  },
  txt: {
    backgroundColor: colors.greenColor,
    padding: 5,
    margin: 5,
    borderRadius: 20,
    color: 'white',
    fontSize: 11,
  },
  labelTitle: {
    fontSize: 15,
    padding: 10,
    fontWeight: '500',
    color: '#333333',
  },
  img: {
    width: 77,
    height: 83,
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    marginTop: 10,
    alignItems: 'center',
  },
  line: {
    width: '100%',
    backgroundColor: colors.greenColor,
    height: 1.5,
    marginTop: 7,
  },
  wrapperTxt: {
    fontSize: 15,
    color: '#333333',
    fontWeight: '600',
    padding: 3,
    marginStart: 5,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
});
