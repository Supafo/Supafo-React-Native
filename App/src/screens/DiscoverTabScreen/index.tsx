import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  Switch,
} from 'react-native';

import Input from '../../components/Input';
import {SearchIcon, filterIcon} from '../../assets/images';
import Screen from '../../components/Screen';
import {Card} from '../../components/Card';
import {CARDS_SWIPER_DATA} from '../../data/cards';

export default function HomeTabScreen() {
  const [activeTab, setActiveTab] = useState('liste');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={{margin: 10}}>
      <View className="w-[295px] flex flex-row h-[36px] rounded-lg mb-5 items-center justify-between ml-2.5 ">
        <Input
          className="p-[0px]"
          style={styles.input}
          heading=" "
          placeholder="Ara..."
          rounded
          icon={SearchIcon}></Input>
        <TouchableOpacity>
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
          data={CARDS_SWIPER_DATA}
          renderItem={({item}) => <Card {...item} />}
          scrollEnabled={true}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{height: 20}} />}
        />
      ) : (
        <Text>Harita içeriği burada gösterilir.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  filter: {
    width: 36,
    height: 36,
    top: 11,
    left: 10,
  },
  input: {
    width: 295,
    height: 36,
  },
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
});
