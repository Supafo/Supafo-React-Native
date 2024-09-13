import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Text from '../../components/Text';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/routes';
import {Picker} from '@react-native-picker/picker';
import Header from '../../components/Header';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';

const CustomerServices = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSend = () => {
    Alert.alert('Mesajınız başarıyla gönderilmiştir');
  };

  return (
    <View style={styles.container}>
      <Header title="Müşteri Hizmetleri" />
      <View style={styles.content}>
        <View style={styles.row}>
          <View>
            <Text style={styles.title}>Bir sorun var mı?</Text>
            <Text style={styles.subtitle}>
              Yardım merkezimizde sorunuzun cevabını bulamadıysanız, bizimle
              iletişime geçmek için aşağıdaki formu doldurun.
            </Text>
          </View>
          <Image
            source={require('../../assets/images/question-human.png')}
            style={styles.image}
          />
        </View>
        <View style={{width: '100%'}}>
          <Text
            style={{
              fontSize: moderateScale(16),
              color: '#000000',
              marginStart: moderateScale(5),
              textAlign: 'left',
              padding: moderateScale(5),
              fontWeight: '500',
            }}>
            Bir konu seç
          </Text>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedTopic}
            style={styles.picker}
            onValueChange={(itemValue: string) => setSelectedTopic(itemValue)}>
            <Picker.Item label="Bir seçenek seçin..." value="" />
            <Picker.Item label="Genel bir sorum var" value="issue1" />
            <Picker.Item
              label="Uygulamada bir şey işe yaramadı"
              value="issue2"
            />
            <Picker.Item label="Uygulama için bir fikrim var" value="issue3" />
            <Picker.Item label="Diğer" value="other" />
          </Picker>
        </View>

        {selectedTopic && (
          <View style={{margin: moderateScale(20), width: '100%'}}>
            <Text
              style={{
                fontSize: moderateScale(16),
                color: '#000000',
                marginStart: moderateScale(5),

                textAlign: 'left',
                padding: moderateScale(5),
                fontWeight: '500',
              }}>
              Mesaj
            </Text>

            <View style={{width: '90%', height: '100%'}}>
              <TextInput
                style={styles.messageInput}
                placeholder="Mesajınızı buraya giriniz."
                value={message}
                onChangeText={setMessage}
                multiline
              />
            </View>
          </View>
        )}
      </View>
      <View style={{width: '100%', alignItems: 'center', marginBottom: 20}}>
        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>Gönder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    margin: moderateScale(10),
  },
  image: {
    width: scale(175),
    height: scale(175),
    marginBottom: verticalScale(20),
  },
  title: {
    fontSize: moderateScale(16),
    marginBottom: verticalScale(15),
    color: '#000000',
    marginStart: moderateScale(10),

  },
  subtitle: {
    fontSize: moderateScale(13),
    color: '#666666',
    textAlign: 'left',
    width: scale(150),
    marginStart: moderateScale(10),
  },
  pickerContainer: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(20),
    borderColor: '#D0D5DD',
    borderWidth: moderateScale(1),
  },
  picker: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#66AE7B',
    borderRadius: moderateScale(20),
    width: '80%',
    height: scale(40),
    margin: moderateScale(10),
    justifyContent:'center'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  messageInput: {
    borderWidth: moderateScale(1),
    borderColor: '#ccc',
    borderRadius: moderateScale(20),
    padding: moderateScale(12),
    textAlignVertical: 'top',
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '17%',
    left: '3%',
    margin: moderateScale(10),
  },
});

export default CustomerServices;
