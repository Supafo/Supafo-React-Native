import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {Card} from './Card';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import responsiveScale from '../utils/responsiveScale';

const {scale, verticalScale, moderateScale} = responsiveScale;
export const CardSwiper = ({data}: any) => {
  const navigation = useNavigation();

  return (
    <View style={{marginBottom: moderateScale(25)}}>
      <SwiperFlatList
        ListFooterComponent={() => <View style={{width: moderateScale(20)}} />}
        ListHeaderComponent={() => <View style={{width: moderateScale(20)}} />}
        index={0}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        showPagination
        paginationStyle={styles.dots}
        paginationStyleItem={styles.dot}
        ItemSeparatorComponent={() => <View style={{width: moderateScale(40)}} />}
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
    bottom: '-20%',
    gap: moderateScale(-15),
  },
  dot: {
    width: scale(6.5),
    height: verticalScale(6),
  },
  dotActive: {
    width: scale(15),
    height: verticalScale(6),
    backgroundColor: '#FF9200',
  },
  dotInActive: {
    backgroundColor: '#FFF',
    borderWidth: moderateScale(0.6),
    borderColor: '#FF9200',
  },
});
