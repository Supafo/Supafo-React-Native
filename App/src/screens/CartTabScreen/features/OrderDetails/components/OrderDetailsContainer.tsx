import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const OrderDetailsContainer = () => {
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Sipariş Durumu</Text>
            <Text style={styles.title}>Sipariş Hazırlanıyor</Text>
          </View>
          <View style={styles.banner} />
          <View style={styles.row}>
            <View style={styles.detailContainer}>
              <Text style={styles.detailTxt}>26 Ağustos 2023 | 14:50</Text>
              <Text style={styles.detailTxt}>Toplam: 300.00 TL</Text>
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
    borderWidth: 1.5,
    borderRadius: 20,
    borderColor: '#66AE7B',
    padding: 5,
    width: '90%',
    backgroundColor: '#FEFEFE',
  },
  noteContainer: {
    margin: 10,
    borderWidth: 1.5,
    borderRadius: 20,
    borderColor: '#66AE7B',
    padding: 5,
    width: '90%',
    backgroundColor: '#FEFEFE',
    marginTop: 20
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  banner: {
    margin: 5,
    borderWidth: 0.6,
    borderColor: '#66AE7B',
  },
  img: {
    width: 30,
    height: 30,
    margin: 2,
  },
  row: {
    flexDirection: 'row',
  },
  packageContainer: {
    padding: 10,
    borderRadius: 20,
    borderColor: '#FF9200',
    borderWidth: 1,
    alignItems: 'center',
    margin: 5,
  },
  title: {
    fontSize: 14,
    color: '#66AE7B',
    padding: 5,
    marginStart: 5,
  },
  packageTxt: {
    fontSize: 10,
    color: '#636363',
  },
  detailTxt: {
    fontSize: 12,
    color: '#333333',
  },
  detailContainer: {
    margin: 7,
  },
  noteTxt: {
    fontSize: 14,
    color: '#333333',
    padding: 4,
    marginStart: 5,
  },
});
