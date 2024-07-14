import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {Card} from './Card';
import {CardType} from './components.type';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {scale, verticalScale} from 'react-native-size-matters';

export const CardSwiper = ({data}: {data: CardType[]}) => {
  const navigation = useNavigation();

  return (
    <View style={{marginBottom: verticalScale(20)}}>
      <SwiperFlatList
        ListFooterComponent={() => <View style={{width: 20}} />}
        ListHeaderComponent={() => <View style={{width: 20}} />}
        index={0}
        showPagination
        paginationStyle={styles.dots}
        paginationStyleItem={styles.dot}
        ItemSeparatorComponent={() => <View style={{width: 10}} />}
        paginationStyleItemActive={styles.dotActive}
        paginationStyleItemInactive={styles.dotInActive}
        data={data}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('RestaurantDetail', {
                  title: 'Burger King',
                  price: item.price,
                  time: item.time,
                  rate: item.rate,
                  img: require('../assets/images/CardBg.jpg'),
                  discountPrice: item.discountPrice,
                  quantity: item.quantity,
                })
              }>
              <Card {...item} item={item} favoriteScreen={false} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dots: {
    bottom: '-20%',
  },
  dot: {
    width: 6,
    height: 6,
  },
  dotActive: {
    width: 15,
    height: 6,
    backgroundColor: '#FF9200',
  },
  dotInActive: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FF9200',
  },
});
