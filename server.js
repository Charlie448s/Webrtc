const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", socket => {
  console.log("A user connected");

  socket.on("join", room => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on("offer", ({ room, offer }) => {
    socket.to(room).emit("offer", offer);
  });

  socket.on("answer", ({ room, answer }) => {
    socket.to(room).emit("answer", answer);
  });

  socket.on("candidate", ({ room, candidate }) => {
    socket.to(room).emit("candidate", candidate);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(3000, () => console.log("Server running at http://localhost:3000"));
