const express = require("express");
const mongoose = require('mongoose');

require("dotenv").config();

const {userRouter, carRouter }= require("./routes");
const { PORT, MONGO_URL } = require("./configs/config");
const mainHandler = require("./errors/mainHandler");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use("/users", userRouter);
app.use("/cars", carRouter)

app.use('*', (req, res, next)=>{
next(new Error('Route not found'))
})

app.use(mainHandler)

app.listen(PORT, () => {
  console.log(`app listen ${PORT}`);
  mongoose.connect(MONGO_URL);
});
