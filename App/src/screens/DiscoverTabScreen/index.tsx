import React, {useState, useEffect} from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {SearchIcon} from '../../assets/images';
import {Card} from '../../components/Card';
import {CARDS_SWIPER_DATA} from '../../data/cards';
import Header from '../../components/Header';
import MapScreen from '../../components/MapView';
import {getFirestore} from '@react-native-firebase/firestore';
import CardList from '../../components/CardList';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import filterIcon from '../../assets/images/filterIcon.png';

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

  console.log('items', cardItems);

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

  const renderItem = (item: any) => {
    return <CardList item={item} />;
  };

  const toggleDaySelection = (day) => {
    setSelectedDays(prevDays => 
      prevDays.includes(day) 
      ? prevDays.filter(d => d !== day) 
      : [...prevDays, day]
    );
  };

  return (
    <ScrollView>
      <View style={{backgroundColor: 'white'}}>
        <Header title={'Keşfet'} noBackButton={false} />
        <View style={styles.inputView}>
          <View style={{
            alignItems:'center',
            flex: 1
          }} >
            <TextInput placeholder="Ara..." style={styles.input} />
            <Image
              source={SearchIcon}
              style={{
                width: 18,
                height: 18,
                position: 'absolute',
                marginStart: 10,
                left: 0,
                top: 8,
              }}
            />
          </View>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <Image style={styles.filterIcon} source={filterIcon} />
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
            data={CARDS_SWIPER_DATA}
            renderItem={({item}) => <Card {...item} />}
            scrollEnabled={true}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
          />
        ) : (
          <View style={styles.mapsContainer}>
            <View style={styles.fullMapsContainer}>
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
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Gün Seçin</Text>
              {daysOfWeek.map(day => (
                <TouchableOpacity 
                  key={day} 
                  style={styles.dayButton}
                  onPress={() => toggleDaySelection(day)}
                >
                  <Text style={styles.dayButtonText}>{day}</Text>
                  <View style={[
                    styles.checkbox, 
                    selectedDays.includes(day) && styles.selectedCheckbox
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputView: {
    margin: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems:'center'
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
    width: '100%',
    height: 36,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    borderColor: '#D0D5DD',
    borderWidth: 1,
    paddingStart: 35,
  },
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
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
    borderRadius: 15,
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
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
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
});
