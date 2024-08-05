import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import routes, {RootStackParamList} from '../../../navigation/routes';
import Header from '../../../components/Header';
import {colors} from '../../../theme/colors';

type RestaruantDetailProp = RouteProp<RootStackParamList, 'ORDER_HELP_DETAIL'>;

type Props = {
  route: RestaruantDetailProp;
};

const OrderHelpDetails = ({route}: Props) => {
  const item = route.params;
  const navigation = useNavigation();
  console.log(item);

  return (
    <View style={styles.main}>
      <Header title={item.title} />
      <View style={styles.container}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <TouchableOpacity style={styles.btn}>
          <Text
            style={styles.btnTxt}
            onPress={() => navigation.navigate(routes.CONTACT_US as never, { title: item.title,
              description: item.description, headerTitle:item.headerTitle})}>
            Bizimle İletişime Geçin
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderHelpDetails;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    flex: 1,
  },
  container: {
    margin: 20,
    borderColor: '#66AE7B',
    borderRadius: 10,
    borderWidth: 1,
    padding: 20,
  },
  title: {
    fontSize: 17,
    color: '#333333',
    fontWeight: '600',
    padding: 10,
  },
  description: {
    color: '#333333',
    padding: 10,
    fontSize: 14,
  },
  btn: {
    alignItems: 'center',
    margin: 20,
    padding: 5,
  },
  btnTxt: {
    color: '#66AE7B',
    fontSize: 16,
    fontWeight: '600',
  },
});
