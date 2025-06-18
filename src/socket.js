const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const jwt = require("jsonwebtoken");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://chap-app-eight.vercel.app"],
    credentials: true,
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) return next(new Error("No token"));
  

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.id;
    next();
  } catch (err) {
    return next(new Error("Invalid token"));
  }
});

io.on("connection", (socket) => {
  console.log("connected user", socket.userId);

  socket.join(socket.userId);

  socket.on("sendMessage", ({ receiverId, message }) => {
    console.log("message: ", message);
    const payload = {
      senderId: socket.userId,
      receiverId,
      message,
    };
    io.to(receiverId).emit("getMessage", payload);
  });

  socket.on("disconnect", () => {
    console.log("disconnect user", socket.userId);
  });
});

module.exports = {
  app,
  server,
};
