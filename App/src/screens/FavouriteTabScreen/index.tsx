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
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Card from '../../components/Card';
import filterIcon from '../../assets/images/filterIcon.png';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {colors} from '../../theme/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ListItem from './components/ListItem';
import {days} from './data/days';
import {packageType} from './data/package-type';
import {diet} from './data/diet';
import {Dropdown} from 'react-native-element-dropdown';
import {hourData} from './data/hour-data';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import firestore from '@react-native-firebase/firestore';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import SearchIcon from '../../assets/images/bottombaricons/SearchIcon.svg';
import {moderateScale} from 'react-native-size-matters';
import ModalCloseGreen from '../../assets/images/bottombaricons/ModalCloseGreen.svg';

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
        <Card
          url={item.url}
          count={item.count}
          distance={item.distance}
          price={item.price}
          time={item.time}
          favoriteScreen={true}
          discountPrice={item.discountPrice}
        />
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
          <Header title="Favorilerim" noBackButton={false} />
          <View style={styles.inputContainer}>
            <SearchIcon />
            <TextInput style={styles.input} placeholder="Ara..." />
            <TouchableOpacity onPress={() => showActionSheet()}>
              <Image style={styles.filter} source={filterIcon} />
            </TouchableOpacity>
          </View>

          <View>
            {
              items && items.length != 0 
              ?
              <FlatList
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
              ItemSeparatorComponent={() => <View style={{height: 10}} />}
            />
            :
            <View style={styles.main}>
              <Image
                source={require('../../assets/images/bigicon.png')}
                style={styles.logo}
              />
              <Text style={styles.txt}>Favorileriniz ürün bulunmamaktadır</Text>
            </View>
            }

            {/* <Modal
              animationType="slide"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={toggleModal}>
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Filtreler</Text>
                    <TouchableOpacity onPress={toggleModal}>
                      <Text style={styles.modalCloseButton}>×</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <View style={styles.row}>
                      <Text style={styles.modalSectionTitle}>Günler</Text>
                    </View>
                    <ListItem data={days} />
                  </View>
                  <View>
                    <View style={styles.row}>
                      <Text style={styles.modalSectionTitle}>Saat Aralığı</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        borderColor: 'red',
                        borderWidth: 1,
                        width: '100%',
                      }}>
                      <View style={{marginRight: 20}}></View>
                      <Dropdown
                        data={hourData}
                        style={styles.dropdown}
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
                      <Text
                        style={{
                          color: '#000000',
                        }}>
                        ile
                      </Text>
                      <Dropdown
                        data={hourData}
                        style={styles.dropdown}
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
                      <TouchableOpacity
                        style={{
                          backgroundColor: colors.greenColor,
                          borderRadius: 100,
                          marginEnd: 10,
                        }}>
                        <MaterialCommunityIcons
                          name="trash-can"
                          size={23}
                          color={'white'}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          backgroundColor: colors.greenColor,
                          borderRadius: 100,
                        }}>
                        <MaterialCommunityIcons
                          name="plus"
                          size={23}
                          color={'white'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View>
                    <View style={styles.row}>
                      <Text style={styles.modalSectionTitle}>
                        Sürpriz Paket Türü
                      </Text>
                    </View>
                    <ListItem data={packageType} />
                  </View>
                  <View>
                    <View style={styles.row}>
                      <Text style={styles.modalSectionTitle}>
                        Diyet Tercih Başlığı
                      </Text>
                    </View>
                    <ListItem data={diet} />
                  </View>
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'white',
                        padding: 10,
                        borderRadius: 20,
                        backgroundColor: colors.greenColor,
                        width: '80%',
                        textAlign: 'center',
                      }}>
                      Sonuçları Göster
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal> */}
          </View>
        </ScrollView>
      </View>
      <ActionSheet
        indicatorStyle={{backgroundColor: '#fff'}}
        initialSnapIndex={0}
        containerStyle={{
          paddingTop: 10,
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
                    marginTop: 17,
                    marginLeft: 11,
                    paddingRight: 33,
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
                    size={24}
                    innerIconStyle={{
                      borderRadius: 4,
                      borderWidth: 2,
                    }}
                    fillColor="#66AE7B"
                    unFillColor="#fff"
                    text=""
                    iconStyle={{borderColor: '#66AE7B', borderRadius: 4}}
                    textStyle={{fontFamily: 'JosefinSans-Regular'}}
                    isChecked={isTodaySelected}
                    onPress={(isChecked: boolean) => {
                      setIsTodaySelected(isChecked);
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: 9,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: 11,
                    paddingRight: 33,
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
                    size={24}
                    innerIconStyle={{
                      borderRadius: 4,
                      borderWidth: 2,
                    }}
                    fillColor="#66AE7B"
                    unFillColor="#fff"
                    text=""
                    isChecked={isTomorrowSelected}
                    iconStyle={{borderColor: '#66AE7B', borderRadius: 4}}
                    textStyle={{fontFamily: 'JosefinSans-Regular'}}
                    onPress={(isChecked: boolean) => {
                      setIsTomorrowSelected(isChecked);
                    }}
                  />
                </View>
              </View>
              <View style={{marginTop: 28}}>
                <View style={styles.row}>
                  <Text style={styles.modalSectionTitle}>Saat Aralığı</Text>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20,
                    paddingRight: moderateScale(12),
                    marginRight: 33,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Dropdown
                      data={hourData}
                      style={[styles.dropdown, {marginRight: 20}]}
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
                        {marginRight: 40, marginLeft: 20},
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
                        borderRadius: 100,
                        marginEnd: 10,
                      }}>
                      <MaterialCommunityIcons
                        name="plus"
                        size={23}
                        color={'white'}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        borderRadius: 100,
                      }}>
                      <MaterialCommunityIcons
                        name="minus"
                        size={23}
                        style={{
                          backgroundColor: 'rgba(102, 174, 123, 0.6)',
                          borderRadius: 50,
                        }}
                        color={'white'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{marginTop: 29}}>
                <View style={styles.row}>
                  <Text style={styles.modalSectionTitle}>
                    Sürpriz Paket Türü
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 15,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: 11,
                    paddingRight: 33,
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
                    size={24}
                    innerIconStyle={{
                      borderRadius: 4,
                      borderWidth: 2,
                    }}
                    fillColor="#66AE7B"
                    unFillColor="#fff"
                    text=""
                    isChecked={isTomorrowSelected}
                    iconStyle={{borderColor: '#66AE7B', borderRadius: 4}}
                    textStyle={{fontFamily: 'JosefinSans-Regular'}}
                    onPress={(isChecked: boolean) => {
                      setIsTomorrowSelected(isChecked);
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: 9,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: 11,
                    paddingRight: 33,
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
                    size={24}
                    innerIconStyle={{
                      borderRadius: 4,
                      borderWidth: 2,
                    }}
                    fillColor="#66AE7B"
                    unFillColor="#fff"
                    text=""
                    isChecked={isTomorrowSelected}
                    iconStyle={{borderColor: '#66AE7B', borderRadius: 4}}
                    textStyle={{fontFamily: 'JosefinSans-Regular'}}
                    onPress={(isChecked: boolean) => {
                      setIsTomorrowSelected(isChecked);
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: 9,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: 11,
                    paddingRight: 33,
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
                    size={24}
                    innerIconStyle={{
                      borderRadius: 4,
                      borderWidth: 2,
                    }}
                    fillColor="#66AE7B"
                    unFillColor="#fff"
                    text=""
                    isChecked={isTomorrowSelected}
                    iconStyle={{borderColor: '#66AE7B', borderRadius: 4}}
                    textStyle={{fontFamily: 'JosefinSans-Regular'}}
                    onPress={(isChecked: boolean) => {
                      setIsTomorrowSelected(isChecked);
                    }}
                  />
                </View>
              </View>
              <View style={{marginTop: 22}}>
                <View style={styles.row}>
                  <Text style={styles.modalSectionTitle}>Diyet Tercihi</Text>
                </View>
                <View
                  style={{
                    marginTop: 15,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: 11,
                    paddingRight: 33,
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
                    size={24}
                    innerIconStyle={{
                      borderRadius: 4,
                      borderWidth: 2,
                    }}
                    fillColor="#66AE7B"
                    unFillColor="#fff"
                    text=""
                    isChecked={isTomorrowSelected}
                    iconStyle={{borderColor: '#66AE7B', borderRadius: 4}}
                    textStyle={{fontFamily: 'JosefinSans-Regular'}}
                    onPress={(isChecked: boolean) => {
                      setIsTomorrowSelected(isChecked);
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: 9,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: 11,
                    paddingRight: 33,
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
                    size={24}
                    innerIconStyle={{
                      borderRadius: 4,
                      borderWidth: 2,
                    }}
                    fillColor="#66AE7B"
                    unFillColor="#fff"
                    text=""
                    isChecked={isTomorrowSelected}
                    iconStyle={{borderColor: '#66AE7B', borderRadius: 4}}
                    textStyle={{fontFamily: 'JosefinSans-Regular'}}
                    onPress={(isChecked: boolean) => {
                      setIsTomorrowSelected(isChecked);
                    }}
                  />
                </View>
              </View>
            </View>
            <View
              style={{paddingHorizontal: 50, marginBottom: 20, marginTop: 24}}>
              <TouchableOpacity
                onPress={() => filterSheetRef.current?.hide()}
                style={{
                  width: '100%',
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'white',
                    padding: 10,
                    borderRadius: 20,
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
    marginTop: 10,
    marginHorizontal: 20,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filter: {
    width: 36,
    height: 36,
  },
  input: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingStart: 15,
    padding: 5,
    marginEnd: 10,
    borderColor: 'lightgray',
    borderWidth: 0,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    paddingLeft: 20,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 0,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: moderateScale(18), // Adjust as needed
    fontWeight: '500',
    color: '#333333',
  },
  closeButton: {
    position: 'absolute',
    right: 45,
  },
  modalCloseButton: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.greenColor,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  modalSectionTitle: {
    fontSize: 16,
    color: colors.greenColor,
    fontWeight: '600',
  },
  dropdown: {
    borderColor: colors.greenColor,
    margin: 0,
    paddingLeft: 0,
    paddingRight: moderateScale(2),
    borderRadius: 15,
    width: '28%',
    borderWidth: 1,
    // height: 40,
  },
  dropdownItemText: {
    fontSize: 15,
    color: '#000000',
    textAlign: 'center',
  },
  dropdownItemContainer: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  dropdownPlaceholder: {
    lineHeight: moderateScale(18),
    textAlign: 'center',
  },
  dropdownSelectedText: {
    textAlign: 'center',
    color: '#000000',
  },
  main: {
    margin: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  txt: {
    fontSize: moderateScale(16),
    padding: 20,
    letterSpacing: 1,
    textAlign: 'center',
    color: '#333333',
    fontWeight: '600',
    width: '100%',
    marginTop: 50
  },
  logo: {
    width: moderateScale(153),
    height: moderateScale(204),
  },
});
