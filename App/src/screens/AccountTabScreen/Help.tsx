import {View} from 'react-native';
import React from 'react';
import FlatItemList from './components/FlatItemList';
import {helpScreenData} from './data/help-screen-data';
import Header from '../../components/Header';

export const Help = () => {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Header title={'Destek'} noBackButton={true} />
      <FlatItemList data={helpScreenData} />
    </View>
  );
};
