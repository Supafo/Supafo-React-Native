import {StyleSheet, Text, TouchableOpacity, View, Modal} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../theme/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Image} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const PackageInfo = () => {
  const packageInfo = ['Vejeteryan', 'Vegan', 'Glutensiz', 'Laktozsuz'];
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.main}>
      <View style={[styles.shadow, {backgroundColor: 'white'}]}>
        <Text style={styles.title}>Ne Alabilirsin?</Text>
        <Text
          style={{
            color: 'rgba(51, 51, 51, 0.6)',
            fontWeight: '400',
            paddingHorizontal: scale(33),
            marginTop: 10,
          }}>
          Burger King'den eşsiz lezzetlerle dolu bir Sürpriz Paketi kurtarın.
        </Text>
        <View style={styles.itemWrapper}>
          {packageInfo.map((item, index) => (
            <Text key={index} style={styles.txt}>
              {item}
            </Text>
          ))}
        </View>
      </View>
      <View style={[styles.label, styles.shadow]}>
        <TouchableOpacity
          activeOpacity={0.2}
          onPress={toggleModal}
          style={{margin: 7, flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 17,
              color: '#333333',
              fontWeight: '500',
              padding: 5,
              marginStart: 15,
              flex: 1,
            }}>
            Alerjen ve İçerikler
          </Text>
          <AntDesign
            name="questioncircle"
            size={27}
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
            <Image
              source={require('../../../assets/images/alerje-besin-iconlar.png')}
              style={styles.icons}
            />
            <Text style={styles.modalTitle}>Sağlığınız Bizim için Önemli</Text>
            <Text style={styles.description}>
              Sürpriz paketimizin içeriği her zaman gizemli olduğu için önceden
              belirtmek mümkün değildir. Mağazamız, özel bir seçki ile
              paketinizi dolduracaktır. Alerjenler veya belirli içeriklerle
              ilgili sorularınız varsa, lütfen mağazaya sorun veya ödeme
              sayfasında sipariş notu olarak belirtiniz.
            </Text>
            <View style={styles.modalLine} />
            <TouchableOpacity style={styles.openButton} onPress={toggleModal}>
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
    fontWeight: '500',
    color: '#333333',
    paddingStart: 30,
    paddingTop: 15,
  },
  itemWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 42,
    paddingHorizontal: scale(33),
    marginBottom: scale(20),
    display: 'flex',
    gap: scale(7),
  },
  txt: {
    backgroundColor: colors.greenColor,
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(6),
    marginHorizontal: 0,
    borderRadius: 20,
    color: 'white',
    fontSize: scale(8),
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    backgroundColor: 'white',
    marginTop: 10,
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0.5},
    shadowOpacity: 0.25,
    shadowRadius: 0, // Equivalent to Blur in the given spec
    elevation: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 20,
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
    backgroundColor: '#66AE7B',
    height: 1,
    width: '100%',
    marginTop: 40,
  },
  openButton: {
    paddingTop: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  confirmTxt: {
    color: colors.greenColor,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 5,
  },
  icons: {
    margin: 5,
  },
  modalTitle: {
    marginTop: 30,
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  description: {
    color: '#333333',
    fontSize: moderateScale(12),
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 28,
    fontWeight: '400',
  },
});
