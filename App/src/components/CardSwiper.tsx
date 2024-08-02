import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {Card} from './Card';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {verticalScale} from 'react-native-size-matters';

export const CardSwiper = ({data}: any) => {
  const navigation = useNavigation();

  return (
    <View style={{marginBottom: verticalScale(25)}}>
      <SwiperFlatList
        ListFooterComponent={() => <View style={{width: 20}} />}
        ListHeaderComponent={() => <View style={{width: 20}} />}
        index={0}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        showPagination
        paginationStyle={styles.dots}
        paginationStyleItem={styles.dot}
        ItemSeparatorComponent={() => <View style={{width: 40}} />}
        paginationStyleItemActive={styles.dotActive}
        paginationStyleItemInactive={styles.dotInActive}
        data={data}
        renderItem={({item}) => {
          if (item.lastProduct === 'Tükendi') {
            return (
              <View>
                <Card data={item} />
              </View>
            );
          } else {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('RestaurantDetail', {
                    item: item,
                  });
                }}>
                <Card data={item} />
              </TouchableOpacity>
            );
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dots: {
    bottom: '-22%',
  },
  dot: {
    width: 6,
    height: 6,
  },
  dotActive: {
    width: 6,
    height: 6,
    backgroundColor: '#FF9200',
  },
  dotInActive: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FF9200',
  },
});
