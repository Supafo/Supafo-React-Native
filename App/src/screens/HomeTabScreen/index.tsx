import {View, StyleSheet, Text, ScrollView} from 'react-native';
import React, {useRef, useState} from 'react';
import Screen from '../../components/Screen';
import {
  SearchIcon,
  DonateBackgroundImage,
  DonateIcon,
  FavoriteIcon,
  BreakfastImage,
  ShareIcon,
  RestaurantLogo,
  StarIcon,
} from '../../assets/images';
import Input from '../../components/Input';
import {colors} from '../../theme/colors';
import {LocationInput} from '../../components/LocationInput';
import HeadingText from '../../components/HeadingText';
import {Card} from '../../components/Card';
import {Donate} from '../../components/Donate';
import BookStatus from '../../components/BookStatus';
import {FlatList} from 'react-native-gesture-handler';
import {CARDS_DATA, CARDS_MIX_DATA, CARDS_SWIPER_DATA} from '../../data/cards';
import {CardSwiper} from '../../components/CardSwiper';

export default function HomeTabScreen() {
  return (
    <ScrollView>
      <View>
        <LocationInput distance={10} title="Istiklal Park" />
      </View>

      <View style={styles.inputView}>
        <Input
          className="p-[0px]"
          isPassword={false}
          heading=" "
          placeholder="Ara..."
          rounded
          icon={SearchIcon}
          style={styles.input}></Input>
      </View>

      <View className="mt-5">
        <BookStatus status="delivered" />
      </View>

      <View className="mb-3">
        <HeadingText title="Haftanın Yıldızları" />
      </View>

      <CardSwiper data={CARDS_SWIPER_DATA} />

      <View className="mt-3">
        <HeadingText title="Yeni Sürpriz Paketler" />
      </View>

      <View className="mt-2">
        <FlatList
          data={CARDS_DATA}
          renderItem={({item}) => <Card {...item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{width: 20}} />}
          contentContainerStyle={{paddingVertical: 15}}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <View className="mt-3">
        <HeadingText title="Sizin için önerilen" />
      </View>

      <View className="mt-2">
        <FlatList
          data={CARDS_MIX_DATA}
          renderItem={({item}) => <Card {...item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{width: 10}} />}
          contentContainerStyle={{paddingVertical: 5}}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <View className="mt-3">
        <HeadingText title="Kahvaltılık" />
      </View>

      <View className="mt-2">
        <FlatList
          data={CARDS_MIX_DATA}
          renderItem={({item}) => <Card {...item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{width: 10}} />}
          contentContainerStyle={{paddingVertical: 5}}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <View className="mt-3">
        <HeadingText title="Öğle Yemeği" />
      </View>

      <View className="mt-2">
        <FlatList
          data={CARDS_MIX_DATA}
          renderItem={({item}) => <Card {...item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{width: 10}} />}
          contentContainerStyle={{paddingVertical: 5}}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <View className="mt-3">
        <Donate
          backgroundImage={DonateBackgroundImage}
          isAvailable={false}
          icon={DonateIcon}
          title="Bağış Yapmak İster Misin ?"
          button={{
            variant: 'light',
            rounded: true,
          }}
          buttonTitle="Bağış yap"
        />
      </View>

      <View className="mt-3">
        <HeadingText title="Favorilerim" />
      </View>

      <View className="mt-2">
        <FlatList
          data={CARDS_MIX_DATA}
          renderItem={({item}) => <Card {...item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{width: 10}} />}
          contentContainerStyle={{paddingVertical: 5}}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputView: {
    gap: 8,
  },

  input: {
    width: 335,
    height: 36,
    fontSize: 10,
    color: colors.placeholder,
  },
  dot: {
    backgroundColor: 'orange',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: 'white',
  },
  pagination: {
    bottom: 10,
  },
  swiper: {
    flex: 1,
    height: 200,
  },
});
