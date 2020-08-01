const {CHANNELS,SIMULATION_STATES, INITIAL_STATE} = require('./constants');
const {getDistance} = require('./API');
const state = INITIAL_STATE;

let Tlat =  12.974372;
let Tlng =  77.611098;

const clientLocationBroadcaster = (socket) => { 
    socket.on(CHANNELS.CLIENT_LOCATION, (data) => {
        console.log("Received client LOCATION", data);
        socket.broadcast.emit(CHANNELS.CLIENT_LOCATION, data);
      });
}

const handleClientData = data => {
    state.clients[data.id] = data;
}

const multiLocationBroadcaster = (socket) => {


    setInterval(() => {
        switch(state.state){
            case SIMULATION_STATES.OFF:
                break;
            case SIMULATION_STATES.PAUSED:
                break;
            case SIMULATION_STATES.READY:
                break;
            case SIMULATION_STATES.RUNNING:
                 if(state.time>=state.vehicle_data.length){
                    state.time=0;
                    console.log("Simulation Restarting");
                } 
               else broadcastSimulationData(socket);                
                break;
            default:break;
        }
        
    }, state.interval);
    
}


const startSimulation=()=>{
        state.state = SIMULATION_STATES.RUNNING;
}

const resetSimulation = () =>{
    state.state = SIMULATION_STATES.OFF;
    state.time = 0;
}

const showState = ()=>{
    console.log("Simulation state",
        state.state,
        state.vehicle_data.length,
        state.signal_data.length,
        state.time,
        Object.keys(state.clients).length,
        state.clients);
}

const broadcastSimulationData = (socket)=>{
    // console.log("Broadcasting simulation to", socket.id,   state.time);
    socket.emit(CHANNELS.LOCATIONS, state.vehicle_data[state.time]);
    socket.emit(CHANNELS.SIGNALS, state.signal_data[state.time]);
}

const pauseSimulation = ()=> {
    state.state = SIMULATION_STATES.PAUSED;
}

const setTimer = () =>{
    setInterval(()=>{
        if(state.state==SIMULATION_STATES.RUNNING)
            state.time++;
    },state.interval)
}

const setSimData = (vehicle,light)=>{
    state.signal_data=light;
    state.vehicle_data = vehicle;
}

setTimer();

module.exports = {
    clientLocationBroadcaster,
    multiLocationBroadcaster,
    showState,
    pauseSimulation,
    setSimData,
}