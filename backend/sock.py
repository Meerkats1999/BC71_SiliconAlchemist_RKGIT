import socketio
import pickle
import numpy as np
import json;
try:
    import thread
except ImportError:
    import _thread as thread
import time

filename = 'finalized_model.sav'
model = pickle.load(open(filename,'rb') )
sio = socketio.Client()
@sio.event
def message(data):
    print('I received a message!')

@sio.on('GYRO_REQUEST')
def on_message(data):
    print('I received a message!')
    # print(data)
    # obj = json.loads(message)
    x = data #obj['data']
    if len(x) == 30:
        x2 = np.array([x])
        x2.reshape(-1,1)
        print(x2)
        pred = model.predict(x2)
        print(pred)
        if pred[0] != 0:
            sio.emit('GYRO_RESPONSE', {'result': str(pred[0])})
@sio.event
def connect():
    print("I'm connected!")

@sio.event
def connect_error():
    print("The connection failed!")

@sio.event
def disconnect():
    print("I'm disconnected!")

# sio.connect('https://speedwagon-service.herokuapp.com')
sio.connect('http://localhost:3002')