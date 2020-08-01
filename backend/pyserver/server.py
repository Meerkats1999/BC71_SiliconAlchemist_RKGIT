import socketio
import json
import time
vehicle_data=[]
signal_data =[]
with open('fcd_output.json') as jsonFile:
    vehicle_data = json.load(jsonFile)
with open('signal_output.json') as jsonFile:
    signal_data = json.load(jsonFile)

sio = socketio.Client()

@sio.on('MODEL')
def on_message(data):
    print("Received message", data)
    if data=='REQUEST_VEHICLES':
        obj = {"type":"REQUEST_VEHICLES","data":vehicle_data}
        sio.emit('MODEL',obj )
    elif data=='REQUEST_SIGNALS':
        obj = {"type":"REQUEST_SIGNALS","data":signal_data}
        sio.emit('MODEL',obj )

url = 'http://localhost:3002/'
urlOnline = 'http://rkserver.herokuapp.com'
urlNav = 'http://192.168.31.186:3002'

sio.connect(url)

# for traffic in data:
#     sio.emit('MODEL', traffic)
#     time.sleep(5)

print("Data client listening")