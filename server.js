// const express = require("express");
// const cors = require("cors");
// var cors_proxy = require("cors-anywhere");
// const app = express();
// const http = require("http").createServer(app);

// const io = require("socket.io")(http, {
//   cors: {
//     origin: ['192.168.43.250']
//   }
// });

// // var corsOptions = {
// //   origin: "http://192.168.43.250:3000/",
// //   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// // };

// app.use(express.json());
// app.use(cors());

// app.post("/", (req, res) => {
//   io.on("connection", (socket) => {
//     socket.on("new-user", (name) => {
//       users[socket.id] = name;
//       socket.broadcast.emit("user-connected", name);
//     });
//     socket.on("send-chat-message", (message) => {
//       socket.broadcast.emit("chat-message", {
//         message: message,
//         name: users[socket.id],
//       });
//     });
//     socket.on("disconnect", () => {
//       socket.broadcast.emit("user-disconnected", users[socket.id]);
//       delete users[socket.id];
//     });
//   });
//   const result = req.body.name;
//   console.log(req.body.name);
//   res.status(201).send(result);
// });

// http.listen(3000, "0.0.0.0", () => {
//   console.log("SSS");
// });


var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(3000);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});