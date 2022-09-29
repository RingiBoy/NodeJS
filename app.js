const express = require("express");
const controllersUser = require("./controllers/user.controller")

const app = express();



// console.log("my folder of project is:", cwd());

app.use(express.json());

app.get("/users", controllersUser.getAllUsers);

app.post("/users" , controllersUser.createUser);

app.get("/users/:userId", controllersUser.getUserById);

app.put("/users/:userId", controllersUser.updateUser);

app.delete("/users/:userId", controllersUser.deleteUser);

app.listen(5000, () => {
  console.log("app listen 5000");
});
