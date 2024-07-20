import React from 'react';
import {View} from 'react-native';
import PaymentHeader from './components/PaymentHeader';
import PaymentDetails from './components/PaymentDetails';
import routes, {RootStackParamList} from '../../../../navigation/routes';
import {RouteProp} from '@react-navigation/native';

type OnlinePaymentProp = RouteProp<RootStackParamList, 'OnlinePaymentScreen'>;

type Props = {
  route: OnlinePaymentProp;
};

export default function OnlinePaymentScreen({route}: Props) {
  const item = route.params.item;

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <PaymentHeader />
      <PaymentDetails item={item} />
    </View>
  );
}
