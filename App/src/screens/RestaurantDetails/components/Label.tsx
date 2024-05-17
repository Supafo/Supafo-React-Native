import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../theme/colors';
import {Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './style/label.style';

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
  return (
    <View style={styles.main}>
      <View style={[styles.wrapper, styles.shadow]}>
        <View style={{margin: 10}}>
          <Text
            style={{
              fontSize: 16,
              color: '#333333',
              fontWeight: '600',
              padding: 10,
              marginStart: 20,
              marginBottom: 10,
            }}>
            Başkaları ne diyor?
          </Text>
          <View style={[styles.rateWrapper]}>
            <View style={styles.row}>
              <Icon name={'star'} size={16} color={colors.greenColor} />
              <Icon name={'star'} size={16} color={colors.greenColor} />
              <Icon name={'star'} size={16} color={colors.greenColor} />
              <Icon name={'star'} size={16} color={colors.greenColor} />
              <Icon name={'star'} size={16} color={colors.greenColor} />
              <Text style={styles.wrapperTxt}>{rate} (500+)</Text>
            </View>
            <View style={[styles.line, {marginStart: 30, marginBottom: 5}]} />
          </View>
          <View style={styles.row}>
            <AntDesign
              name="clockcircleo"
              size={16}
              color={colors.greenColor}
            />
            <Text style={styles.wrapperTxt}>Hızlı Sipariş </Text>
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
          <View style={[styles.line, {width: '100%'}]} />
        </View>
        <Text style={styles.title}>Senin için ipucu</Text>
        <View style={styles.container}>
          <View>
            <Image
              source={require('../../../assets/images/gift-package.png')}
              style={styles.img}
            />
          </View>
          <View style={styles.itemWrapper}>
            <Text style={styles.labelTitle}>
              Sürpriz paketinden çıkabilecekler
            </Text>
            {data.map((item, index) => (
              <Text key={index} style={styles.txt}>
                {item}
              </Text>
            ))}
          </View>
        </View>
      </View>
      <View style={[styles.label, styles.shadow]}>
      <TouchableOpacity activeOpacity={0.2} onPress={toggleModal} style={{margin: 7, flexDirection: 'row', alignItems:'center'}}>
        <Text
          style={{
            fontSize: 17,
            color: '#333333',
            fontWeight: '500',
            padding: 6,
            marginStart: 15,
            flex: 1
          }}>
          Taşıma Şekli
        </Text>
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
