import React, {useState} from 'react';
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

class Marker extends React.Component {
  state = {
    accepted: false,
    rejected: false
  }

  render() {
    const {text, type = 'bike', $hover, angle, src = null} = this.props;
    const style = $hover ? greatPlaceStyleHover : greatPlaceStyle;
    let image = text == 'ghost' ? GhostImg : getImage(type);
    // const color = colorTypes[type];
    const rotationStyle = {transform: `rotate(${angle - 270}deg)`,}
    return (
      <div className='vehicle' style={rotationStyle}>
        <div style={style}>
          {src && !this.state.rejected && (
            <>
              <img src={src} width="140" style={{width: 140}}/>
              {!this.state.accepted && (
                <div style={{flexDirection: 'row', display: 'flex'}}>
                  <button
                    onClick={() => this.setState({accepted: true})}
                    style={{backgroundColor: 'green', color: 'white'}}>Accept
                  </button>
                  <button
                    onClick={() => this.setState({rejected: true})}
                    style={{backgroundColor: 'red', color: 'white'}}>Reject
                  </button>
                </div>
              )}

            </>
          )}
          {!src && <img src={image} width="40"/>}
        </div>
      </div>
    )
  }
};

export default Marker;