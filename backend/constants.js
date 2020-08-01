const CHANNELS = {
     CLIENT_LOCATION : 'CLIENT_LOCATION',
     LOCATIONS:  'LOCATIONS',
     MODEL : 'MODEL',
     CONTROL : 'CONTROL',
     SIGNALS: 'SIGNALS',
     GYRO_DATA:'GYRO_DATA',
     GYRO_REQUEST:'GYRO_REQUEST',
     GYRO_RESPONSE:'GYRO_RESPONSE',
     GYRO_RESULT:'GYRO_RESULT'
}

const SIMULATION_STATES = {
    RUNNING:'RUNNING',
    PAUSED:'PAUSED',
    OFF:'OFF',
    END:'END',
    READY:'READY'
}

// const MODEL_REQUESTS= {
//     REQUEST_VEHICLES:'REQUEST_VEHICLES',
//     REQUEST_SIGNALS:'REQUEST_SIGNALS'
// }

const INITIAL_STATE = {
    state:SIMULATION_STATES.RUNNING,
    vehicle_data:[],
    signal_data:[],
    time:0,
    clients:{},
    interval:1000

    
}


module.exports =  {
    CHANNELS,
    SIMULATION_STATES,
    INITIAL_STATE,    
}