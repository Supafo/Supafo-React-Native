import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import React from 'react';
import Screen from '../../components/Screen';
import Button from '../../components/Button';
import {useDispatch} from 'react-redux';
import {updateToken} from '../../store/slices/userSlice';
import {SettingOption} from '../../components/settingOption';
import Header from '../../components/Header';
import {icons, mocks} from '../../mocks/mocks';
import {useNavigation} from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import routes, {RootStackParamList} from '../../navigation/routes';

export default function AccountTabScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const disptach = useDispatch();

  const renderItem = ({item}: any) => {
    const handlePress = () => {
      navigation.navigate(routes.ORDER_HISTORY_SCREEN);
    };
    return (
      <SettingOption
        left={<Image source={item.icon} style={styles.leftIcon} />}
        title={item.title}
        right={<Image source={icons.chevronBack} style={styles.rightIcon} />}
        onPress={handlePress}
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
          ItemSeparatorComponent={() => <View style={styles.shadow} />}
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

const styles = StyleSheet.create({
  leftIcon: {
    width: 16,
    height: 16,
  },
  rightIcon: {
    width: 20,
    height: 20,
  },

  shadow: {
    width: '100%',
    height: 3,
    backgroundColor: '#ffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 3,
  },
});
