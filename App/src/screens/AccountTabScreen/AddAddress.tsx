import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import routes, {RootStackParamList} from '../../navigation/routes';
import {StackNavigationProp} from '@react-navigation/stack';
import Header from '../../components/Header';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Appstyles from '../../style'

const AddAddress = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [neighborhood, setNeighborhood] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [addressTitle, setAddressTitle] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [addresses, setAddresses] = useState<
    Array<{
      country: string;
      city: string;
      district: string;
      neighborhood: string;
      postalCode: string;
      address: string;
      addressTitle: string;
    }>
  >([]); // Adresleri tutan dizi

  const handleSubmit = async () => {
    if (
      !country ||
      !city ||
      !district ||
      !neighborhood ||
      !postalCode ||
      !address ||
      !addressTitle
    ) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz.');
      return;
    }

    const newAddress = {
      country,
      city,
      district,
      neighborhood,
      postalCode,
      address: '', // addressi string olarak tanımladık
      addressTitle,
    };

    // Yeni adresi diziye ekle
    setAddresses([...addresses, newAddress]);
    // Formu sıfırla
    setCountry('');
    setCity('');
    setDistrict('');
    setNeighborhood('');
    setPostalCode('');
    setAddress('');
    setAddressTitle('');
    Alert.alert('Başarılı', 'Adres başarıyla eklendi.');
  };

  //   try {
  //     await db.collection('addresses').add(newAddress);
  //     Alert.alert('Başarılı', 'Adres başarıyla eklendi.');
  //     navigation.navigate('AddressesScreen'); // Adreslerim ekranına yönlendirme
  //   } catch (error) {
  //     console.error('Error adding address: ', error);
  //     Alert.alert('Hata', 'Adres eklenirken bir hata oluştu.');
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Adres Ekle" />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={Appstyles.text}>Ülke</Text>
        <Picker
          selectedValue={country}
          style={styles.picker}
          onValueChange={itemValue => setCountry(itemValue)}>
          <Picker.Item label="Ülke Seçiniz" value="" />
          <Picker.Item label="Türkiye" value="turkey" />
          <Picker.Item label="İngiltere" value="ingiltere" />
          <Picker.Item label="Amerika" value="amerika" />
          <Picker.Item label="Azerbaycan" value="azerbaycan" />
        </Picker>
        {!country && (
          <Text style={styles.warningText}>Ülke seçimi yapılmalıdır!</Text>
        )}
        <Text style={Appstyles.text}>İl</Text>
        <Picker
          selectedValue={city}
          style={styles.picker}
          onValueChange={itemValue => setCity(itemValue)}>
          <Picker.Item label="İl Seçiniz" value="" />
          <Picker.Item label="İstanbul" value="istanbul" />
          <Picker.Item label="Ankara" value="ankara" />
          <Picker.Item label="Adana" value="adana" />
          <Picker.Item label="İzmir" value="izmir" />
          <Picker.Item label="Trabzon" value="trabzon" />
        </Picker>
        {!city && (
          <Text style={styles.warningText}>İl seçimi yapılmalıdır!</Text>
        )}
        <Text style={Appstyles.text}>İlçe</Text>
        <Picker
          selectedValue={district}
          style={styles.picker}
          onValueChange={itemValue => setDistrict(itemValue)}>
          <Picker.Item label="İlçe Seçiniz" value="" />
          <Picker.Item label="Kadıköy" value="kadikoy" />
          <Picker.Item label="Beşiktaş" value="besiktas" />
          {/* Diğer ilçeler */}
        </Picker>
        {!district && (
          <Text style={styles.warningText}>İlçe seçimi yapılmalıdır!</Text>
        )}
        <Text style={Appstyles.text}>Mahalle</Text>
        <Picker
          selectedValue={neighborhood}
          style={styles.picker}
          onValueChange={itemValue => setNeighborhood(itemValue)}>
          <Picker.Item label="Mahalle Seçiniz" value="" />
          <Picker.Item label="Moda" value="moda" />
          <Picker.Item label="Etiler" value="etiler" />
          {/* Diğer mahalleler */}
        </Picker>
        {!neighborhood && (
          <Text style={styles.warningText}>Mahalle seçimi yapılmalıdır!</Text>
        )}
        <Text style={Appstyles.text}>Posta Kodu</Text>

        <TextInput
          style={styles.input}
          placeholder="Posta Kodunu Yazınız"
          value={postalCode}
          onChangeText={setPostalCode}
          keyboardType="numeric"
        />
        {!postalCode && (
          <Text style={styles.warningText}>Posta kodu boş bırakılamaz!</Text>
        )}
        <Text style={Appstyles.text}>Açık Adres</Text>

        <TextInput
          style={styles.input}
          placeholder="Açık Adresi Yazınız"
          value={address}
          onChangeText={setAddress}
        />
        {!address && (
          <Text style={styles.warningText}>Açık adres bırakılamaz!</Text>
        )}
        <Text style={Appstyles.text}>Adres Başlığı</Text>

        <TextInput
          style={styles.input}
          placeholder="Adres Başlığı Giriniz"
          value={addressTitle}
          onChangeText={setAddressTitle}
        />
        {!addressTitle && (
          <Text style={styles.warningText}>Adres başlığı boş bırakılamaz!</Text>
        )}
      </ScrollView>

      <View style={{width: '100%', alignItems: 'center', marginBottom: 10}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleSubmit(); // Formun gönderilmesi için
            navigation.navigate(routes.ADDRESS_INFO_SCREEN);
          }}>
          <Text style={styles.buttonText}>Devam Et</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    padding: moderateScale(20),
    height: verticalScale(700),
  },
  header: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  picker: {
    height: 20,
    backgroundColor: '#F5F5F5',
    marginBottom: 1,
    borderRadius: 20,
  },
  input: {
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 1,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
  },
  warningText: {
    color: 'red',
    marginTop: 5,
  },
});

export default AddAddress;
