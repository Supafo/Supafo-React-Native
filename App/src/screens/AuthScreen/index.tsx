import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Switch,
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
import {moderateScale, scale} from 'react-native-size-matters';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import More from '../../assets/images/more_icon.png';
import XGreen from '../../assets/images/exitgreen.png';

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
          height: 1,
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

  const renderCookiesBottomSheet = () => {
    switch (cookiesSheetStatus) {
      case 0:
        return (
          <>
            <View
              style={{
                marginTop: 17,
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingRight: 16,
              }}>
              <Pressable
                style={{height: 20, width: 20}}
                onPress={() => actionSheetRef.current?.hide()}>
                <Image
                  source={XGreen}
                  style={{height: scale(10), width: scale(10)}}
                />
              </Pressable>
            </View>
            <View>
              <Image
                source={Icon}
                resizeMode="center"
                style={{alignSelf: 'center', height: 75}}
              />
            </View>
            <View style={{width: '100%', paddingHorizontal: 21, marginTop: 10}}>
              <Text style={{fontSize: 12, color: '#000000', fontWeight: '600'}}>
                Uygulama deneyiminizi geliştirmek, uygulama kullanımını ve
                trafiği analiz etmek, ne tür kişisel veriler topladığımızı ve
                bunları nasıl kullandığımızı, paylaştığımızı ve sakladığımızı
                analiz etmek için çerezler ve benzer teknolojiler kullanıyoruz.
              </Text>
            </View>
            <Divider top={12} />
            <View style={{width: '100%', paddingHorizontal: 21, marginTop: 10}}>
              <Text style={{fontSize: 15, color: '#000000', fontWeight: '600'}}>
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
                  style={{fontSize: 12, color: '#000000', fontWeight: '600'}}>
                  Teknik olarak gerekli ve istatistik verileri
                </Text>
                <Switch
                  trackColor={{false: '#DADADA', true: '#DADADA'}}
                  thumbColor={true ? '#66AE7BBF' : '#66AE7BBF'}
                  ios_backgroundColor="#DADADA"
                  onValueChange={(isChecked: boolean) => {
                    setIsCookies1Selected(isChecked);
                  }}
                  style={{height: 10, opacity: 1}}
                  value={isCookies1Selected}
                />
              </View>
              <Text
                style={{
                  fontSize: 12,
                  color: 'rgba(0,0,0,0.75)',
                  fontWeight: '300',
                  marginTop: 12,
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
                  marginTop: 6,
                  flexDirection: 'row',
                  alignItems: 'center',
                  display: 'flex',
                  gap: scale(15),
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    lineHeight: 14,
                    color: '#66AE7B',
                    fontWeight: '600',
                    fontFamily: 'Inter',
                  }}>
                  Devamını Oku
                </Text>
                <Image source={More} style={{height: 13.5, width: 8}} />
              </Pressable>
            </View>
            <Divider top={12} />
            <View style={{width: '100%', paddingHorizontal: 21, marginTop: 10}}>
              <Text style={{fontSize: 15, color: '#000000', fontWeight: '600'}}>
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
                  style={{fontSize: 12, color: '#000000', fontWeight: '600'}}>
                  Pazarlama
                </Text>
                <Switch
                  trackColor={{false: '#DADADA', true: '#DADADA'}}
                  thumbColor={true ? '#66AE7BBF' : '#66AE7BBF'}
                  ios_backgroundColor="#DADADA"
                  onValueChange={() => {
                    setIsCookies2Selected(!isCookies2Selected);
                  }}
                  value={isCookies2Selected}
                />
              </View>
              <Text
                style={{
                  fontSize: 12,
                  color: 'rgba(0,0,0,0.75)',
                  fontWeight: '300',
                  marginTop: 12,
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
                  marginTop: 6,
                  flexDirection: 'row',
                  alignItems: 'center',
                  display: 'flex',
                  gap: scale(15),
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    lineHeight: 14,
                    color: '#66AE7B',
                    fontWeight: '600',
                    fontFamily: 'Inter',
                  }}>
                  Devamını Oku
                </Text>
                <Image source={More} style={{height: 13.5, width: 8}} />
              </Pressable>
            </View>
            <Divider top={12} />
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}></View>
            <Button
              style={{
                borderRadius: 15,
                width: '81%',
                alignSelf: 'center',
                marginTop: 12,
              }}
              onPress={() => {
                cookiesSheetRef.current?.hide();
              }}>
              Hepsine İzin Ver
            </Button>
            <Button
              style={{
                borderRadius: 15,
                width: '81%',
                alignSelf: 'center',
                marginTop: 8,
              }}
              onPress={() => {
                cookiesSheetRef.current?.hide();
              }}>
              Seçime İzin Ver
            </Button>

            <View style={{height: 10}} />
          </>
        );
      case 1:
        return (
          <View
            style={{
              height: '73%',
              marginTop: 24,
              width: '100%',
              paddingHorizontal: 21,
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <Pressable
                style={{
                  height: 16,
                  width: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => setCookiesSheetStatus(0)}>
                <Image
                  source={More}
                  style={{
                    height: 13.5,
                    width: 8,
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
                }}>
                Teknik olarak gerekli ve istatistik verileri
              </Text>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={{color: 'rgba(0, 0, 0, 0.75)', fontWeight: '600'}}>
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
              height: '73%',
              marginTop: 24,
              width: '100%',
              paddingHorizontal: 21,
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <Pressable
                style={{
                  height: 16,
                  width: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => setCookiesSheetStatus(0)}>
                <Image
                  source={More}
                  style={{
                    height: 13.5,
                    width: 8,
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
                }}>
                İsteğe Bağlı Çerezler
              </Text>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={{color: 'rgba(0, 0, 0, 0.75)', fontWeight: '600'}}>
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
      <Image source={Icon} resizeMode="contain" className="h-[204px]" />
      <View style={styles.btnContainer}>
        <Button
          style={{borderRadius: 15}}
          onPress={() => {
            if (isFirstSelected && isSecondSelected) {
              navigation.navigate(routes.LOGIN_SCREEN);
            } else {
              showActionSheet();
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
              showActionSheet();
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
      <ActionSheet ref={cookiesSheetRef} closeOnPressBack>
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
