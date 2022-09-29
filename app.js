const userRouter = require("./routes/user.router");
const express = require("express");
const app = express();

// console.log("my folder of project is:", cwd());

app.use(express.json());

app.use("/users", userRouter);

app.listen(5000, () => {
  console.log("app listen 5000");
});
