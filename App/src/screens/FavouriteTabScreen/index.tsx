import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import Screen from '../../components/Screen';
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
    console.log(item);

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
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaProvider>
      <Screen>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header title="Favorilerim" noBackButton={true} />
          <View className="w-[295px] flex flex-row h-[36px] rounded-lg mb-5 items-center justify-between ml-2.5">
            <Input
              className="p-[0px]"
              style={styles.input}
              heading=" "
              placeholder="Ara..."
              rounded
              icon={SearchIcon}></Input>
            <Image style={styles.filter} source={filterIcon} />
          </View>

          <View>
            <FlatList
              data={restaurants}
              scrollEnabled={false}
              renderItem={renderItems}
              horizontal={false}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{height: 20}} />}
            />
          </View>
        </ScrollView>
      </Screen>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  filter: {
    width: 36,
    height: 36,
    top: 11,
    left: 20,
  },
  input: {
    width: 295,
    height: 36,
  },
});
