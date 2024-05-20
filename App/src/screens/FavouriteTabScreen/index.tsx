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
} from 'react-native';
import Header from '../../components/Header';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Card from '../../components/Card';
import filterIcon from '../../assets/images/filterIcon.png';
import {restaurants} from '../../data/onboarding';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {colors} from '../../theme/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ListItem from './components/ListItem';
import {days} from './data/days';
import {packageType} from './data/package-type';
import {diet} from './data/diet';
import { Dropdown } from 'react-native-element-dropdown';
import { hourData } from './data/hour-data';

export default function FavouriteTabScreen() {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const renderItems = ({item}: {item: any}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('RestaurantDetail', {
            title: 'Burger King',
            price: item.price,
            time: item.time,
            rate: item.rate,
            img: require('../../assets/images/CardBg.png'),
            discountPrice: 119.9,
            quantity: item.quantity,
          })
        }>
        <Card
          url={item.url}
          count={item.count}
          distance={item.distance}
          price={item.price}
          time={item.time}
          favoriteScreen={true}
        />
      </TouchableOpacity>
    );
  };

  const toggleModal = () => {
    setIsModalVisible(false);
  };
  
  //onPress={() => setIsModalVisible(true)}
  return (
    <SafeAreaProvider>
      <View style={{flex: 1, width: '100%', alignItems: 'center', backgroundColor:'white'}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1, width: '100%'}}>
          <Header title="Favorilerim" noBackButton={false} />
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Ara..." />
            <TouchableOpacity onPress={() => setIsModalVisible(true)}> 
              <Image style={styles.filter} source={filterIcon} />
            </TouchableOpacity>
          </View>

          <View>
            <FlatList
              data={restaurants}
              scrollEnabled={false}
              renderItem={renderItems}
              horizontal={false}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{height: 10}} />}
            />
            <Modal
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
                    <View style={[styles.row, styles.bottomLine]}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: colors.greenColor,
                          fontWeight: '600',
                        }}>
                        Günler
                      </Text>
                      <Icon
                        name="keyboard-arrow-up"
                        size={20}
                        color={colors.greenColor}
                      />
                    </View>
                    <ListItem data={days} />
                  </View>
                  <View>
                    <View style={[styles.row, styles.bottomLine]}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: colors.greenColor,
                          fontWeight: '600',
                        }}>
                        Saat Aralığı
                      </Text>
                      <Icon
                        name="keyboard-arrow-up"
                        size={20}
                        color={colors.greenColor}
                      />
                   </View>
                   
                  </View>
                  <View>
                    <View style={[styles.row, styles.bottomLine]}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: colors.greenColor,
                          fontWeight: '600',
                        }}>
                        Sürpriz Paket Türü
                      </Text>
                      <Icon
                        name="keyboard-arrow-up"
                        size={20}
                        color={colors.greenColor}
                      />
                    </View>
                    <ListItem data={packageType} />
                  </View>
                  <View>
                    <View style={[styles.row, styles.bottomLine]}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: colors.greenColor,
                          fontWeight: '600',
                        }}>
                        Diyet Tercih Başlığı
                      </Text>
                      <Icon
                        name="keyboard-arrow-up"
                        size={20}
                        color={colors.greenColor}
                      />
                    </View>
                    <ListItem data={diet} />
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
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
    borderWidth: 1
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    height: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
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
  bottomLine: {
    borderBottomColor: colors.greenColor,
    borderBottomWidth: 1.5,
    padding: 5,
  },
});
