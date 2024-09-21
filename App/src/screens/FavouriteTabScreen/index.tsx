import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  TextInput,
  Modal,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Header from '../../components/Header';
import Card from '../../components/Card';
import filterIcon from '../../assets/images/filterIcon.png';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {colors} from '../../theme/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dropdown} from 'react-native-element-dropdown';
import {hourData} from './data/hour-data';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import firestore from '@react-native-firebase/firestore';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { SearchIcon } from '../../assets/images';
import ModalCloseGreen from '../../assets/images/bottombaricons/ModalCloseGreen.svg';
import Input from '../../components/Input';
import responsiveScale from '../../utils/responsiveScale';

const {scale, verticalScale, moderateScale} = responsiveScale;

export default function FavouriteTabScreen() {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dropdown, setDropdown] = useState('');
  const [dropdown2, setDropdown2] = useState('');

  const [isRefreshed, setIsRefreshed] = useState(false);
  const [items, setItems] = useState();

  const filterSheetRef = useRef<ActionSheetRef>(null);

  function showActionSheet() {
    filterSheetRef.current?.show();
  }

  const userId = useSelector((state: RootState) => state.setUserId.id);

  const getDocuments = async () => {
    if (!userId) {
      console.warn('User ID is not available yet');
      return;
    }

    try {
      {/*
        const response = await axios.get(`/api/favorites`); * */}
      const cartCollection = await firestore()
        .collection(userId)
        .doc('favorites')
        .collection('items')
        .get();
      const documents: any = [];

      cartCollection.docs.forEach(doc => {
        const data = doc.data();
        documents.push({id: doc.id, ...data});
      });
      //console.log("DaTA: ", documents);

      const allItems = documents.flatMap(doc => doc.items);
      setItems(documents);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  useEffect(() => {
    getDocuments();
  }, [items]);

  const renderItems = ({item}: {item: any}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('RestaurantDetail', {
            item: item,
          })
        }>
        <Card data={item} />
      </TouchableOpacity>
    );
  };

  const toggleModal = () => {
    setIsModalVisible(false);
  };

  const onRefresh = () => {
    setIsRefreshed(true);
    getDocuments();
    setTimeout(() => {
      setIsRefreshed(false);
    }, 1000);
  };

  const [isTodaySelected, setIsTodaySelected] = useState<boolean>(false);
  const [isTomorrowSelected, setIsTomorrowSelected] = useState<boolean>(false);

  return (
    <View style={{height: '100%', width: '100%', flex: 1}}>
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1, width: '100%'}}>
          <Header title="Favorilerim" noBackButton={true} />
          <View style={styles.inputContainer}>
            <View style={{flex:8,justifyContent:'center',paddingBottom:verticalScale(7.5),marginRight:moderateScale(5)}}>
              <Input
                isSearchBar={true}
                icon={SearchIcon}
                iconStyle={{width:moderateScale(20),height:verticalScale(20),marginStart: moderateScale(5),marginEnd: moderateScale(7.5)}}
                placeholder='Ara...'
                style={{width:'100%',alignItems:'center',justifyContent:'center',height:verticalScale(33),color:'black',}}
                placeholderTextColor={'gray'}
              />
            </View>
            <View style={{flex:1}}>
            <TouchableOpacity onPress={() => showActionSheet()}>
              <Image style={styles.filter} source={filterIcon} />
            </TouchableOpacity>
            </View>
          </View>

          <View>
            {items && items.length != 0 ? (
              <FlatList
                style={{marginTop: moderateScale(-22.5)}}
                data={items}
                scrollEnabled={false}
                renderItem={renderItems}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={isRefreshed}
                    onRefresh={onRefresh}
                  />
                }
                ItemSeparatorComponent={() => <View style={{height: verticalScale(10)}} />}
              />
            ) : (
              <View style={styles.main}>
                <Image
                  source={require('../../assets/images/bigicon.png')}
                  style={styles.logo}
                />
                <Text style={styles.txt}>
                  Favorileriniz ürün bulunmamaktadır
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      <ActionSheet
        indicatorStyle={{backgroundColor: '#fff'}}
        initialSnapIndex={0}
        containerStyle={{
          paddingTop: verticalScale(10),
          backgroundColor: '#fff',
        }}
        statusBarTranslucent
        closeOnPressBack
        animated={false}
        drawUnderStatusBar={true}
        gestureEnabled={true}
        headerAlwaysVisible={false}
        defaultOverlayOpacity={0.3}
        ref={filterSheetRef}>
        <View>
          <View>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtrele</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => filterSheetRef?.current?.hide()}>
                <ModalCloseGreen />
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              <View>
                <View style={styles.row}>
                  <Text style={styles.modalSectionTitle}>Günler</Text>
                </View>
                {/* <ListItem data={days} /> */}
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: verticalScale(17),
                    marginLeft: moderateScale(11),
                    paddingRight: moderateScale(10),
                  }}>
                  <Text
                    style={{
                      color: '#66AE7B',
                      fontWeight: '400',
                      fontSize: moderateScale(14),
                    }}>
                    Bugün
                  </Text>
                  <BouncyCheckbox
                    bounceEffectIn={1}
                    bounceEffect={0}
                    bounceVelocityIn={0}
                    bounceVelocityOut={0}
                    size={scale(24)}
                    innerIconStyle={{
                      borderRadius: moderateScale(4),
                      borderWidth: moderateScale(2),
                    }}
                    fillColor="#66AE7B"
                    unFillColor="#fff"
                    text=""
                    iconStyle={{borderColor: '#66AE7B', borderRadius: moderateScale(4)}}
                    textStyle={{fontFamily: 'JosefinSans-Regular'}}
                    isChecked={isTodaySelected}
                    onPress={(isChecked: boolean) => {
                      setIsTodaySelected(isChecked);
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: verticalScale(9),
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: moderateScale(11),
                    paddingRight: moderateScale(10),
                  }}>
                  <Text
                    style={{
                      color: '#66AE7B',
                      fontWeight: '400',
                      fontSize: moderateScale(14),
                    }}>
                    Yarın
                  </Text>
                  <BouncyCheckbox
                    bounceEffectIn={1}
                    bounceEffect={0}
                    bounceVelocityIn={0}
                    bounceVelocityOut={0}
                    size={scale(24)}
                    innerIconStyle={{
                      borderRadius: moderateScale(4),
                      borderWidth: moderateScale(2),
                    }}
                    fillColor="#66AE7B"
                    unFillColor="#fff"
                    text=""
                    isChecked={isTomorrowSelected}
                    iconStyle={{borderColor: '#66AE7B', borderRadius: moderateScale(4)}}
                    textStyle={{fontFamily: 'JosefinSans-Regular'}}
                    onPress={(isChecked: boolean) => {
                      setIsTomorrowSelected(isChecked);
                    }}
                  />
                </View>
              </View>
              <View style={{marginTop: verticalScale(28)}}>
                <View style={styles.row}>
                  <Text style={styles.modalSectionTitle}>Saat Aralığı</Text>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: verticalScale(20),
                    paddingRight: moderateScale(12),
                    marginRight: moderateScale(33),
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Dropdown
                      data={hourData}
                      style={[styles.dropdown, {marginRight: moderateScale(20)}]}
                      onConfirmSelectItem={(item: any) => setDropdown(item)}
                      labelField="value"
                      valueField="value"
                      value={dropdown}
                      placeholder={'Saat'}
                      itemTextStyle={styles.dropdownItemText}
                      itemContainerStyle={styles.dropdownItemContainer}
                      placeholderStyle={styles.dropdownPlaceholder}
                      selectedTextStyle={styles.dropdownSelectedText}
                      onChange={item => setDropdown(item.value)}
                      iconColor={colors.greenColor}
                    />
                    <Text style={{color: '#000000', fontWeight: '400'}}>
                      ile
                    </Text>
                    <Dropdown
                      data={hourData}
                      style={[
                        styles.dropdown,
                        {marginRight: moderateScale(40), marginLeft: moderateScale(20)},
                      ]}
                      onConfirmSelectItem={(item: any) => setDropdown(item)}
                      labelField="value"
                      valueField="value"
                      value={dropdown2}
                      placeholder={'Saat'}
                      itemTextStyle={styles.dropdownItemText}
                      itemContainerStyle={styles.dropdownItemContainer}
                      placeholderStyle={styles.dropdownPlaceholder}
                      selectedTextStyle={styles.dropdownSelectedText}
                      onChange={item => setDropdown2(item.value)}
                      iconColor={colors.greenColor}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors.greenColor,
                        borderRadius: moderateScale(100),
                        marginEnd: moderateScale(10),
                      }}>
                      <MaterialCommunityIcons
                        name="plus"
                        size={scale(23)}
                        color={'white'}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        borderRadius: moderateScale(100),
                      }}>
                      <MaterialCommunityIcons
                        name="minus"
                        size={scale(23)}
                        style={{
                          backgroundColor: 'rgba(102, 174, 123, 0.6)',
                          borderRadius: moderateScale(50),
                        }}
                        color={'white'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{marginTop: verticalScale(29)}}>
                <View style={styles.row}>
                  <Text style={styles.modalSectionTitle}>
                    Sürpriz Paket Türü
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: verticalScale(15),
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: moderateScale(11),
                    paddingRight: moderateScale(10),
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      fontWeight: '400',
                      fontSize: moderateScale(14),
                    }}>
                    Yeni Paketler
                  </Text>
                  <BouncyCheckbox
                    bounceEffectIn={1}
                    bounceEffect={0}
                    bounceVelocityIn={0}
                    bounceVelocityOut={0}
                    size={scale(24)}
                    innerIconStyle={{
                      borderRadius: moderateScale(4),
                      borderWidth: moderateScale(2),
                    }}
                    fillColor="#66AE7B"
                    unFillColor="#fff"
                    text=""
                    isChecked={isTomorrowSelected}
                    iconStyle={{borderColor: '#66AE7B', borderRadius: moderateScale(4)}}
                    textStyle={{fontFamily: 'JosefinSans-Regular'}}
                    onPress={(isChecked: boolean) => {
                      setIsTomorrowSelected(isChecked);
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: verticalScale(9),
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: moderateScale(11),
                    paddingRight: moderateScale(10),
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      fontWeight: '400',
                      fontSize: moderateScale(14),
                    }}>
                    Yemekler
                  </Text>
                  <BouncyCheckbox
                    bounceEffectIn={1}
                    bounceEffect={0}
                    bounceVelocityIn={0}
                    bounceVelocityOut={0}
                    size={scale(24)}
                    innerIconStyle={{
                      borderRadius: moderateScale(4),
                      borderWidth: moderateScale(2),
                    }}
                    fillColor="#66AE7B"
                    unFillColor="#fff"
                    text=""
                    isChecked={isTomorrowSelected}
                    iconStyle={{borderColor: '#66AE7B', borderRadius: moderateScale(4)}}
                    textStyle={{fontFamily: 'JosefinSans-Regular'}}
                    onPress={(isChecked: boolean) => {
                      setIsTomorrowSelected(isChecked);
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: verticalScale(9),
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: moderateScale(11),
                    paddingRight: moderateScale(10),
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      fontWeight: '400',
                      fontSize: moderateScale(14),
                    }}>
                    Unlu Mamülleri
                  </Text>
                  <BouncyCheckbox
                    bounceEffectIn={1}
                    bounceEffect={0}
                    bounceVelocityIn={0}
                    bounceVelocityOut={0}
                    size={scale(24)}
                    innerIconStyle={{
                      borderRadius: moderateScale(4),
                      borderWidth: moderateScale(2),
                    }}
                    fillColor="#66AE7B"
                    unFillColor="#fff"
                    text=""
                    isChecked={isTomorrowSelected}
                    iconStyle={{borderColor: '#66AE7B', borderRadius: moderateScale(4)}}
                    textStyle={{fontFamily: 'JosefinSans-Regular'}}
                    onPress={(isChecked: boolean) => {
                      setIsTomorrowSelected(isChecked);
                    }}
                  />
                </View>
              </View>
              <View style={{marginTop: verticalScale(22)}}>
                <View style={styles.row}>
                  <Text style={styles.modalSectionTitle}>Diyet Tercihi</Text>
                </View>
                <View
                  style={{
                    marginTop: verticalScale(15),
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: moderateScale(11),
                    paddingRight: moderateScale(10),
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      fontWeight: '400',
                      fontSize: moderateScale(14),
                    }}>
                    Vejetaryen
                  </Text>
                  <BouncyCheckbox
                    bounceEffectIn={1}
                    bounceEffect={0}
                    bounceVelocityIn={0}
                    bounceVelocityOut={0}
                    size={scale(24)}
                    innerIconStyle={{
                      borderRadius: moderateScale(4),
                      borderWidth: moderateScale(2),
                    }}
                    fillColor="#66AE7B"
                    unFillColor="#fff"
                    text=""
                    isChecked={isTomorrowSelected}
                    iconStyle={{borderColor: '#66AE7B', borderRadius: moderateScale(4)}}
                    textStyle={{fontFamily: 'JosefinSans-Regular'}}
                    onPress={(isChecked: boolean) => {
                      setIsTomorrowSelected(isChecked);
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: verticalScale(9),
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: moderateScale(11),
                    paddingRight: moderateScale(10),
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      fontWeight: '400',
                      fontSize: moderateScale(14),
                    }}>
                    Vegan
                  </Text>
                  <BouncyCheckbox
                    bounceEffectIn={1}
                    bounceEffect={0}
                    bounceVelocityIn={0}
                    bounceVelocityOut={0}
                    size={scale(24)}
                    innerIconStyle={{
                      borderRadius: moderateScale(4),
                      borderWidth: moderateScale(2),
                    }}
                    fillColor="#66AE7B"
                    unFillColor="#fff"
                    text=""
                    isChecked={isTomorrowSelected}
                    iconStyle={{borderColor: '#66AE7B', borderRadius: moderateScale(4)}}
                    textStyle={{fontFamily: 'JosefinSans-Regular'}}
                    onPress={(isChecked: boolean) => {
                      setIsTomorrowSelected(isChecked);
                    }}
                  />
                </View>
              </View>
            </View>
            <View
              style={{paddingHorizontal: moderateScale(50), marginBottom: verticalScale(22.5), marginTop: verticalScale(20)}}>
              <TouchableOpacity
                onPress={() => filterSheetRef.current?.hide()}
                style={{
                  width: '100%',
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginTop: verticalScale(10),
                }}>
                <Text
                  style={{
                    fontSize: moderateScale(16),
                    color: 'white',
                    padding: moderateScale(10),
                    borderRadius: moderateScale(20),
                    backgroundColor: colors.greenColor,
                    width: '100%',
                    textAlign: 'center',
                  }}>
                  Sonuçları Göster
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ActionSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(22.5),
    marginHorizontal: scale(20),
    justifyContent: 'space-between',
    marginBottom: verticalScale(25),
  },
  filter: {
    width: scale(38),
    height: verticalScale(38),
    bottom: moderateScale(8),
  },
  input: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: moderateScale(20),
    paddingStart: moderateScale(40),
    padding: moderateScale(5),
    marginEnd: moderateScale(10),
    borderColor: '#D0D5DD',
    borderWidth: 1,
    fontSize: moderateScale(14),
    color: '#333333',
    width: '100%',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    paddingLeft: moderateScale(5),
    alignSelf: 'center',
    width: '90%',
    backgroundColor: 'white',
    borderRadius: moderateScale(10),
    padding: moderateScale(0),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: moderateScale(18),
    fontWeight: '500',
    marginBottom: verticalScale(10),
    color: '#333333',
  },
  closeButton: {
    position: 'relative',
    right: moderateScale(45),
  },
  modalCloseButton: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: colors.greenColor,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalSectionTitle: {
    fontSize: moderateScale(16),
    marginTop: moderateScale(10),
    color: colors.greenColor,
    fontWeight: '600',
  },
  dropdown: {
    borderColor: colors.greenColor,
    margin: 0,
    paddingLeft: moderateScale(0),
    paddingRight: moderateScale(2),
    borderRadius: moderateScale(15),
    width: '28%',
    borderWidth: 1,
  },
  dropdownItemText: {
    fontSize: moderateScale(15),
    color: '#000000',
    textAlign: 'center',
  },
  dropdownItemContainer: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  dropdownPlaceholder: {
    lineHeight: verticalScale(18),
    textAlign: 'center',
  },
  dropdownSelectedText: {
    textAlign: 'center',
    color: '#000000',
  },
  main: {
    margin: moderateScale(20),
    padding: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  txt: {
    fontSize: moderateScale(16),
    padding: moderateScale(20),
    letterSpacing: moderateScale(1),
    textAlign: 'center',
    color: '#333333',
    fontWeight: '600',
    width: '100%',
    marginTop: moderateScale(50),
  },
  logo: {
    width: scale(120),
    height: verticalScale(160),
    right: moderateScale(7.5),
  },
});