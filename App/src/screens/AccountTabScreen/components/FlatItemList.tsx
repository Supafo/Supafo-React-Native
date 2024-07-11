import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ArrowRightIcon} from '../../../assets/images';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

type Props = {
  data: Array<any>;
};

const FlatItemList = ({data}: Props) => {
  const navigation = useNavigation();

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item.isNav) {
            navigation.navigate(
              item.navigation,
              item.navigation == 'ORDER_HELP_DETAIL'
                ? {
                    title: item.title,
                    description: item.description,
                    headerTitle: item.headerTitle,
                  }
                : null,
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
          <Text style={styles.title}>{item.title}</Text>
          <Icon name={'arrow-forward-ios'} size={14} color={'#333333'} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.main}>
      <FlatList data={data} renderItem={renderItem} />
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
    alignItems: 'center',
    margin: 12,
    padding: 5,
    width: '98%',
  },
  icon: {
    height: 20,
    width: 16,
    marginEnd: 10,
  },
  title: {
    // marginLeft: 20,
    fontSize: 16,
    fontWeight: '400',
    color: '#5B5B5B',
  },
});
