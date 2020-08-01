import React from 'react';
import {FaCarSide, FaTruck, FaBus, FaMotorcycle, FaTrafficLight} from 'react-icons/fa';
// import {car,bus,bike} from '../assets/';
import bus from '../assets/bus.png';
import bike from '../assets/bike.png';
import car from '../assets/car.png';
import GhostImg from '../assets/ghost.png';
import ClientImg from '../assets/client.png';
// import {IoIosCar} from 'react-icons/io'
import {IconContext} from "react-icons";
import {boldBlue, lettuce, lightPink, green, amber, red} from "../constants";
import {greatPlaceStyle, greatPlaceStyleHover} from './hoverStyles';


const getImage = type => {
  switch (type) {
    case 'moto_motorcycle':
      return bike;
    case 'veh_passenger':
      return car;
    case 'bus_bus':
      return bus;
    case 'client':
      return ClientImg;
    default:
      return car;
  }
}

const colorTypes = {
  car: lightPink,
  truck: boldBlue,
  bus: boldBlue,
  bike: lettuce,
  trafficLightGreen: green,
  trafficLightRed: red,
  trafficLightAmber: amber
};

const marker = (props) => {
  const {text, type = 'bike', $hover, angle, src = null} = props;
  const style = $hover ? greatPlaceStyleHover : greatPlaceStyle;
  let image = text == 'ghost' ? GhostImg : getImage(type);
  // const color = colorTypes[type];
  const rotationStyle = {transform: `rotate(${angle - 270}deg)`,}
  return (
    <div className='vehicle' style={rotationStyle}>
      <div style={style}>
        {src && <img src={src} width="160"/>}
        {!src && <img src={image} width="40"/>}
      </div>
    </div>
  )
};

export default marker;