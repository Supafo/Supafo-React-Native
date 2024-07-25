import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  Switch,
  TextInput,
  Button,
  ScrollView,
  Modal,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dropdown} from 'react-native-element-dropdown';
import {hourData} from '../../screens/FavouriteTabScreen/data/hour-data';
import {Card} from '../../components/Card';
import Header from '../../components/Header';
import MapScreen from '../../components/MapView';
import {getFirestore} from '@react-native-firebase/firestore';
import CardList from '../../components/CardList';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import filterIcon from '../../assets/images/filterIcon.png';
import {colors} from '../../theme/colors';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import SearchIcon from '../../assets/images/bottombaricons/SearchIcon.svg';
import ModalCloseGreen from '../../assets/images/bottombaricons/ModalCloseGreen.svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const daysOfWeek = [
  'Pazartesi',
  'Salı',
  'Çarşamba',
  'Perşembe',
  'Cuma',
  'Cumartesi',
  'Pazar',
];

export default function HomeTabScreen() {
  const [activeTab, setActiveTab] = useState('liste');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [cardItems, setCardItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);

  const [dropdown, setDropdown] = useState('');
  const [dropdown2, setDropdown2] = useState('');

  const filterSheetRef = useRef<ActionSheetRef>(null);

  const navigation = useNavigation();

  function showActionSheet() {
    filterSheetRef.current?.show();
  }

  const getItems = async () => {
    try {
      const cartCollection = await getFirestore()
        .collection('homeItems')
        .doc('homeList')
        .collection('items')
        .get();
      const documents: any = [];

      cartCollection.docs.forEach(doc => {
        const data = doc.data();
        documents.push({id: doc.id, ...data});
      });

      setCardItems(documents);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const fullHeight = useWindowDimensions().height;
  const renderItem = (item: any) => {
    return <CardList item={item} />;
  };

  const toggleDaySelection = day => {
    setSelectedDays(prevDays =>
      prevDays.includes(day)
        ? prevDays.filter(d => d !== day)
        : [...prevDays, day],
    );
  };

  const [isTodaySelected, setIsTodaySelected] = useState<boolean>(false);
  const [isTomorrowSelected, setIsTomorrowSelected] = useState<boolean>(false);

  return (
    <ScrollView style={{backgroundColor:'white', flex: 1}} >
      <View style={{backgroundColor: 'white'}}>
        <Header title={'Keşfet'} noBackButton={false} />
        <View style={styles.inputContainer}>
          <View style={{position:'absolute', left: scale(10), top:scale(10), zIndex:1}} > 
            <SearchIcon />
          </View>
          <TextInput style={styles.input} placeholder="Ara..." />
          <TouchableOpacity onPress={() => showActionSheet()}>
            <Image style={styles.filter} source={filterIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.tabContainer}>
          <View style={styles.tabsAndText}>
            <TouchableOpacity
              style={activeTab === 'liste' ? styles.activeTab : styles.tab}
              onPress={() => setActiveTab('liste')}>
              <Text
                style={
                  activeTab === 'liste' ? styles.activeTabText : styles.tabText
                }>
                Liste
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={activeTab === 'harita' ? styles.activeTab : styles.tab}
              onPress={() => setActiveTab('harita')}>
              <Text
                style={
                  activeTab === 'harita' ? styles.activeTabText : styles.tabText
                }>
                Harita
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Tükendi</Text>
            <Switch
              trackColor={{false: '#FF9200', true: '#FF9200'}}
              thumbColor={isEnabled ? '#FFFFFF' : '#FFFFFF'}
              ios_backgroundColor="#FFFFFF"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
        {activeTab === 'liste' ? (
          <FlatList
            data={cardItems}
            renderItem={({item}) => 
            
              <TouchableOpacity
              onPress={() =>
                navigation.navigate('RestaurantDetail', {
                  item: item
                })
              }>
                <Card data={item}  />
            </TouchableOpacity>
            }
            scrollEnabled={true}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
            style={{flex:1}}
          />
        ) : (
          <View style={styles.mapsContainer}>
            <View
              style={[styles.fullMapsContainer, {height: fullHeight * 0.6}]}>
              <MapScreen />
            </View>
            <View style={styles.fullCardContainer}>
              <FlatList
                data={cardItems}
                renderItem={renderItem}
                horizontal={true}
                contentContainerStyle={{gap: 10}}
              />
            </View>
          </View>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Gün Seçin</Text>
              {daysOfWeek.map(day => (
                <TouchableOpacity
                  key={day}
                  style={styles.dayButton}
                  onPress={() => toggleDaySelection(day)}>
                  <Text style={styles.dayButtonText}>{day}</Text>
                  <View
                    style={[
                      styles.checkbox,
                      selectedDays.includes(day) && styles.selectedCheckbox,
                    ]}>
                    {selectedDays.includes(day) && (
                      <Icon name="check" size={18} color="#fff" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
              <Button title="Kapat" onPress={() => setIsModalVisible(false)} />
            </View>
          </View>
        </Modal>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 20,
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  filter: {
    width: 36,
    height: 36,
  },
  inputView: {
    margin: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterIcon: {
    width: moderateScale(45),
    height: moderateScale(45),
  },
  mapsContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
  },
  fullMapsContainer: {
    flex: 1,
  },
  fullCardContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    padding: 15,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingStart: 40,
    padding: 5,
    marginEnd: 10,
    borderColor: '#D0D5DD',
    borderWidth: 1,
    fontSize: 14,
    color: '#333333',
    width:'100%',
  },
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 25,
  },
  tabsAndText: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  activeTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#66AE7B',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  tab: {
    borderRadius: 20,
    padding: 8,
    alignItems: 'center',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  tabText: {
    color: '#000000',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchText: {
    marginRight: 6,
    color: '#000000',
  },
  modalContainer: {
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

  dayButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    width: '100%',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#66AE7B',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCheckbox: {
    backgroundColor: '#66AE7B',
  },
  dayButtonText: {
    color: '#000',
  },
  selectedDayButtonText: {
    color: '#fff',
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
});
