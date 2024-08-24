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
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const MapViewModal = ({slider}) => {
  const [location, setLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [address, setAddress] = useState(null);
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
        mapRef.current.animateToRegion(newLocation, 1000);
      }
    });
  };

  const handleGetLocationPress = () => {
    requestLocationPermission();
  };
  //AIzaSyARLrUT_M6x5AZv6_s42bHR50dxwhpziyw
  const fetchRestaurants = async (latitude, longitude) => {
    const radius = slider;
    const width = 600;
    const height = 600;
    const zoom = 10
    const apiKey = 'AIzaSyARLrUT_M6x5AZv6_s42bHR50dxwhpziyw'
    const URL = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${zoom}&size=${width}x${height}&key=${apiKey}
`

    try {
      const response = await fetch(URL);

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
      const apiKey = 'AIzaSyARLrUT_M6x5AZv6_s42bHR50dxwhpziyw';

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

  useEffect(() => {
    handleGetLocationPress();
  }, [slider]);

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
              strokeColor={'#66AE7B'}
              lineDashPattern={[10, 5]}
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

      <TouchableOpacity style={styles.button} onPress={handleGetLocationPress}>
        <Image style={styles.buttonImage} source={LocationIcon} />
      </TouchableOpacity>
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
  button: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(50),
    position: 'relative',
    borderWidth: moderateScale(1),
    borderColor: '#333333',
    top: verticalScale(400),
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
