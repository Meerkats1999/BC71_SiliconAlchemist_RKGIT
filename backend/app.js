let app = require('express')();
let server = require('http').Server(app);
let io = require('socket.io')(server);
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3002;


server.listen(PORT, () => console.log("server started at ", PORT));

app.use(bodyParser.json())
