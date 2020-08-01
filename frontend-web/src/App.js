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

  async componentDidMount() {
    getClientLocationData(this.onDataReceive);
    getMultiLocationData(this.onMultiDataReceive);
    getSignalData(this.ongetSignalData);
    let {feedbacks} = await listFeedback()
    feedbacks&& this.addFeedbacks(feedbacks);
    // this.timer = setInterval(()=>{
    //   if(this.state.simulationState==='RUNNING'){
    //     let simulationTime = this.state.simulationTime +1;
    //     this.setState({simulationTime});
    //   }
    // },1000);
  }

  addFeedbacks = (feedbacks) => {
    const clients = {...this.state.clients};
    feedbacks.map(feedback => {
      clients[feedback._id] = {
        coords: {lat: feedback.lat, lng: feedback.lon},
        type: 'static',
        src: feedback.contentURL,
        id: feedback._id,
        angle: -90
      };
    });
    this.setState({clients});
  }

  componentWillMount() {
    clearInterval(this.timer);
  }

  handleMiddleware = (signal) => {
    switch (signal) {
      case 'start':
        this.setState({simulationState: 'RUNNING'})
        break;
      case 'reset':
        this.setState({simulationState: 'OFF', simulationTime: 0});
        break;
      case 'pause':
        this.setState({simulationState: 'PAUSED'})
        break;
      default:
        break;
    }
    sendSignal(signal);
  }

  onDataReceive = (data) => {
    let {clients} = this.state;

    let {id, coords, type} = data;
    if (id) {
      clients[id] = {
        coords,
        type
      }
    }
    this.setState({clients});
  };

  onMultiDataReceive = (data) => {
    this.setState({simulationTime: data.time})
    const {vehicles} = data;
    if (!vehicles) {
      console.log("No vehicles");
      return;
    }
    const {clients} = this.state;
    // const clients = {};

    vehicles.map(vehicle => {
      if (vehicle.id) {
        clients[vehicle.id] = {
          coords: {
            lat: vehicle.lat,
            lng: vehicle.lng
          },
          type: vehicle.type,
          angle: vehicle.angle
        }
      }
    });

    this.setState({clients});
  }

  ongetSignalData = (data) => {
    const {signals} = data;
    // console.log(data)
    if (!signals) {

      console.log("No Signals");
      return;
    }
    const {trafficSignals} = this.state;
    signals.map(signal => {
      if (signal.id) {
        trafficSignals[signal.id] = {
          coords: {
            lat: signal.lat,
            lng: signal.lng
          },
          state: signal.state,
        }
      }
    });

    this.setState({trafficSignals});
  }

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

