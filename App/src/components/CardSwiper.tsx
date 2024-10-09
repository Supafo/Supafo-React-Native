import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {Card} from './Card';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { colors } from '../theme/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
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
    bottom: hp('-5%'),
    gap: moderateScale(-15),
  },
  dot: {
    width: wp('1.85%'),
    height: hp('0.95%'),
  },
  dotActive: {
    width: wp('1.85%'),
    height: hp('0.95%'),
    backgroundColor: colors.openGreen,
  },
  dotInActive: {
    borderColor: '#D0D5DD',
    backgroundColor:'#D0D5DD'

  },
});
