import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from 'react-native';
import MapView, {Marker, Circle, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import LocationIcon from '../assets/images/LocationVevtor.png';
import UserLocation from '../assets/images/UserLocation.png';
import { SearchIcon } from '../assets/images';
import responsiveScale from '../utils/responsiveScale';

const {scale, verticalScale, moderateScale} = responsiveScale;

const apiKey='AIzaSyARLrUT_M6x5AZv6_s42bHR50dxwhpziyw';

const MapViewModal = ({slider, searchText, isClicked, setIsClicked}) => {
  const [location, setLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [address, setAddress] = useState(null);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const mapRef = useRef(null);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Konum İzni',
          message: 'Uygulama konum bilgilerinize erişmek istiyor.',
          buttonNeutral: 'Daha Sonra Sor',
          buttonNegative: 'İptal',
          buttonPositive: 'Tamam',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Konum izni verildi.');
        getCurrentLocation();
      } else {
        console.log('Konum izni reddedildi.');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(info => {
      const {latitude, longitude} = info.coords;
      const newLocation = {
        latitude,
        longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };
      console.log(info.coords)
      setLocation(newLocation);
      fetchRestaurants(latitude, longitude);
      fetchAddress(latitude, longitude);

      if (mapRef.current) {
        mapRef.current.animateToRegion(newLocation, 2000);
      }
    });
  };

  const handleGetLocationPress = () => {
    requestLocationPermission();
  };

  const fetchRestaurants = async (latitude, longitude) => {
    const radius = slider;
    const width = 600;
    const height = 600;
    const zoom = 10
    const URLfake = `https://maps.googleapis.com/maps/api/geocode/json?center=${latitude},${longitude}&zoom=${zoom}&size=${width}x${height}&key=${apiKey}
`

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&types=restaurant|cafe|food&key=${apiKey}`
      );

        if (!response.ok) {
          throw new Error('Failed to fetch restaurants');
      }

      const data = await response.json();
      console.log(`data=${data.result}`);
      setRestaurants(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAddress = async (latitude, longitude) => {
    try {

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
      )      


      if (!response.ok) {
        throw new Error('Failed to fetch address');
      }

      const data = await response.json();
      console.log(`data:${data}`);

      const {status, results} = data;
      console.log(`status:${status}`);


      if(status !== 'OK'){
        throw new Error(`API Error: ${status}`)
      }

      if (results && results.length > 0) {
        const {formatted_address} = results[0];
        console.log(`adress=${formatted_address}`)
        setAddress(formatted_address);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };
  const handleSearch = async (searchText) => {
    try {

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${searchText}&key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }

      const data = await response.json();
      const {results} = data;

      if (results && results.length > 0) {
        const {geometry} = results[0];
        const {location} = geometry;

        const newLocation = {
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        };

        setLocation(newLocation);
        fetchRestaurants(location.lat, location.lng);
        setAddress(results[0].formatted_address);

        if (mapRef.current) {
          mapRef.current.animateToRegion(newLocation, 1000);
        }
      }
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  useEffect(() => {
    handleGetLocationPress();
  }, [slider]);

  useEffect(() => {
    if(isClicked){
      requestLocationPermission();
      
      //we have to restart clicked to building reuseful component.
      setIsClicked(false);
    }
  }, [isClicked])
  
  useEffect(() => {
    if (searchText){
      handleSearch(searchText);
    }
  }, [searchText]);

  return (
    
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={styles.map}
        region={location ? location :{
          latitude: 39.9272,
          longitude: 32.8644,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {location && (
          <>
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Konumum"
              description="Buradasınız">
              <Image
                source={UserLocation}
                style={{width: scale(40), height: scale(40), resizeMode: 'contain'}}
              />
            </Marker>
            <Circle
              center={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              radius={slider}
              strokeWidth={3}
              strokeColor={'rgba(255, 255, 233, 0.2)'}
              lineDashPattern={[10, 5]}
              fillColor={'rgba(255, 255, 255, 0.6S)'}
            />
          </>
        )}

        {restaurants.map((restaurant, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: restaurant.geometry.location.lat,
              longitude: restaurant.geometry.location.lng,
            }}
            title={restaurant.name}
            description={restaurant.vicinity}>
            <Image
              source={UserLocation}
              style={{width: scale(24), height: scale(24), resizeMode: 'contain'}}
            />
          </Marker>
        ))}
      </MapView>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    left: moderateScale(175),
    top: verticalScale(-10),
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(50),
    position: 'relative',
    borderWidth: moderateScale(1),
    borderColor: '#333333',
    top: verticalScale(0),
    right: moderateScale(20),
    width: scale(36),
    height: scale(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonImage: {
    width: scale(24),
    height: scale(24),
  },
});

export default MapViewModal;
