import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import {FlatList} from 'react-native-gesture-handler';

export const AdressInfo = () => {
  return (
    <View>
      <Header title="Adres Bilgilerim" />
      <View>
        {/* <FlatList
          data={}
          renderItem={renderItem}
          scrollEnabled={true}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{height: 15}} />}
          contentContainerStyle={{}}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
