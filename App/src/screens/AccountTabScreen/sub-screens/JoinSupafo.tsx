import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../../components/Header';
import FlatItemList from '../components/FlatItemList';
import {joinSupafoData} from '../data/join-supafo-data';

type Props = {};

const JoinSupafo = (props: Props) => {
  return (
    <View style={{backgroundColor: '#F5F5FA', flex: 1}}>
      <Header title={"Supafo'ya Katıl"} />
      <FlatItemList data={joinSupafoData} />
    </View>
  );
};

export default JoinSupafo;

const styles = StyleSheet.create({});
