import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  PixelRatio,
} from 'react-native';
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
      <View
        style={{
          backgroundColor: 'white',
          marginBottom: verticalScale(1),
          shadowColor: '#000',
          shadowOffset: {width: 0, height: scale(2)},
          shadowOpacity: 0.2,
          shadowRadius: moderateScale(1.41),
          elevation: 2,
        }}>
        <Text style={styles.title}>Ne Alabilirsin?</Text>
        <Text
          style={{
            color: 'rgba(51, 51, 51, 0.6)',
            fontWeight: '400',
            paddingHorizontal: moderateScale(20),
            marginTop: verticalScale(10),
            fontSize:moderateScale(11.25)
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
      <View style={[styles.label]}>
        <TouchableOpacity
          activeOpacity={0.2}
          onPress={toggleModal}
          style={{margin: moderateScale(7), flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: moderateScale(17),
              color: '#333333',
              fontWeight: '500',
              padding: moderateScale(5),
              marginStart: moderateScale(10),
              flex: 1,
            }}>
            Alerjen ve İçerikler
          </Text>
          <AntDesign
            name="questioncircle"
            size={scale(27)}
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
  main: {},
  title: {
    marginBottom: verticalScale(3),
    fontSize: moderateScale(18),
    fontWeight: '500',
    color: '#333333',
    paddingStart: moderateScale(20),
    paddingTop: verticalScale(15),
  },
  itemWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: verticalScale(42),
    paddingHorizontal: moderateScale(20),
    marginBottom: verticalScale(20),
    display: 'flex',
    gap: scale(7),
  },
  txt: {
    backgroundColor: '#66AE7B', // Assuming colors.greenColor
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(6),
    marginHorizontal: 0,
    borderRadius: moderateScale(20),
    color: 'white',
    fontSize: moderateScale(10),
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: moderateScale(5),
    backgroundColor: 'white',
    alignItems: 'center',
    marginBottom: verticalScale(1),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.2,
    shadowRadius: scale(1.41),
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
    borderRadius: moderateScale(20),
    paddingVertical: verticalScale(20),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: moderateScale(4),
    elevation: 5,
    width: '90%',
  },
  modalLine: {
    backgroundColor: '#66AE7B',
    height: scale(1),
    width: '100%',
    marginTop: verticalScale(40),
  },
  openButton: {
    paddingTop: verticalScale(10),
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  confirmTxt: {
    color: '#66AE7B', // Assuming colors.greenColor
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: verticalScale(5),
  },
  icons: {
    margin: scale(5),
  },
  modalTitle: {
    marginTop: verticalScale(30),
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#333333',
  },
  description: {
    color: '#333333',
    fontSize: moderateScale(12),
    textAlign: 'center',
    paddingHorizontal: moderateScale(20),
    marginTop: verticalScale(28),
    fontWeight: '400',
  },
});
