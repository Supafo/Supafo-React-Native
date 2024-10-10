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
import {getFirestore} from '@react-native-firebase/firestore';
import CardList from '../../components/CardList';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import filterIcon from '../../assets/images/filterIcon.png';
import {colors} from '../../theme/colors';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import ModalCloseGreen from '../../assets/images/bottombaricons/ModalCloseGreen.svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import Input from '../../components/Input';
import { SearchIcon } from '../../assets/images';
import MapViewModal from '../../components/MapViewModal';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import HeaderSection from '../DiscoverTabScreen/components/HeaderSection';
import TabMenu from './components/TabMenu';
import SwitchComponent from './components/SwitchComponent';
import ListView from './components/ListView';
import MapViewSection from './components/MapViewSection';
import DaySelectionModal from './components/DaySelectionModal';
import FilterModal from './components/FilterModal';

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
      {/*
        const response = await axios.get('/api/products');
        * */}
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

  return (
   
      <View style={{backgroundColor: 'white',flex:1}}>
        <View>
            <Header title={'Keşfet'} noBackButton={false} />
          </View>
        
          <View style={styles.fixedHeader}>

          <HeaderSection/>
          <View style={[{flexDirection:'row',justifyContent:'space-between',height: verticalScale(32)}]}>
             <TabMenu activeTab={activeTab} setActiveTab={setActiveTab}/>
          <SwitchComponent isEnabled={isEnabled} toggleSwitch={toggleSwitch}/>
          </View>
          </View>

         
          {activeTab === 'liste' ? (
             
            <ListView cardItems={cardItems} navigation={navigation}/> 
            
          ):(
            <MapViewSection cardItems={cardItems} fullHeight={fullHeight} activeTab={activeTab}/>
          )}

          <DaySelectionModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          daysOfWeek={daysOfWeek}
          selectedDays={selectedDays}
          toggleDaySelection={day =>
            setSelectedDays(prevDays =>
              prevDays.includes(day)
                ? prevDays.filter(d => d !== day)
                : [...prevDays, day]
              )
            }
          />

          <FilterModal filterSheetRef={filterSheetRef}  /> 
       
      </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Ensure the background is transparent to see the map
  },
  fixedHeader: {
    position: 'relative',
    top: verticalScale(0),
    left: 0,
    right: 0,
    marginBottom:verticalScale(0),
    height:hp('15%'),
    zIndex: 100, // Ensures header and other components are above the map
    paddingHorizontal: moderateScale(10),
    backfaceVisibility:'visible',
    backgroundColor:'white',
    
  },
});
