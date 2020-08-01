import React from 'react';

import './App.css';

import {getClientLocationData, getSignalData, sendSignal, getMultiLocationData, listFeedback} from './API';
import Card from './components/Card'
import Map from './components/Map';
import Button from './components/Options';
import Chart from './components/Chart';
import {centerCoords} from './constants';

class App extends React.Component {

  state = {
    center: {
      lat: centerCoords.lat,
      lng: centerCoords.lng
    },
    zoom: 16,
    clients: {
      Str1k3r: {
        coords: {
          lat: 12.973074,
          lng: 77.612366
        },
        type: 'client',
        angle: 0
      }
    },
    trafficSignals: {},
    simulationState: 'RUNNING',
    simulationTime: 0,
    feedbacks: []
  };

  render() {
    return (
      <div className="App">
        <h1 className={'Heading'} style={{color: 'white'}}>SpeedWagon</h1>
        <div className={'MapContainer'}>
          <Map
            center={this.state.center}
            zoom={this.state.zoom}
            clients={this.state.clients}
            signals={this.state.trafficSignals}
          />
        </div>
        <Button
          cb={this.handleMiddleware}
        />
        <Card
          state={this.state.simulationState}
          time={this.state.simulationTime}
        />
      </div>
    );
  }
}

export default App;
// <Chart 
//           light={'grgfygyrrG'}
//         />


