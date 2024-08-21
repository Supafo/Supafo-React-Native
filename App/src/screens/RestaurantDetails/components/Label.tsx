import {
  Modal,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../theme/colors';
import {Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './style/label.style';
import FastOrder from '../../../assets/images/fastorder.svg';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {InfoGreen} from '../../../assets/images';
import Feather from 'react-native-vector-icons/Feather'

type Props = {
  rate: number;
};

const Label = ({rate}: Props) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const data = [
    'Yaprak Sarma',
    'Biber Dolma',
    'Enginar',
    'Hünkar Beğendi',
    'Karnıyarık',
  ];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  function formatRating(value: number): string {
    if (isNaN(value) || value < 0 || value > 5) {
      throw new Error('Invalid input: value must be a number between 0 and 5.');
    }
    let scaledValue: number;
    if (value <= 1) {
      scaledValue = value * 5;
    } else {
      scaledValue = value;
    }
    const formattedValue = scaledValue.toFixed(1);
    return `${formattedValue} / 5.0`;
  }

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
        <View
          style={{
            padding: moderateScale(10),
          }}>
          <Text
            style={{
              fontSize: moderateScale(16),
              color: '#333333',
              fontWeight: '500',
              margin: moderateScale(10),
              marginStart: moderateScale(20),
              marginBottom: 10,
              zIndex: 999,
            }}>
            Başkaları ne diyor?
          </Text>
          <View style={[styles.rateWrapper]}>
            <View style={[styles.row,{paddingRight:100}]}>
              <Icon name={'star'} size={scale(30)} color={colors.greenColor} style={{marginLeft:-2.5}}/>
              <Text
                style={{
                  color: '#000000',
                  fontSize: moderateScale(20),
                  marginLeft: moderateScale(5),
                }}>
                {rate ? formatRating(rate) : '/ 10.0'}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <FastOrder />
            <Text style={styles.wrapperTxt}>Sipariş Hızı </Text>
          </View>
          <View style={styles.row}>
            <Icon
              name="silverware-fork-knife"
              size={moderateScale(18)}
              color={colors.greenColor}
            />
            <Text style={[styles.wrapperTxt,{marginStart:7.5}]}>Lezzetli Yemek</Text>
          </View>
          <View style={styles.row}>
            <AntDesign name="smileo" size={scale(18)} color={colors.greenColor} />
            <Text style={styles.wrapperTxt}>Güler Yüzlü Ekip</Text>
          </View>
          <View>
            <Text
              style={{
                color: colors.greenColor,
                fontSize: moderateScale(11),
                textAlign: 'center',
                padding: moderateScale(15),
              }}>
              Satıcının son 6 aydaki 196 derecelendirmeye dayanmaktadır.
            </Text>
          </View>
          <View style={[styles.line]} />
        </View>
        <View>
          <View style={{margin: moderateScale(10)}}>
            <Text
              style={{
                fontSize: moderateScale(15),
                color: '#333333',
                fontWeight: '500',
                padding: moderateScale(5),
                marginStart: moderateScale(15),
              }}>
              Saklama İpucu
            </Text>
            <View style={[styles.row, {paddingVertical: verticalScale(10),marginStart:moderateScale(22.5)}]}>
            <View>
              <Feather
                name="info"
                size={moderateScale(22.5)}
                color={colors.greenColor}
                style={{marginBottom:verticalScale(10)}}
              />
            </View>
              <Text
                style={{
                  paddingHorizontal: moderateScale(10),
                  fontSize: moderateScale(12),
                  lineHeight: scale(20),
                  color: '#333333',
                  marginBottom: verticalScale(10),
                  marginStart: moderateScale(4)
                }}>
                Yiyecekleri doğru sıcaklıkta saklamak, etiketlemek ve
                tarihlemek, gıda güvenliğini sağlamak ve israfı azaltmak için
                önemlidir.
              </Text>
            </View>
          </View>
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
              marginStart: moderateScale(15),
              flex: 1,
            }}>
            Taşıma Şekli
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
            <View style={{width: '100%', alignItems: 'flex-end'}}>
              <Text style={styles.modalTitle}>İlk Alışverişe Özel</Text>
            </View>
            <Image
              source={require('../../../assets/images/tasima-sekli-png.png')}
              style={{width: scale(100), height: scale(100), marginBottom: verticalScale(10)}}
            />
            <Text style={styles.modalText}>Senin için Hediyemiz</Text>
            <Text style={styles.description}>
              Mağaza, yiyecekleriniz için ambalaj sağlayacaktır. Bu ürünleri
              taşıman ve diğer alışverişlerinde de kullanabilmen için{' '}
              {'\n\nSupafo bez çanta HEDİYE!'}
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

export default Label;
