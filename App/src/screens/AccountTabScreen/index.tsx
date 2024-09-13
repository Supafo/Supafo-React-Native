import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {updateToken} from '../../store/slices/userSlice';
import {SettingOption} from '../../components/settingOption';
import Header from '../../components/Header';
import {icons, mocks} from '../../mocks/mocks';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import routes, {RootStackParamList} from '../../navigation/routes';
import {colors} from '../../theme/colors';
import auth from '@react-native-firebase/auth';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';


export default function AccountTabScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const disptach = useDispatch();

  const signOut = () => {
    auth()
      .signOut()
      .then(a => {
        disptach(updateToken(null));
      });
    //disptach(updateToken(null));
  };

  const renderItem = ({item}: any) => {
    const handlePress = () => {
      switch (item.id) {
        case 1:
          navigation.navigate(routes.ORDER_HISTORY_SCREEN);
          break;
        case 2:
          navigation.navigate(routes.ADDRESS_INFO_SCREEN);
          break;
        case 3:
          // navigation.navigate(routes.ACCOUNT_INFO_SCREEN);
          break;
        case 4:
          navigation.navigate(routes.CUSTOMER_SERVICES_SCREEN);
          break;
        case 5:
          // navigation.navigate(routes.SHOP_LOGIN_SCREEN);
          break;
        case 6:
          navigation.navigate(routes.HELP_SCREEN);
          break;
        default:
          console.log(`Unknown item id: ${item.id}`);
          break;
      }
    };
    return (
      <SettingOption
        title={item.title}
        right={<Image source={icons.chevronBack} style={styles.rightIcon} />}
        onPress={handlePress}
      />
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Profilim" noBackButton={true} />
      <View>
        <FlatList
          data={mocks}
          renderItem={renderItem}
          scrollEnabled={true}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          style={{marginTop: verticalScale(10)}}
        />

        <View style={{marginTop: verticalScale(50), alignItems: 'center'}}>
          <TouchableOpacity onPress={signOut} style={styles.deleteAccountBtn}>
            <Text
              style={[
                styles.deleteAccountBtnTxt,
                {backgroundColor: colors.greenColor, color: 'white'},
              ]}>
              Çıkış Yap
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => disptach(updateToken(null))}
            style={styles.deleteAccountBtn}>
            <Text style={styles.deleteAccountBtnTxt}>Hesabı Sil</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  leftIcon: {
    width: scale(18),
    height: scale(18),
    marginStart: moderateScale(15),
  },
  rightIcon: {
    width: scale(20),
    height: scale(20),
    marginEnd: verticalScale(10),

  },
  shadow: {
    width: '100%',
    height: scale(3),
    backgroundColor: '#ffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: scale(1),
    },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 3,
  },
  deleteAccountBtn: {
    margin: moderateScale(10),
    width: '80%',
  },
  deleteAccountBtnTxt: {
    color: colors.greenColor,
    borderColor: colors.greenColor,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(20),
    width: '100%',
    textAlign: 'center',
    fontSize: moderateScale(16),
    padding: moderateScale(10),
    backgroundColor: 'white',
  },
});
