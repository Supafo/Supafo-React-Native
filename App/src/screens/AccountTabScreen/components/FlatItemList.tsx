import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { ArrowRightIcon } from '../../../assets/images';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';

type Props = {
  data: Array<any>;
};

const FlatItemList = ({ data }: Props) => {
  const navigation = useNavigation();
  const renderItem = (item: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item.isNav) {
            navigation.navigate(
              item.navigation,
              item.navigation === 'ORDER_HELP_DETAIL'
                ? {
                  title: item.title,
                  description: item.description,
                  headerTitle: item.headerTitle,
                }
                : {},
            );
          } else {
            console.log('eka');
          }
        }}
        style={styles.renderItemWrapper}>
        <View
          style={{
            justifyContent: 'space-between',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={styles.destek}>
            {item?.icon ?
              <View style={styles.iconWrapper}>
                <Image source={item.icon} style={styles.icon} />
              </View>
              : null}
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <Icon name={'arrow-forward-ios'} size={scale(16)} style={{left:moderateScale(3.75)}} color={'#333333'} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.main}>
      <FlatList
        data={data}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default FlatItemList;

const styles = StyleSheet.create({
  main: {
    paddingTop: verticalScale(20),
    paddingEnd: moderateScale(20),
    marginStart: moderateScale(5),
    backgroundColor: 'white',
    flex: 1,
  },
  renderItemWrapper: {
    flexDirection: 'row',
    margin: moderateScale(12),
    padding: moderateScale(5),
    width: '98%',
  },
  iconWrapper: {
    width: scale(20),
    height: scale(20),
    marginEnd: moderateScale(10),
    paddingTop: verticalScale(1.5),
    objectFit: 'cover',
  },
  icon: {
    width: scale(18),
    height: scale(18),
  },
  title: {
    fontSize: moderateScale(14.5),
    fontWeight: '400',
    color: '#5B5B5B',
  },
  destek: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
