import {StyleSheet, Text, TouchableOpacity, View, Modal} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../theme/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Image } from 'react-native';

const PackageInfo = () => {
  const packageInfo = ['Vejeteryan', 'Vegan', 'Glutensiz', 'Laktozsuz'];
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.main}>
      <View style={[styles.shadow, {backgroundColor: 'white'}]}>
        <Text style={styles.title}>Paket Özelliği</Text>
        <View style={styles.itemWrapper}>
          {packageInfo.map((item, index) => (
            <Text key={index} style={styles.txt}>
              {item}
            </Text>
          ))}
        </View>
      </View>
      <View style={[styles.label, styles.shadow]}>
        <Text
          style={{
            fontSize: 17,
            color: '#333333',
            fontWeight: '500',
            padding: 6,
          }}>
          Alerjen ve İçerikler
        </Text>
        <TouchableOpacity onPress={toggleModal} style={{margin: 7}}>
          <AntDesign
            name="questioncircle"
            size={20}
            color={colors.greenColor}
          />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={require("../../../assets/images/alerje-besin-iconlar.png")} style={styles.icons} />
            <Text style={styles.modalTitle} >Sağlığınız Bizim için Önemli</Text>
            <Text style={styles.description} >
            Sürpriz paketimizin içeriği her zaman gizemli olduğu için önceden belirtmek mümkün değildir. Mağazamız, özel bir seçki ile paketinizi dolduracaktır. Alerjenler veya belirli içeriklerle ilgili sorularınız varsa, lütfen mağazaya sorun veya ödeme sayfasında sipariş notu olarak belirtiniz.
            </Text>
            <View style={styles.modalLine} />
            <TouchableOpacity
              style={styles.openButton}
              onPress={toggleModal}>
              <Text style={styles.confirmTxt}>Anladım</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PackageInfo;

const styles = StyleSheet.create({
  main: {
    marginTop: 10,
  },
  title: {
    marginBottom: 3,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    paddingStart: 30,
    paddingTop: 15,
  },
  itemWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: 10,
  },
  txt: {
    backgroundColor: colors.greenColor,
    padding: 5,
    margin: 5,
    borderRadius: 20,
    color: 'white',
    fontSize: 13,
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    marginTop: 10,
    alignItems: 'center',
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  modalLine: {
    backgroundColor: '#D0D5DD',
    height: .6,
    width: '112%',
    padding: 1,
    marginTop: 20
  },
  openButton: {
    paddingTop: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  confirmTxt: {
    color: colors.greenColor,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 5
  },
  icons:{
    margin: 5
  },
  modalTitle:{
    padding: 20,
    fontSize: 14,
    fontWeight: '600',
    color:'#333333'
  },
  description:{
    color: '#333333',
    fontSize: 12,
    textAlign: 'center',
    padding: 10,    
  },
});
