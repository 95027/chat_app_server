const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const app = express();

const server = http.createServer(app);

const corsOptions = {
  origin: ["http://localhost:5173", "https://chap-app-eight.vercel.app"],
  credentials: true,
};

const io = new Server(server, {
  cors: corsOptions,
});

io.use((socket, next) => {
  // const token = socket.handshake.auth.token;

  // if (!token) return next(new Error("No token"));

  const cookies = socket.request.headers.cookie;
  if (!cookies) return next(new Error("No cookie"));

  const parsed = cookie.parse(cookies);
  const token = parsed.token;

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
  corsOptions,
};
