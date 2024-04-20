import {View, Text} from 'react-native';
import React from 'react';
import Screen from '../../components/Screen';
import Button from '../../components/Button';
import {useDispatch} from 'react-redux';
import {updateToken} from '../../store/slices/userSlice';

export default function AccountTabScreen() {
  const disptach = useDispatch();
  return (
    <Screen>
      <Text>AccountTabScreen</Text>
      <Button rounded onPress={() => disptach(updateToken(null))}>
        Logout
      </Button>
    </Screen>
  );
}
