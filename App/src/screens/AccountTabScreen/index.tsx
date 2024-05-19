import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Button from '../../components/Button';
import {useDispatch} from 'react-redux';
import {updateToken} from '../../store/slices/userSlice';
import {SettingOption} from '../../components/settingOption';
import Header from '../../components/Header';
import {icons, mocks} from '../../mocks/mocks';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import routes, {RootStackParamList} from '../../navigation/routes';
import {colors} from '../../theme/colors';

export default function AccountTabScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const disptach = useDispatch();

  const renderItem = ({item}: any) => {
    const handlePress = () => {
      switch (item.id) {
        case 1:
          navigation.navigate(routes.ORDER_HISTORY_SCREEN);
          break;
        case 2:
          navigation.navigate(routes.ADDRESS_INFO_SCREEN); // Define the correct route name
          break;
        case 3:
          // navigation.navigate(routes.ACCOUNT_INFO_SCREEN); // Define the correct route name
          break;
        case 4:
          // navigation.navigate(routes.CUSTOMER_SERVICES_SCREEN); // Define the correct route name
          break;
        case 5:
          // navigation.navigate(routes.SHOP_LOGIN_SCREEN); // Define the correct route name
          break;
        case 6:
          navigation.navigate(routes.HELP_SCREEN); // Define the correct route name
          break;
        default:
          console.log(`Unknown item id: ${item.id}`);
          break;
      }
    };
    return (
      <SettingOption
        left={
          <Image
            source={item.icon}
            style={[styles.leftIcon, {tintColor: item.tintColor}]}
          />
        }
        title={item.title}
        right={<Image source={icons.chevronBack} style={styles.rightIcon} />}
        onPress={handlePress}
      />
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F5F5FA'}}>
      <Header title="Profilim" noBackButton={false} />
      <View>
        <FlatList
          data={mocks}
          renderItem={renderItem}
          scrollEnabled={true}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.shadow} />}
        />

        <View style={{marginTop: 50, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => disptach(updateToken(null))}
            style={styles.deleteAccountBtn}>
            <Text
              style={[
                styles.deleteAccountBtnTxt,
                {backgroundColor: colors.greenColor, color: 'white'},
              ]}>
              Çıkış Yap
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteAccountBtn}>
            <Text style={styles.deleteAccountBtnTxt}>Hesabı Sil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  leftIcon: {
    width: 18,
    height: 18,
    marginStart: 10,
  },
  rightIcon: {
    width: 20,
    height: 20,
    marginEnd: 10,
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
  deleteAccountBtn: {
    margin: 10,
    width: '80%',
  },
  deleteAccountBtnTxt: {
    color: colors.greenColor,
    borderColor: colors.greenColor,
    borderWidth: 1,
    borderRadius: 20,
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    padding: 10,
    backgroundColor: 'white',
  },
});
