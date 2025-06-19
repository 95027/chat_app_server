const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/connectDB");
const cookieParser = require("cookie-parser");
const routes = require("./src/routes");
const { app, server, corsOptions } = require("./src/socket");

//const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/v1", routes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "server is running" });
});

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  server.listen(PORT, () => console.log(`server is running on ${PORT}`));
});
