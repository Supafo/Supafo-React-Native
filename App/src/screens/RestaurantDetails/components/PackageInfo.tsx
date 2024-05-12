import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../../theme/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

type Props = {};

const PackageInfo = (props: Props) => {
  const packageInfo = ['Vejeteryan', 'Vegan', 'Glutensiz', 'Laktozsuz'];

  return (
    <View style={styles.main}>
      <View style={[styles.shadow, {backgroundColor: 'white'}]}>
        <Text style={styles.title}>Paket Özelliği</Text>
        <View style={styles.itemWrapper}>
          {packageInfo.map((item, index) => (
            <Text key={index} style={styles.txt}>
              {item}
            </Text>
          ))}
        </View>
      </View>
      <View style={[styles.label, styles.shadow]}>
        <Text
          style={{
            fontSize: 17,
            color: '#333333',
            fontWeight: '500',
            padding: 6,
          }}>
          Alerjen ve İçerikler
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

export default PackageInfo;

const styles = StyleSheet.create({
  main: {
    marginTop: 10,
  },
  title: {
    marginBottom: 3,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    paddingStart: 30,
    paddingTop: 15,
  },
  itemWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: 10,
  },
  txt: {
    backgroundColor: colors.greenColor,
    padding: 5,
    margin: 5,
    borderRadius: 20,
    color: 'white',
    fontSize: 13,
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    marginTop: 10,
    alignItems: 'center',
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
});
