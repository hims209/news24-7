//Importing Express framework
let app = require("express")();

//Importing http and socket module.
let http = require("http").createServer(app);
let io = require("socket.io")(http);

//Define port
const PORT = 3000;

//Makingn socket for chat functionality 
io.on("connection", function (socket) {
  console.log("user connected");
  socket.on("chat message", message => {
    console.log(message);
    io.emit('chat message', message);
  });
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

//Http listen on defined port
http.listen(PORT, function () {
  console.log(`started on port ${PORT}`);
});