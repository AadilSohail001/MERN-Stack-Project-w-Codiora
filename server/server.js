require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes/studentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.use("/api", routes);

app.listen(5000, () =>
    console.log("Server Running"));