const express = require("express");
require("dotenv").config();
const cors = require('cors');
const connectDB = require('./config/connectDB');
const routes = require('./src/routes');


const app = express();

const corsOptions = {
    origin: ["http://localhost:5173"],
}

app.use(cors(corsOptions));
app.use(express.json());

app.use("/v1", routes);



app.get("/", (req, res) => {
  res.status(200).json({ message: "server is running" });
});

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`server is running on ${PORT}`));
});

