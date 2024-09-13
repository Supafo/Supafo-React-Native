import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Header from '../../../components/Header';
import { QuestionMark } from '../../../assets/images';
import { colors } from '../../../theme/colors';
import { Picker } from '@react-native-picker/picker';

import { scale, moderateScale, verticalScale } from 'react-native-size-matters';



type Props = {
  route: any
};

const ContactUs = ({ route }: Props) => {
  const item = route.params;

  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();


  const handleSend = () => {
    toggleModalVisibility()
    setMessage("")
    setSelectedTopic("")
  };

  function toggleModalVisibility() {
    setIsModalVisible(!isModalVisible)
  }

  return (
    <View style={styles.main}>
      <Header title={'Bizimle İletişime Geçin'} />
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Bir sorun var mı?</Text>
            <Text style={styles.text}>Yardım merkezimizde sorunuzun cevabını bulamadıysanız bizimle iletişime geçmek için aşağıdaki formu doldurun.</Text>
          </View>
          <View>
            <QuestionMark />
          </View>
        </View>
        <View style={{ width: '100%' }}>
          <Text
            style={styles.subtitle}>
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
          <View style={styles.messageContainer}>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: 'left',
                  padding: 10,
                  fontWeight: '500',
                }}>
                Mesaj
              </Text>
              <View>
                <TextInput
                  style={styles.messageInput}
                  placeholder="Mesajınızı buraya giriniz."
                  value={message}
                  onChangeText={setMessage}
                  multiline
                  placeholderTextColor={'#636363'}
                  numberOfLines={5}
                  maxLength={200}
                />
              </View>
            </View>
            <View>
              <TouchableOpacity style={[styles.sendButton,]}
                onPress={() => {
                  if (message) {
                    handleSend();
                  }
                }}
                disabled={!message}
              >
                <Text
                  style={[styles.sendText, !message && styles.disabledButton]}
                >Gönder
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModalVisibility}>
        <TouchableWithoutFeedback onPress={toggleModalVisibility}>
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>
                  Mesajınız başarıyla gönderilmiştir.
                </Text>
                <View>
                  <TouchableOpacity
                    onPress={handleSend}
                  >
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(routes.ORDER_HELP_DETAIL as never, {
                      title: item.title,
                      description: item.description, headerTitle: item.headerTitle
                    })}
                  >
                    <Text 
                  style={[styles.sendText, styles.supportButton]}
                  >Anladım</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
  },
  wrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  sendButton: {
    width: '100%',
    alignItems: 'center',
  },
  sendText: {
    width: '100%',
    backgroundColor: colors.greenColor,
    textAlign: 'center',
    padding: scale(10),
    fontSize: moderateScale(17),
    color: 'white',
    borderRadius: 15,
  },
  container: {
    margin: scale(20),
    borderColor: '#66AE7B',
    borderRadius: 10,
    borderWidth: 1,
    padding: scale(20),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  messageContainer: {
    width: '100%',
    height: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
  },
  title: {
    fontSize: scale(17),
    fontWeight: '600',
    paddingBottom: 16,
  },
  pickerContainer: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderColor: '#D0D5DD',
    borderWidth: 1,
  },
  picker: {
    display: 'flex',
    flexDirection: 'column',
    color: '#636363',
  },
  text: {
    color: '#333333',
    fontWeight: '400',
    paddingBottom: 16,
  },
  messageInput: {
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 15,
    padding: 12,
    textAlignVertical: 'top',
    backgroundColor: '#FFFFFF',
  },
  subtitle: {
    fontSize: scale(16),
    marginStart: 20,
    textAlign: 'left',
    padding: scale(5),
    fontWeight: '500',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height:verticalScale(519),

  },
  modalView: {
    marginVertical: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    height: verticalScale(216),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  modalTitle: {
    padding: scale(20),
    fontSize: scale(12),
    fontWeight: '400',
    color: '#333333',
    fontFamily: 'inter',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: moderateScale(300),
    padding: scale(20),
    backgroundColor: 'white',
    borderRadius: 10,
  },
  disabledButton: {
    backgroundColor: colors.greenDisabledColor,
  },
  supportButton:{
    paddingTop:8,
    paddingBottom:8,
    paddingLeft:20,
    paddingRight:20
  }
});
