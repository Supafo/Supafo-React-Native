import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Octicons';
import {colors} from '../../../theme/colors';

type Props = {
  data: Array<object>;
};

const ListItem = ({data}: Props) => {

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <View style={styles.row}>
              <Icon
                name={item.isSelected ? 'check-circle' : 'circle'}
                size={16}
                color={colors.greenColor}
              />
              <Text style={styles.txt}>{item.name}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  main: {},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt: {
    fontSize: 16,
    color: '#333333',
    padding: 5,
    paddingStart: 10,
  },
});
