const {CHANNELS, SIMULATION_STATES, INITIAL_STATE} = require('./constants');
const {getDistance} = require('./API');
const state = INITIAL_STATE;

let Tlat = 12.974372;
let Tlng = 77.611098;

const clientLocationBroadcaster = (socket) => {
  socket.on(CHANNELS.CLIENT_LOCATION, (data) => {
    console.log("Received client LOCATION", data);
    socket.broadcast.emit(CHANNELS.CLIENT_LOCATION, data);
    let prevLocation = state.clients[data.id] && state.clients[data.id].coords;
    let prevTime = state.clients[data.id] && state.clients[data.id].timestamp;
    handleClientData(data);
    let newLocation = data.coords;
    if (prevLocation) {
      let distance = getDistance(
        prevLocation.lat, prevLocation.lng,
        newLocation.lat, newLocation.lng
      )
      let newTime = data.timestamp;
      let timeDelta = newTime - prevTime;
      console.log("Distance", distance);
      let velocity = 0;
      if (distance >= 1)
        velocity = Math.abs(distance / timeDelta);
      if (velocity < 4)
        return;
      console.log("Speed", velocity * 3.6);
      const distanceToLight = getDistance(newLocation.lat, newLocation.lng);
      const speeds = [-4, -3, -2, -1, 1, 2, 3, 4]
      for (let i = 0; i < 7; i++) {
        let adder = speeds[i];
        let desiredSpeed = velocity + adder;
        let timeToReach = distanceToLight / desiredSpeed;
        let FinalSimTime = state.time + Math.floor(timeToReach / 2);
        // console.log("Pred sim time", FinalSimTime)
        if (FinalSimTime > 240)
          break;
        let stateOfLight = state.signal_data[FinalSimTime].signals[3].state[1];
        if (stateOfLight == 'g' || stateOfLight == 'G') {
          console.log("Desired speed", desiredSpeed * 3.6);
          socket.emit("SPEED", "Change speed to " + desiredSpeed * 3.6);
          break;
        }
      }

    }

  });
}

const handleClientData = data => {
  state.clients[data.id] = data;
}

const multiLocationBroadcaster = (socket) => {


  setInterval(() => {
    switch (state.state) {
      case SIMULATION_STATES.OFF:
        break;
      case SIMULATION_STATES.PAUSED:
        break;
      case SIMULATION_STATES.READY:
        break;
      case SIMULATION_STATES.RUNNING:
        if (state.time >= state.vehicle_data.length) {
          state.time = 0;
          console.log("Simulation Restarting");
        } else broadcastSimulationData(socket);
        //    socket.emit("SPEED", "Change speed to ");

        break;
      default:
        break;
    }

  }, state.interval);

}

const setSimulationHandler = (socket) => {
  socket.on(CHANNELS.CONTROL, (message) => {
    console.log("Received CONTROL", message);
    switch (message) {
      case 'start':
        startSimulation();
        break;
      case 'reset':
        resetSimulation();
        break;
      case 'pause':
        pauseSimulation();
        break;
      case 'emergency':
        socket.broadcast.emit(CHANNELS.GYRO_RESULT, {
          message: 'Emergency vehicle in vicinity',
          type: 'success'
        });
        break;
      case 'pothole':
        socket.broadcast.emit(CHANNELS.GYRO_RESULT, {
          message: 'Pothole nearby',
          type: 'info'
        });
        break;
      case 'crash':
        socket.broadcast.emit(CHANNELS.GYRO_RESULT, {
          message: 'Accident in vicinity',
          type: 'danger'
        });
        break;
      case 'vicinity':
        socket.broadcast.emit(CHANNELS.GYRO_RESULT, {
          message: 'High speed vehicle in vicinity',
          type: 'danger'
        });
        break;
      default:
        break;
    }
  });
  socket.on(CHANNELS.GYRO_DATA, (message) => {
    // console.log("Received Gyro data from device");
    socket.broadcast.emit(CHANNELS.GYRO_REQUEST, message);
  });
  socket.on(CHANNELS.GYRO_RESPONSE, (message) => {
    console.log("Received Gyro response from predictor", message);
    switch (message.result) {
      case '0':
        break;
      case '1':
        socket.broadcast.emit(CHANNELS.GYRO_RESULT, {
          message: 'Speed bump detected',
          type: 'info'
        });
        break;
      case '2':
        socket.broadcast.emit(CHANNELS.GYRO_RESULT, {
          message: 'Pothole detected',
          type: 'info'
        });
        break;
      case '3':
        socket.broadcast.emit(CHANNELS.GYRO_RESULT, {
          message: 'Crash detected',
          type: 'danger'
        });
        break;

    }
  });
}

const startSimulation = () => {
  state.state = SIMULATION_STATES.RUNNING;
}

const resetSimulation = () => {
  state.state = SIMULATION_STATES.OFF;
  state.time = 0;
}

const showState = () => {
  console.log("Simulation state",
    state.state,
    state.vehicle_data.length,
    state.signal_data.length,
    state.time,
    Object.keys(state.clients).length,
    state.clients);
}

const broadcastSimulationData = (socket) => {
  socket.emit(CHANNELS.LOCATIONS, state.vehicle_data[state.time]);
  socket.emit(CHANNELS.SIGNALS, state.signal_data[state.time]);
}

const pauseSimulation = () => {
  state.state = SIMULATION_STATES.PAUSED;
}

const setTimer = () => {
  setInterval(() => {
    if (state.state == SIMULATION_STATES.RUNNING)
      state.time++;
  }, state.interval)
}

const setSimData = (vehicle, light) => {
  state.signal_data = light;
  state.vehicle_data = vehicle;
}

setTimer();

module.exports = {
  clientLocationBroadcaster,
  multiLocationBroadcaster,
  setSimulationHandler,
  state,
  resetSimulation,
  startSimulation,
  showState,
  pauseSimulation,
  setSimData,
}