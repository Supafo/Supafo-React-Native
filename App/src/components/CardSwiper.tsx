import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {Card} from './Card';
import {CardType} from './components.type';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const CardSwiper = ({data}: {data: CardType[]}) => {
  const navigation = useNavigation();

  return (
    <View style={{marginBottom: 10}}>
      <SwiperFlatList
        index={0}
        showPagination
        paginationStyle={styles.dots}
        paginationStyleItem={styles.dot}
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
                  img: require('../assets/images/CardBg.png'),
                  discountPrice: item.discountPrice,
                  quantity: item.quantity,
                })
              }>
              <Card {...item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dots: {
    bottom: '-25%',
  },

  dot: {
    width: 7,
    height: 7,
  },
  dotActive: {
    width: 15,
    backgroundColor: '#FF9200',
  },
  dotInActive: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FF9200',
  },
});
