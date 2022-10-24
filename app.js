require('dotenv').config()

const userRouter = require("./routes/user.router");
const config = require("./config/config")
const express = require("express");
const { response } = require('express');
const app = express();

// console.log("my folder of project is:", cwd());

app.use(express.json());

app.use("/users", userRouter);

app.use('*',( req, res, next)=>{
  next(new Error('Route not found'));

});

app.use((err, req, res , next)=>{
 res.json(err.message)
})

app.listen(config.PORT, () => {
  console.log("app listen 5000");
});
