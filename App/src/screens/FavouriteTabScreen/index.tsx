import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import Header from '../../components/Header';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Input from '../../components/Input';
import SearchIcon from '../../assets/images/SearchIcon.png';
import Card from '../../components/Card';
import filterIcon from '../../assets/images/filterIcon.png';
import {restaurants} from '../../data/onboarding';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

export default function FavouriteTabScreen() {
  const navigation = useNavigation();

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

  return (
    <SafeAreaProvider>
      <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1, width: '100%'}}>
          <Header title="Favorilerim" noBackButton={false} />
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Ara..." />
            <Image style={styles.filter} source={filterIcon} />
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
  },
});
