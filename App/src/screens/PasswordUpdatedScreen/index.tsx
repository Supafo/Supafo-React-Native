import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Header from '../../components/Header';
import routes, {RootStackParamList} from '../../navigation/routes';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import responsiveScale from '../../utils/responsiveScale';

const {scale, verticalScale, moderateScale} = responsiveScale;

const PasswordUpdatedScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  {/* 
     const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null); // Token state

  useEffect(() => {
    // Token'ı al veya bir şekilde sağla
    const tokenFromParams = /* token'ı navigasyon parametrelerinden al ;
    setToken(tokenFromParams);
  }, []);

  const handleResetPassword = async () => {
    if (!token) {
      Alert.alert('Error', 'Token bulunamadı.');
      return;
    }

    setIsLoading(true);

    try {
      // Şifre güncelleme isteği gönder
      const response = await api.post(`/reset-password/${token}`, {
        password: 'YeniŞifreniz', // Burada kullanıcıdan alınan yeni şifreyi kullanın
      });

      if (response.status === 200) {
        Alert.alert('Başarılı', 'Şifreniz güncellendi.');
        // İsteğe bağlı: Kullanıcıyı ana ekrana yönlendirin
        navigation.navigate('Login'); // 'Login' ekranını düzenleyin
      }
    } catch (error) {
      console.error('Error updating password:', error);
      Alert.alert('Error', 'Şifre güncellenirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
    **/}
  return (
    <View style={styles.main}>
          <Header title={'Yeni Şifre Oluştur'} noBackButton={true}></Header>

      <View style={styles.container}>
        
      <StatusBar backgroundColor={'#F5F5FA'} />
      
        <Image
          source={require('../../assets/images/password-updated-img.png')}
          style={styles.img}
        />
        <Text style={styles.labelTxt}>Şifreniz Başarıyla Güncellendi !</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(routes.LOGIN_SCREEN)}
          style={styles.btn}>
          <Text style={styles.btnTxt}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordUpdatedScreen;

const styles = StyleSheet.create({
  main: {
    padding: moderateScale(0),
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  title: {
    fontSize: moderateScale(19),
    color: '#333333',
    fontWeight: '500',
    padding: moderateScale(10),
  },
  container: {
    marginTop: moderateScale(70),
    width: '100%',
    alignItems: 'center',
  },
  img: {
    width: wp('32.35%'),
    height:hp('25.1%'),
    marginBottom: verticalScale(20),
    marginTop: verticalScale(127.5),
  },
  labelTxt: {
    color: '#333333',
    fontSize: moderateScale(15),
    padding: moderateScale(5),
    fontWeight: '400',
  },
  btn: {
    alignItems: 'center',
    borderRadius: moderateScale(15),
    padding: moderateScale(5),
    backgroundColor: '#66AE7B',
    width: wp('88%'),
    marginTop: verticalScale(280),
    margin: moderateScale(10),
  },
  btnTxt: {
    color: 'white',
    fontSize: moderateScale(16),
    padding: moderateScale(3),
  },
});
