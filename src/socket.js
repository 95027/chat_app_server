const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://chap-app-eight.vercel.app"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("connected user", socket);

  io.on("disconnect", () => {
    console.log("disconnect user", socket);
  });
});

module.exports = {
    app,
    server
}
