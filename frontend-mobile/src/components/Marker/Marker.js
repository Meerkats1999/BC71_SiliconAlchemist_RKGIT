import React from 'react';
import {Marker} from 'react-native-maps';
import BikeImg from '../../../assets/img/bike.png';
import CarImg from '../../../assets/img/car.png';
import BusImg from '../../../assets/img/bus.png';

const getImage = (type) => {
  switch (type) {
    case 'moto_motorcycle':
      return BikeImg;
    case 'veh_passenger':
      return CarImg;
    case 'bus_bus':
      return BusImg;
    default:
      return BikeImg;
  }
};

export default React.memo((props) => {
  const {lat, lng, type, angle} = props.marker;

  return (
    <Marker
      image={getImage(type)}
      rotation={parseFloat(angle) + 90}
      pinColor={'red'}
      key={lat}
      coordinate={{
        latitude: parseFloat(lat),
        longitude: parseFloat(lng),
      }}
    />
  );
});
