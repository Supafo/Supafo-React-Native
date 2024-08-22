import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

type Prop = {
  title: string;
};

const OrderDetailsContainer = ({title}: Prop) => {
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.titleProgress}>Sipariş Hazırlanıyor</Text>
          </View>
          <View style={styles.banner} />
          <View style={styles.row}>
            <View style={styles.detailContainer}>
              <Text style={styles.detailTxt}>26 Ağustos 2023 | 14:50</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.detailTxt}>Toplam: </Text>
                <Text
                  style={[styles.detailTxt, {fontWeight: '400', fontSize: moderateScale(16)}]}>
                  ₺  
                </Text>
                <Text style={styles.detailTxt}> 300</Text>
              </View>
            </View>
            <View style={[styles.row, {justifyContent: 'flex-end', flex: 1}]}>
              <View style={styles.row}>
                <View style={styles.packageContainer}>
                  <Image
                    source={require('../../../../../assets/images/package-box.png')}
                    style={styles.img}
                  />
                  <Text style={styles.packageTxt}>Burger King</Text>
                  <Text style={styles.packageTxt}>Süpriz paketi</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.packageContainer}>
                  <Image
                    source={require('../../../../../assets/images/package-box.png')}
                    style={styles.img}
                  />
                  <Text style={styles.packageTxt}>Mado</Text>
                  <Text style={styles.packageTxt}>Süpriz paketi</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.noteContainer}>
        <Text style={styles.title}>Sipariş Notu</Text>
        <View style={styles.banner} />
        <Text style={styles.noteTxt}>
          Yemekte pul biber, tatlıda gluten olmasın. Teşekkürler..
        </Text>
      </View>
    </View>
  );
};

export default OrderDetailsContainer;

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    width: '100%',
  },
  container: {
    borderWidth: moderateScale(1.5),
    borderRadius: moderateScale(20),
    borderColor: '#66AE7B',
    padding: moderateScale(5),
    width: '90%',
    backgroundColor: '#FEFEFE',
    marginTop: moderateScale(15),
  },
  noteContainer: {
    margin: moderateScale(10),
    borderWidth: moderateScale(1.5),
    borderRadius: moderateScale(20),
    borderColor: '#66AE7B',
    padding: moderateScale(5),
    width: '90%',
    backgroundColor: '#FEFEFE',
    marginTop: verticalScale(20),
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  banner: {
    marginHorizontal: moderateScale(5),
    borderWidth: moderateScale(0.6),
    borderColor: '#66AE7B',
    marginBottom: verticalScale(5),
  },
  img: {
    width: scale(30),
    height: scale(30),
    margin: moderateScale(2),
  },
  row: {
    flexDirection: 'row',
  },
  packageContainer: {
    padding: moderateScale(7.5),
    borderRadius: moderateScale(20),
    borderColor: '#FF9200',
    borderWidth: moderateScale(1),
    alignItems: 'center',
    marginHorizontal: moderateScale(5),
    marginVertical: verticalScale(12.5),
  },
  title: {
    fontSize: moderateScale(14),
    color: '#66AE7B',
    padding: moderateScale(5),
    marginStart: moderateScale(5),
    fontWeight: '500',
  },
  titleProgress: {
    fontSize: moderateScale(12),
    color: '#66AE7B',
    padding: moderateScale(5),
    marginStart: moderateScale(5),
    fontWeight: '500',
  },
  packageTxt: {
    fontSize: moderateScale(8.5),
    color: '#636363',
  },
  detailTxt: {
    fontSize: moderateScale(12),
    color: '#333333',
    marginBottom: verticalScale(5)
  },
  detailContainer: {
    margin: moderateScale(7),
  },
  noteTxt: {
    fontSize: moderateScale(12),
    color: '#333333',
    padding: moderateScale(4),
    marginStart: moderateScale(5),
    paddingVertical: verticalScale(10),
    paddingBottom: verticalScale(25)
  },
});
