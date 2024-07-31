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
import {moderateScale, scale} from 'react-native-size-matters';
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
          marginBottom: 1,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 2,
        }}>
        <View
          style={{
            padding: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: '#333333',
              fontWeight: '600',
              margin: 10,
              marginStart: 20,
              marginBottom: 10,
              zIndex: 999,
            }}>
            Başkaları ne diyor?
          </Text>
          <View style={[styles.rateWrapper]}>
            <View style={styles.row}>
              <Icon name={'star'} size={23} color={colors.greenColor} />
              <Text
                style={{
                  color: '#000000',
                  fontSize: scale(14),
                  marginLeft: scale(5),
                }}>
                {rate ? formatRating(rate) : '/ 5.0'}
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
              size={16}
              color={colors.greenColor}
            />
            <Text style={styles.wrapperTxt}>Lezzetli Yemek</Text>
          </View>
          <View style={styles.row}>
            <AntDesign name="smileo" size={18} color={colors.greenColor} />
            <Text style={styles.wrapperTxt}>Güler Yüzlü Ekip</Text>
          </View>
          <View>
            <Text
              style={{
                color: colors.greenColor,
                fontSize: 11,
                textAlign: 'center',
                padding: 15,
              }}>
              Satıcının son 6 aydaki 196 derecelendirmeye dayanmaktadır.
            </Text>
          </View>
          <View style={[styles.line]} />
        </View>
        <View>
          <View style={{margin: 10}}>
            <Text
              style={{
                fontSize: scale(14),
                color: '#333333',
                fontWeight: '600',
                padding: 5,
                marginStart: 20,
              }}>
              Saklama İpucu
            </Text>
            <View style={[styles.row, {paddingVertical: 10}]}>
            <View>
              <Feather
                name="info"
                size={moderateScale(15)}
                color={colors.greenColor}
              />
            </View>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: scale(12),
                  lineHeight: 20,
                  color: '#333333',
                  marginBottom: scale(10),
                  marginStart: scale(4)
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
            Taşıma Şekli
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
            <View style={{width: '100%', alignItems: 'flex-end'}}>
              <Text style={styles.modalTitle}>İlk Alışverişe Özel</Text>
            </View>
            <Image
              source={require('../../../assets/images/tasima-sekli-png.png')}
              style={{width: 100, height: 100, marginBottom: 10}}
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
