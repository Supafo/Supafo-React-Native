import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Icon} from '../../assets/images';
import Button from '../../components/Button';
import AuthBanner from './components/AuthBanner';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import routes, {RootStackParamList} from '../../navigation/routes';
import CheckBox from '@react-native-community/checkbox';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {moderateScale, scale} from 'react-native-size-matters';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';

function AuthScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [isFirstSelected, setIsFirstSelected] = useState<boolean>(false);
  const [isSecondSelected, setIsSecondSelected] = useState<boolean>(false);

  const actionSheetRef = useRef<ActionSheetRef>(null);

  function handleToggle() {
    actionSheetRef.current?.show();
  }

  return (
    <View style={styles.main}>
      <Image source={Icon} resizeMode="contain" className="h-[204px]" />
      <View style={styles.btnContainer}>
        <Button
          style={{borderRadius: 15}}
          onPress={() => {
            if (isFirstSelected && isSecondSelected) {
              navigation.navigate(routes.LOGIN_SCREEN);
            } else {
              handleToggle();
            }
          }}>
          Giriş Yap
        </Button>
        <Button
          style={{borderRadius: 15}}
          onPress={() => {
            if (isFirstSelected === true && isSecondSelected === true) {
              navigation.navigate(routes.SIGNUP_SCREEN);
            } else {
              handleToggle();
            }
          }}
          variant="light">
          Kayıt Ol
        </Button>
      </View>
      <View style={[styles.checkboxes, {paddingHorizontal: 30}]}>
        <View
          style={{
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'flex-start',
          }}>
          <BouncyCheckbox
            size={24}
            innerIconStyle={{
              borderRadius: 4,
              borderWidth: 2,
            }}
            fillColor="#66AE7B"
            unFillColor="#fff"
            text=""
            isChecked={isFirstSelected}
            iconStyle={{borderColor: '#66AE7B', borderRadius: 4}}
            textStyle={{fontFamily: 'JosefinSans-Regular'}}
            onPress={(isChecked: boolean) => {
              setIsFirstSelected(isChecked);
            }}
          />
          <View style={{width: '90%'}}>
            <Text style={{fontSize: 13, marginTop: 20, color: '#000000'}}>
              Supafo’nun e-posta adresimi ve adımı gizlilik politikasına uygun
              şekilde saklamasına izin veriyorum.
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'flex-start',
          }}>
          <BouncyCheckbox
            size={24}
            innerIconStyle={{
              borderRadius: 4,
              borderWidth: 2,
            }}
            fillColor="#66AE7B"
            unFillColor="#fff"
            text=""
            isChecked={isSecondSelected}
            iconStyle={{borderColor: '#66AE7B', borderRadius: 4}}
            textStyle={{fontFamily: 'JosefinSans-Regular'}}
            onPress={(isChecked: boolean) => {
              setIsSecondSelected(isChecked);
            }}
          />
          <Text style={{fontSize: 13, color: '#000000'}}>
            <Text style={[styles.policies, {marginRight: 10}]}>
              Şartlar & Koşulları
            </Text>
            <Text style={{fontSize: 13}}> ve </Text>
            <Text style={styles.policies}>Gizlilik Politikasını</Text>
            <Text> kabul ediyorum.</Text>
          </Text>
        </View>
      </View>
      <ActionSheet
        indicatorStyle={{backgroundColor: '#fff'}}
        initialSnapIndex={0}
        containerStyle={{
          paddingTop: 10,
          backgroundColor: '#fff',
        }}
        statusBarTranslucent
        closeOnPressBack
        drawUnderStatusBar={true}
        gestureEnabled={true}
        headerAlwaysVisible={false}
        defaultOverlayOpacity={0.3}
        ref={actionSheetRef}>
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingRight: 16,
            paddingTop: 20,
          }}></View>
        <View>
          <Image
            source={Icon}
            resizeMode="center"
            style={{alignSelf: 'center', height: 75}}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          <Text
            style={{
              fontWeight: '500',
              color: '#000000',
              fontSize: 17,
              marginTop: 18,
            }}>
            Şartlar ve Gizlilik Onayı
          </Text>
          <View style={{width: '81%'}}>
            <Text
              style={{
                marginTop: 47,
                color: '#000000',
                fontFamily: 'Inter',
                fontWeight: '400',
                fontSize: 15,
              }}>
              Devam etmeden önce, Şartlar ve Koşullar ile Gizlilik Politikası’nı
              kabul ettiğinizden emin olun. Bu, size en iyi deneyimi sunmamız
              için gereklidir.
            </Text>
          </View>
        </View>
        <Button
          style={{
            borderRadius: 15,
            width: '81%',
            alignSelf: 'center',
            marginTop: 40,
          }}
          onPress={() => {
            actionSheetRef.current?.hide();
          }}>
          Anladım
        </Button>

        <View style={{height: 50}} />
      </ActionSheet>
    </View>
  );
}

export default AuthScreen;

const styles = StyleSheet.create({
  main: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 20,
    flex: 1,
    backgroundColor: 'white',
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    display: 'flex',
    gap: 16,
    marginHorizontal: 20,
  },
  checkboxes: {
    display: 'flex',
    gap: scale(8),
    paddingHorizontal: 35,
    borderColor: 'black',
    width: '100%',
  },
  banner: {
    width: '95%',
  },
  policies: {
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    color: '#66AE7B',
    marginLeft: 10,
    marginRight: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
