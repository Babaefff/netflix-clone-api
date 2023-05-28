const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/UserRoutes");
require("dotenv").config()


const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONT_URL);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Pass to next layer of middleware
  next();
});

app.use(cors({
  origin: process.env.FRONT_URL
}));
app.use(express.json());



mongoose
  .connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB CONNECTED");
  });


app.use("/api/user",userRoute)
const port = process.env.PORT || 5000;
app.listen(port, console.log("server running"));
