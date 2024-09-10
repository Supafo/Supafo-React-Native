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
import responsiveScale from '../../../utils/responsiveScale';

const {scale, verticalScale, moderateScale} = responsiveScale;
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
          style={{margin: moderateScale(7), flexDirection: 'row', alignItems: 'center',}}>
          <Text
            style={{
              fontSize: moderateScale(16),
              color: '#333333',
              fontWeight: '500',
              padding: moderateScale(0),
              marginStart: moderateScale(10),
              flex: 1,
            }}>
            Alerjen ve İçerikler
          </Text>
          <AntDesign
            style={{marginEnd: moderateScale(12.5)}}
            name="questioncircle"
            size={scale(23)}
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
    marginBottom: moderateScale(0),
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: '#333333',
    paddingStart: moderateScale(20),
    paddingTop: verticalScale(15),
  },
  itemWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: moderateScale(37.5),
    paddingHorizontal: moderateScale(20),
    marginBottom: moderateScale(20),
    display: 'flex',
    gap: scale(7),
  },
  txt: {
    backgroundColor: '#66AE7B', // Assuming colors.greenColor
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(4),
    marginHorizontal: 0,
    borderRadius: moderateScale(20),
    color: 'white',
    fontSize: moderateScale(9),
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: moderateScale(5),
    backgroundColor: 'white',
    alignItems: 'center',
    marginBottom: moderateScale(1),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.2,
    shadowRadius: scale(1.41),
    elevation: 2,
    height: verticalScale(44),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: moderateScale(20),
    paddingVertical: moderateScale(16.5),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    marginBottom: moderateScale(20),
    shadowOpacity: 0.25,
    shadowRadius: moderateScale(4),
    elevation: 5,
    width: '90%',
  },
  modalLine: {
    backgroundColor: '#66AE7B',
    height: scale(1),
    width: '100%',
    marginTop: moderateScale(30),
  },
  openButton: {
    paddingTop: moderateScale(15),
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  confirmTxt: {
    color: '#66AE7B', // Assuming colors.greenColor
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: moderateScale(11),
  },
  icons: {
    margin: moderateScale(5),
    height:verticalScale(27.5),
  },
  modalTitle: {
    marginTop: moderateScale(25),
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: '#333333',
  },
  description: {
    color: '#333333',
    fontSize: moderateScale(10),
    textAlign: 'center',
    paddingHorizontal: moderateScale(45),
    marginTop: moderateScale(25),
    fontWeight: '400',
  },
});
