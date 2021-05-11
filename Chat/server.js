//Imports
var app = require('express')();

var http = require('http').createServer(app);

//Defining socket with origine to listen the main host
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:4200']
  }
});


app.get('/', (req, res) => res.send('hello!'));


//input output connection socket for chat functionality
io.on("connection", (socket) => {
  console.log(" a user connected");
  // alert("A new user is connected!!");
  socket.on('message', (msg) => {
    console.log(msg);
    socket.broadcast.emit('message-broadcast', msg);
  });
});

//Port listening
http.listen(3000, () => {
  console.log('Chat server Running on ',http.address().port);
});

