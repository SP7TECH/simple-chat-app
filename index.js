const express = require("express");
const socket = require("socket.io");

const app = express();

app.use(express.static("public"));

const server = app.listen(3000, () => console.log(`Listening on port 3000`));
const io = socket(server);

io.on("connection", (socket) => {
  console.log("made socket connection", socket.id);

  socket.on("message", (data) => {
    io.sockets.emit("message", data);
  });

  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});
