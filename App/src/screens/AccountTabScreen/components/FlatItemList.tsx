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

type Props = {
  data: Array<any>;
};

const FlatItemList = ({ data }: Props) => {
  const navigation = useNavigation();
  const renderItem = (item: any) => {
    console.log({ item });
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
          <Icon name={'arrow-forward-ios'} size={14} color={'#333333'} />
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
    paddingTop: 20,
    paddingEnd: 20,
    marginStart: 5,
    backgroundColor: 'white',
    flex: 1,
  },
  renderItemWrapper: {
    flexDirection: 'row',
    margin: 12,
    padding: 5,
    width: '98%',
  },
  iconWrapper: {
    width: 20,
    height: 20,
    marginEnd: 10,
    objectFit: 'cover',
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    color: '#5B5B5B',
  },
  destek: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
