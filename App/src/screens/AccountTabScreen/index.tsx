import {View, Text, FlatList, Image} from 'react-native';
import React from 'react';
import Screen from '../../components/Screen';
import Button from '../../components/Button';
import {useDispatch} from 'react-redux';
import {updateToken} from '../../store/slices/userSlice';
import {SettingOption} from '../../components/settingOption';
import Header from '../../components/Header';
import {icons, mocks} from '../../mocks/mocks';

export default function AccountTabScreen() {
  const disptach = useDispatch();

  const renderItem = ({item}: any) => {
    return (
      <SettingOption
        left={<Image source={item.icon} />}
        title={item.title}
        right={<Image source={icons.chevronBack} />}
        // onPress={}
      />
    );
  };

  return (
    <Screen style={{flex: 1}}>
      <Header title="Profilim" noBackButton={false} />
      <View style={{flex: 1}}>
        <FlatList
          data={mocks}
          renderItem={renderItem}
          scrollEnabled={true}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View style={{height: 3, backgroundColor: 'gray'}} />
          )}
          contentContainerStyle={{paddingBottom: 50}}
        />

        <View style={{marginTop: 50, alignItems: 'center'}}>
          <Button
            rounded
            style={{borderRadius: 15}}
            onPress={() => disptach(updateToken(null))}>
            Logout
          </Button>
        </View>
      </View>
    </Screen>
  );
}
