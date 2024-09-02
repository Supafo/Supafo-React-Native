import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import { Switch } from 'react-native-switch';

import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {Icon} from '../../assets/images';
import Button from '../../components/Button';
import AuthBanner from './components/AuthBanner';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import routes, {RootStackParamList} from '../../navigation/routes';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import More from '../../assets/images/more_icon.png';
import ModalCloseGreen from '../../assets/images/bottombaricons/ModalCloseGreen.svg';
import responsiveScale from '../../utils/responsiveScale';
const {scale, moderateScale, verticalScale} = responsiveScale;

function AuthScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [isFirstSelected, setIsFirstSelected] = useState<boolean>(false);
  const [isSecondSelected, setIsSecondSelected] = useState<boolean>(false);

  const actionSheetRef = useRef<ActionSheetRef>(null);
  const cookiesSheetRef = useRef<ActionSheetRef>(null);

  function showActionSheet() {
    actionSheetRef.current?.show();
  }
  function showCookiesSheet() {
    cookiesSheetRef.current?.show();
  }

  const [cookiesSheetStatus, setCookiesSheetStatus] = useState<number>(0);

  const Divider = ({top}: {top: number}) => {
    return (
      <View
        style={{
          height: verticalScale(1),
          backgroundColor: '#DADADA',
          width: '90%',
          alignSelf: 'center',
          borderRadius: 1,
          marginTop: top,
        }}
      />
    );
  };

  // geri buraya gelindiğinde kutucuklar false setlenmeli
  useEffect(() => {
    setIsFirstSelected(false);
    setIsSecondSelected(false);
  }, []);

  const [isCookies2Selected, setIsCookies2Selected] = useState<boolean>(false);
  const [isCookies1Selected, setIsCookies1Selected] = useState<boolean>(false);

  const statsTitle = () => (
    <Text>Teknik olarak gerekli ve istatistik verileri</Text>
  );
  const statsText = () => (
    <Text>
      Uygulamamızın düzgün çalışması için teknik olarak gerekli verileri
      topluyoruz. Bu veriler, uygulamaya göz atabilmeniz ve özelliklerini
      kullanabilmeniz için gereklidir. Ayrıca uygulama trafiğini, kullanıcı
      davranışını ve kullanım kalıplarını toplu düzeyde analiz etmemize ve
      anlamamıza olanak tanıyan istatistiksel verileri de topluyoruz.
      Uygulamadan elde edilen istatistiksel veriler toplanır ve uygulamamızın
      performansını ve kullanıcı deneyimini geliştirmek için kullanılır.
    </Text>
  );

  const CookiesBottomSheet = () => {
    return (
      <View>
        <View>{statsTitle()}</View>
        {statsText()}
      </View>
    );
  };

  const [loginOrsignin, setLoginOrSignin] = useState<string>('');

  const handleGoNext = () => {
    if (loginOrsignin === 'login') {
      navigation.navigate(routes.LOGIN_SCREEN);
    } else if (loginOrsignin === 'signup') {
      navigation.navigate(routes.SIGNUP_SCREEN);
    }
  };
  const renderCookiesBottomSheet = () => {
    switch (cookiesSheetStatus) {
      case 0:
        return (
          <>
            <View
              style={{
                marginTop: moderateScale(-5),
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingRight: moderateScale(17.5),
              }}>
              <Pressable
                style={{
                  height: moderateScale(20),
                   width: moderateScale(20),
                   top:moderateScale(20),
                   justifyContent:'center',
                   alignItems:'center',
                  zIndex:10}}
                onPress={() => cookiesSheetRef.current?.hide()}>
                {/* <Image
                  source={XGreen}
                  style={{height: scale(10), width: scale(10)}}
                /> */}
                <ModalCloseGreen />
              </Pressable>
            </View>
            <View>
              <Image
                source={Icon}
                resizeMode="center"
                style={{alignSelf: 'center', height: verticalScale(55),marginBottom: moderateScale(-7.5)}}
              />
            </View>
            <View style={{width: '100%', paddingHorizontal: moderateScale(21), marginTop: moderateScale(10)}}>
              <Text style={{fontSize: moderateScale(9), color: '#000000', fontWeight: '600'}}>
                Uygulama deneyiminizi geliştirmek, uygulama kullanımını ve
                trafiği analiz etmek, ne tür kişisel veriler topladığımızı ve
                bunları nasıl kullandığımızı, paylaştığımızı ve sakladığımızı
                analiz etmek için çerezler ve benzer teknolojiler kullanıyoruz.
              </Text>
            </View>
            <Divider top={moderateScale(10)} />
            <View style={{width: '100%', paddingHorizontal: moderateScale(21), marginTop: moderateScale(10)}}>
              <Text style={{fontSize: moderateScale(12), color: '#000000', fontWeight: '600'}}>
                Zorunlu Çerezler
              </Text>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{fontSize: moderateScale(9), color: '#000000', fontWeight: '600',marginTop:moderateScale(5)}}>
                  Teknik olarak gerekli ve istatistik verileri
                </Text>
                <View style={{bottom:moderateScale(2)}}>
                <Switch
                  innerCircleStyle={{ alignItems: "center", justifyContent: "center" }}
                  onValueChange={(isChecked: boolean) => {
                    setIsCookies1Selected(isChecked);
                  }}
                  backgroundActive={'rgba(112, 185, 133, 0.7)'}
                  backgroundInactive={'#70B985'}
                  circleBorderActiveColor={'rgba(112, 185, 133, 0.1)'}
                  
                  circleActiveColor={'white'}
                  circleInActiveColor={'#000000'}
                  switchLeftPx={2.5}
                  circleBorderWidth={1.75}
                  barHeight={20}
                  circleSize={20}
                  activeText={''}
                  inActiveText={''}
                  circleBorderInactiveColor='#66AE7BBF'
                  circleBorderColor={'#66AE7BBF'}
                  changeValueImmediately={false} 
                  disabled={false}
                  

                  value={true}
                />
                </View>
              </View>
              <Text
                style={{
                  fontSize: moderateScale(9),
                  color: 'rgba(0,0,0,0.5)',
                  fontWeight: '500',
                  marginTop: moderateScale(12),
                }}>
                Uygulamamızın düzgün çalışması için teknik olarak gerekli
                verileri topluyoruz. Bu veriler, uygulamaya göz atabilmeniz ve
                özelliklerini kullanabilmeniz için gereklidir. Ayrıca uygulama
                trafiğini, kullanıcı davranışını ve kullanım kalıplarını toplu
                düzeyde analiz etmemize ve anlamamıza olanak tanıyan
                istatistiksel verileri de topluyoruz. Uygulamadan elde edilen
                istatistiksel veriler toplanır ve uygulamamızın performansını ve
                kullanıcı deneyimini geliştirmek için kullanılır.
              </Text>
              <Pressable
                onPress={() => {
                  setCookiesSheetStatus(1);
                }}
                style={{
                  marginTop: moderateScale(6),
                  flexDirection: 'row',
                  alignItems: 'center',
                  display: 'flex',
                  gap: moderateScale(15),
                }}>
                <Text
                  style={{
                    fontSize: moderateScale(9),
                    lineHeight: moderateScale(14),
                    color: '#66AE7B',
                    opacity:0.8,
                    fontWeight: '700',
                    fontFamily: 'Inter',
                  }}>
                  Devamını Oku
                </Text>
                <Image source={More} style={{height: moderateScale(10.5), width: moderateScale(7),}} />
              </Pressable>
            </View>
            <Divider top={moderateScale(12)} />
            <View style={{width: '100%', paddingHorizontal: moderateScale(21), marginTop: moderateScale(5)}}>
              <Text style={{fontSize: moderateScale(11), color: '#000000', fontWeight: '600'}}>
                İsteğe Bağlı Çerezler
              </Text>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{fontSize: moderateScale(9), color: '#000000', fontWeight: '900',top:moderateScale(2)}}>
                  Pazarlama
                </Text>
                <View style={{bottom: moderateScale(2)}}>
                <Switch
                  trackColor={{false: '#DADADA', true: '#66AE7BBF'}}
                  thumbColor={
                    isCookies2Selected ? 'rgba(102, 174, 123, 1)' : '#D3D3D3'
                  }
                  onValueChange={() => {
                    setIsCookies2Selected(!isCookies2Selected);
                  }}
                  backgroundActive={'#70B985'}
                  backgroundInactive={'#D3D3D3'}
                  circleBorderActiveColor={'#70B985'}
                  circleBorderInActiveColor={'#D3D3D3'}
                  circleActiveColor={'white'}
                  circleInActiveColor={'white'}
                  switchLeftPx={2.5}
                  circleBorderWidth={1.75}
                  barHeight={20}
                  circleSize={20}
                  activeText={''}
                  inActiveText={''}
                  circleBorderInactiveColor='#D3D3D3'
                  circleBorderColor={'#66AE7BBF'}
                  value={isCookies2Selected}
                />
                </View>

              </View>
              <Text
                style={{
                  fontSize: moderateScale(9),
                  color: 'rgba(0,0,0,0.5)',
                  fontWeight: '500',
                  marginTop: moderateScale(10),
                }}>
                Kişisel verilerinizi, size ilgi alanlarınıza uygun
                kişiselleştirilmiş reklamlar ve içerik gösterebilmek amacıyla
                pazarlama amacıyla kullanırız. Bu verileri aynı zamanda gıda
                israfını en aza indirme vizyonumuza katılmak isteyebilecek
                benzer ilgi alanlarına sahip potansiyel kullanıcıları belirlemek
                için de kullanırız. Bu bilgileri profil oluşturma ve reklam
                amacıyla da kullanabilecek üçüncü taraf reklam ortaklarımızla
                paylaşıyoruz. Pazarlama çerezlerini kabul ederek kişisel
                verilerinizin profil oluşturma ve pazarlama amacıyla
                kullanılmasına izin vermiş olursunuz. Onayınızı her zaman
                uygulamanın ayarlarından geri çekebilirsiniz.
              </Text>
              <Pressable
                onPress={() => {
                  setCookiesSheetStatus(2);
                }}
                style={{
                  marginTop: moderateScale(6),
                  flexDirection: 'row',
                  alignItems: 'center',
                  display: 'flex',
                  gap: moderateScale(15),
                  opacity:0.8,
                }}>
                <Text
                  style={{
                    fontSize: moderateScale(9),
                    lineHeight: 14,
                    color: '#66AE7B',
                    fontWeight: '700',
                    fontFamily: 'Inter',
                  }}>
                  Devamını Oku
                </Text>
                <Image source={More} style={{height: moderateScale(10.5), width: moderateScale(7)}} />
              </Pressable>
            </View>
            <Divider top={moderateScale(12)} />
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}></View>
            <Button
              style={{
                borderRadius: moderateScale(15),
                width: '81%',
                alignSelf: 'center',
                height: moderateScale(40),
                marginTop: moderateScale(12),
              }}
              onPress={() => {
                cookiesSheetRef.current?.hide();
                handleGoNext();
              }}>
              Hepsine İzin Ver
            </Button>
            <Button
              style={{
                borderRadius: moderateScale(15),
                width: '81%',
                alignSelf: 'center',
                height: moderateScale(40),
                marginTop: moderateScale(8),
              }}
              onPress={() => {
                cookiesSheetRef.current?.hide();
                {isCookies2Selected ?
                handleGoNext() : cookiesSheetRef.current?.hide() } //Need to warn message for select cookies
              }}>
              Seçime İzin Ver
            </Button>

            <View style={{height: moderateScale(10)}} />
          </>
        );
      case 1:
        return (
          <View
            style={{
              height: '67.5%',
              marginTop: moderateScale(24),
              width: '100%',
              paddingHorizontal: moderateScale(21),
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: moderateScale(5),
              }}>
              <Pressable
                style={{
                  height: moderateScale(16),
                  width: moderateScale(16),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => setCookiesSheetStatus(0)}>
                <Image
                  source={More}
                  style={{
                    height: verticalScale(12),
                    width: scale(7.5),
                    transform: [{rotate: '180deg'}],
                  }}
                />
              </Pressable>

              <Text
                style={{
                  textAlign: 'center',
                  flex: 1,
                  color: '#000000',
                  fontWeight: '900',
                  fontSize: moderateScale(14),
                }}>
                Teknik olarak gerekli ve istatistik verileri
              </Text>
            </View>
            <View style={{marginTop: moderateScale(30)}}>
              <Text style={{color: 'rgba(0, 0, 0, 0.75)', fontWeight: '600', fontSize: moderateScale(10)}}>
                Uygulamamızın düzgün çalışması için teknik olarak gerekli
                verileri topluyoruz. Bu veriler, uygulamaya göz atabilmeniz ve
                özelliklerini kullanabilmeniz için gereklidir. Ayrıca uygulama
                trafiğini, kullanıcı davranışını ve kullanım kalıplarını toplu
                düzeyde analiz etmemize ve anlamamıza olanak tanıyan
                istatistiksel verileri de topluyoruz. Uygulamadan elde edilen
                istatistiksel veriler toplanır ve uygulamamızın performansını ve
                kullanıcı deneyimini geliştirmek için kullanılır.
              </Text>
            </View>
          </View>
        );
      case 2:
        return (
          <View
            style={{
              height: '67.5%',
              marginTop: moderateScale(24),
              width: '100%',
              paddingHorizontal: moderateScale(21),
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: moderateScale(10),
              }}>
              <Pressable
                style={{
                  height: moderateScale(16),
                  width: moderateScale(16),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => setCookiesSheetStatus(0)}>
                <Image
                  source={More}
                  style={{
                    height: moderateScale(12),
                    width: moderateScale(7.5),
                    transform: [{rotate: '180deg'}],
                  }}
                />
              </Pressable>

              <Text
                style={{
                  textAlign: 'center',
                  flex: 1,
                  color: '#000000',
                  fontWeight: '600',
                  fontSize: moderateScale(14),
                  paddingEnd:moderateScale(28.5),
                }}>
                Pazarlama
              </Text>
            </View>
            <View style={{marginTop: moderateScale(22.5)}}>
              <Text style={{color: 'rgba(0, 0, 0, 0.75)', fontWeight: '600',fontSize:moderateScale(10)}}>
                Kişisel verilerinizi, size ilgi alanlarınıza uygun
                kişiselleştirilmiş reklamlar ve içerik gösterebilmek amacıyla
                pazarlama amacıyla kullanırız. Bu verileri aynı zamanda gıda
                israfını en aza indirme vizyonumuza katılmak isteyebilecek
                benzer ilgi alanlarına sahip potansiyel kullanıcıları belirlemek
                için de kullanırız. Bu bilgileri profil oluşturma ve reklam
                amacıyla da kullanabilecek üçüncü taraf reklam ortaklarımızla
                paylaşıyoruz. Pazarlama çerezlerini kabul ederek kişisel
                verilerinizin profil oluşturma ve pazarlama amacıyla
                kullanılmasına izin vermiş olursunuz. Onayınızı her zaman
                uygulamanın ayarlarından geri çekebilirsiniz.
              </Text>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.main}>
      <Image source={Icon} style={styles.imageStyle } />
      <View style={styles.btnContainer}>
        <Button
          style={{borderRadius: moderateScale(15), width:'100%', height:moderateScale(40),justifyContent:'center'}}
          onPress={() => {
            if (isFirstSelected && isSecondSelected) {
              showCookiesSheet();
              setLoginOrSignin('login');
            } else {
              showActionSheet();
            }
          }}>
          Giriş Yap
        </Button>
        <Button
          style={{borderRadius: moderateScale(15), width:'100%', height:moderateScale(40),justifyContent:'center'}}
          onPress={() => {
            if (isFirstSelected === true && isSecondSelected === true) {
              setLoginOrSignin('signup');
              showCookiesSheet();
            } else {
              showActionSheet();
            }
          }}
          variant="light">
          Kayıt Ol
        </Button>
      </View>
      <View style={[styles.checkboxes, {paddingHorizontal: moderateScale(30)}]}>
        <View
          style={{
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'flex-start',
          }}>
          <View
            style={{
              paddingTop: verticalScale(2),
              alignItems: 'flex-start',
            }}>
            <BouncyCheckbox
              bounceEffectIn={1}
              bounceEffect={0}
              bounceVelocityIn={0}
              bounceVelocityOut={0}
              size={moderateScale(25)}
              innerIconStyle={{
                borderRadius: moderateScale(2.75),
                borderWidth: moderateScale(1.15),
              }}
              fillColor="#66AE7B"
              unFillColor="#fff"
              text=""
              isChecked={isFirstSelected}
              iconStyle={{borderColor: '#66AE7B', borderRadius: moderateScale(2.75)}}
              textStyle={{fontFamily: 'JosefinSans-Regularü',}}
              onPress={(isChecked: boolean) => {
                setIsFirstSelected(isChecked);
              }}
            />
          </View>

          <View style={{width: '100%',}}>
            <Text style={{fontSize: moderateScale(12), color: '#000000'}}>
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
          <View
            style={{
              alignItems: 'flex-start',
              paddingTop: verticalScale(2),
            }}>
            <BouncyCheckbox
              bounceEffectIn={1}
              bounceEffect={0}
              bounceVelocityIn={0}
              bounceVelocityOut={0}
              size={moderateScale(25)}
              innerIconStyle={{
                borderRadius: moderateScale(2.75),
                borderWidth: moderateScale(1.15),
              }}
              fillColor="#66AE7B"
              unFillColor="#fff"
              text=""
              isChecked={isSecondSelected}
              iconStyle={{borderColor: '#66AE7B', borderRadius: moderateScale(2.75)}}
              textStyle={{fontFamily: 'JosefinSans-Regular'}}
              onPress={(isChecked: boolean) => {
                setIsSecondSelected(isChecked);
              }}
            />
          </View>

          <Text style={{fontSize: moderateScale(12), color: '#000000'}}>
            <Text style={[styles.policies, {marginRight: moderateScale(10)}]}>
              Şartlar & Koşulları
            </Text>
            <Text style={{fontSize: moderateScale(12)}}> ve </Text>
            <Text style={styles.policies}>Gizlilik Politikasını</Text>
            <Text> kabul ediyorum.</Text>
          </Text>
        </View>
      </View>
      <ActionSheet
        animated={false}
        indicatorStyle={{backgroundColor: '#fff'}}
        initialSnapIndex={0}
        containerStyle={{
          paddingTop: moderateScale(10),
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
            paddingRight: moderateScale(16),
            paddingTop: moderateScale(20),
          }}></View>
        <View>
          <Image
            source={Icon}
            resizeMode="center"
            style={{alignSelf: 'center', height: moderateScale(60),marginTop:moderateScale(-20)}}
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
              fontSize: moderateScale(15),
              marginTop: moderateScale(18),
            }}>
            Şartlar ve Gizlilik Onayı
          </Text>
          <View style={{width: '81%'}}>
            <Text
              style={{
                marginTop: moderateScale(25),
                color: '#000000',
                fontFamily: 'Inter',
                fontWeight: '400',
                fontSize: moderateScale(10),
              }}>
              Devam etmeden önce, Şartlar ve Koşullar ile Gizlilik Politikası’nı
              kabul ettiğinizden emin olun. Bu, size en iyi deneyimi sunmamız
              için gereklidir.
            </Text>
          </View>
        </View>
        <Button
          style={{
            borderRadius: moderateScale(15),
            width: '81%',
            alignSelf: 'center',
            marginTop: moderateScale(40),
            marginBottom: moderateScale(-20)
          }}
          onPress={() => {
            actionSheetRef.current?.hide();
          }}>
          Anladım
        </Button>

        <View style={{height: moderateScale(50)}} />
      </ActionSheet>
      <ActionSheet ref={cookiesSheetRef} animated={false} closeOnPressBack>
        {renderCookiesBottomSheet()}
      </ActionSheet>
    </View>
  );
}

export default AuthScreen;

const styles = StyleSheet.create({
  main: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: moderateScale(20),
    flex: 1,
    backgroundColor: 'white',
  },
  imageStyle:{
    resizeMode:"contain",
    height:moderateScale(205),
    top: moderateScale(27.5),
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    display: 'flex',
    gap: moderateScale(15),
    marginHorizontal: moderateScale(20),
    top: moderateScale(23.5),
  },
  checkboxes: {
    display: 'flex',
    gap: moderateScale(8),
    paddingHorizontal: moderateScale(35),
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
    marginLeft: moderateScale(10),
    marginRight: moderateScale(10),
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
