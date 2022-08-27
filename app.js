const express = require("express");

const userRouter = require("./routes/user.router");

const app = express();

app.use(express.json());



app.listen(5000, () => {
  console.log("app listen 5000");
});
