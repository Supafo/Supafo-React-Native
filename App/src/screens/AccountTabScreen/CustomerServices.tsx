import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import Text from '../../components/Text';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import routes, {RootStackParamList} from '../../navigation/routes';
import { Picker } from '@react-native-picker/picker';
import Header from '../../components/Header';



const CustomerServices = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  
  const handleSend = () => {
    Alert.alert('Gönderildi!');
  };

  return (
    <View style={styles.container}>
      <Header title='Müşteri Hizmetleri'/>
      <View style={styles.content}>
        <View style={styles.row}>
            <View>
              <Text style={styles.title}>Bir sorun var mı?</Text>
              <Text style={styles.subtitle}>
                Yardım merkezimizde sorunuzun cevabını bulamadıysanız, bizimle iletişime geçmek için aşağıdaki formu doldurun.
             </Text>
            </View>
          <Image
          source={require('../../assets/images/question-human.png')}
          style={styles.image}
        />
          
        </View >
       <View style={{width:'100%'}}>
       <Text style={{fontSize: 16, color:'#000000', marginStart: 5, textAlign: 'left', padding: 5, fontWeight: '500'}}>Bir konu seç</Text>
       </View>
        <View style={styles.pickerContainer}>
        <Picker
            selectedValue={selectedTopic}
            style={styles.picker}
            onValueChange={(itemValue: string) => setSelectedTopic(itemValue)}
          >
            <Picker.Item label="Bir seçenek seçin..." value="" />
            <Picker.Item label="Genel bir sorum var" value="issue1" />
            <Picker.Item label="Uygulamada bir şey işe yaramadı" value="issue2" />
            <Picker.Item label="Uygulama için bir fikrim var" value="issue3" />
            <Picker.Item label="Diğer" value="other" />
          </Picker>
        </View>

        {selectedTopic && (
                     <View style={{margin: 20, width: '100%',}}>
                       <Text style={{fontSize: 16, color:'#000000', marginStart: 5, textAlign: 'left', padding: 5,fontWeight: '500'}}>Mesaj</Text>

                <View style={{ width: '90%', height:'100%'}}>
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
      <View style={{width:'100%', alignItems:'center', marginBottom: 20}}>
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
      backgroundColor: '#F5F5F5',
    },
    row:{
      flexDirection: 'row',
      alignItems:'center',
    },
    content: {
      flex: 1,
      alignItems: 'center',
      margin: 10
    },
    image: {
      width: 200,
      height: 200,
      marginBottom: 20,
    },
    title: {
      fontSize: 16,
      marginBottom: 15,
      color:'#000000',
      marginStart: 10
    },
    subtitle: {
      fontSize: 13,
      color: '#666666',
      textAlign: 'left',
      width: 170,
      marginStart: 10
    },
    pickerContainer: {
      width: '100%',
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      borderColor: '#D0D5DD',
      borderWidth: 1,
    },
    picker: {
      width: '100%',
      alignItems:'center',
      height:'7%'
    },
    button: {
      backgroundColor: '#66AE7B',
      borderRadius: 20,
      padding: 10,
      width: '80%',
      margin: 10,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    messageInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 15,
      padding: 12,
      textAlignVertical: 'top',
      backgroundColor:'#FFFFFF',
      width: '100%',
      height: '20%',
      left: '3%',
      margin: 10
    },
  });
  
  export default CustomerServices;