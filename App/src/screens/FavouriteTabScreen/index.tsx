import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  Touchable,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Screen from '../../components/Screen';
import Header from '../../components/Header';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Input from '../../components/Input';
import SearchIcon from '../../assets/images/SearchIcon.png';
import Card from '../../components/Card';
import filterIcon from '../../assets/images/filterIcon.png';
import {colors} from '../../theme/colors';
import {restaurants} from '../../data/onboarding';


export default function FavouriteTabScreen() {
  const renderItems = ({item}: {item: any}) => {
    return (
      <Card
        url={item.url}
        count={item.count}
        distance={item.distance}
        price={item.price}
        time={item.time}
      />
    );
  };

  return (
    <SafeAreaProvider>
      <Screen>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header title="Favorilerim" noBackButton={true} />
          <View style={styles.search}>
            <Input
            className='p-[0px]'
              style={styles.input}
              heading=" "
              placeholder="Ara..."
              rounded
              icon={SearchIcon}></Input>
            <Image style={styles.filter} source={filterIcon} />
          </View>

          <View>
            <FlatList
              data={restaurants}
              scrollEnabled={false}
              renderItem={renderItems}
              horizontal={false}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{height: 20}} />}
            />
          </View>
        </ScrollView>
      </Screen>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  filter: {
    width: 36,
    height: 36,
    top: 11,
    // padding: 15,
    // left:10
  },
  search: {
    left: 20,
    flexDirection: 'row',
    width: 335,
    height: 36,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 295,
    height: 36,
    // borderRadius:15,
    // borderWidth:1
  },
});
