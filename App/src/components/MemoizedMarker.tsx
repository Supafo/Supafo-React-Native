import React, { memo } from 'react';
import { Image } from 'react-native';
import responsiveScale from '../utils/responsiveScale';
import { Marker } from 'react-native-maps';
import UserLocation from '../assets/images/UserLocation.png'; 
import { MemoizedMarkerType } from './components.type';

const {scale, verticalScale, moderateScale} = responsiveScale;

const MemoizedMarker = memo(({ coordinate, title, description }:MemoizedMarkerType) => (
  <Marker coordinate={coordinate} title={title} description={description}>
    <Image
      source={UserLocation}
      style={{ width: scale(24), height: scale(24), resizeMode: 'contain' }}
    />
  </Marker>
));

export default MemoizedMarker;
