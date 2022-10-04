require('dotenv').config()

const userRouter = require("./routes/user.router");
const config = require("./config/config")
const express = require("express");
const app = express();

// console.log("my folder of project is:", cwd());

app.use(express.json());

app.use("/users", userRouter);

app.listen(config.PORT, () => {
  console.log("app listen 5000");
});
