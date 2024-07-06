import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from 'react-native';
import MapView, {Marker, Circle} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import LocationIcon from '../assets/images/LocationVevtor.png';
import UserLocation from '../assets/images/UserLocation.png';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [address, setAddress] = useState(null);
  const mapRef = useRef(null);

  console.log('adress', address);

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

  const fetchRestaurants = async (latitude, longitude) => {
    const radius = 500;
    const apiKey = 'AIzaSyDFACpxzA4otZOP67QzG-dlN0kmXYHY8R0';

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=restaurant&key=${apiKey}`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch restaurants');
      }

      const data = await response.json();
      setRestaurants(data.results);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const fetchAddress = async (latitude, longitude) => {
    try {
      const apiKey = 'AIzaSyDFACpxzA4otZOP67QzG-dlN0kmXYHY8R0';

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch address');
      }
      const data = await response.json();
      const {results} = data;
      if (results.length > 0) {
        const {formatted_address} = results[0];
        setAddress(formatted_address);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  useEffect(() => {
    handleGetLocationPress();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 39.9272,
          longitude: 32.8644,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={location}>
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
                style={{width: 40, height: 40, resizeMode: 'contain'}}
              />
            </Marker>
            <Circle
              center={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              radius={500}
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
              style={{width: 24, height: 24, resizeMode: 'contain'}}
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
    borderRadius: 50,
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#333333',
    top: 330,
    right: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonImage: {
    width: 24,
    height: 24,
  },
});

export default MapScreen;
