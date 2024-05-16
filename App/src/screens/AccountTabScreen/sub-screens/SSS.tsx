import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../../components/Header';
import FlatItemList from '../components/FlatItemList';
import {sssData} from '../data/sss-data';

const SSS = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#F5F5FA'}}>
      <Header title={'Sıkça Sorulan Sorular'} />
      <FlatItemList data={sssData} />
    </View>
  );
};

export default SSS;
