import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FlatItemList from './components/FlatItemList';
import {helpScreenData} from './data/help-screen-data';
import Header from '../../components/Header';

export const Help = () => {
  return (
    <View style={{backgroundColor: '#F5F5FA', flex: 1}}>
      <Header title={'Destek'} />
      <FlatItemList data={helpScreenData} />
    </View>
  );
};
