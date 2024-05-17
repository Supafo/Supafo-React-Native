import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  Switch,
  TextInput,
} from 'react-native';

import Input from '../../components/Input';
import {SearchIcon, filterIcon} from '../../assets/images';
import Screen from '../../components/Screen';
import {Card} from '../../components/Card';
import {CARDS_SWIPER_DATA} from '../../data/cards';
import Header from '../../components/Header';

export default function HomeTabScreen() {
  const [activeTab, setActiveTab] = useState('liste');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View>
      <Header title={'Keşfet'} noBackButton={false} />
      <View style={styles.inputView}>
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
        <Text>Harita içeriği burada gösterilir.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputView: {
    margin: 10,
    justifyContent: 'center',
    flexDirection: 'row',
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
});
