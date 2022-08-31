const express = require("express");
const users = require("./dataBAse/users.json");

const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
  res.json(users);
});
app.get("/users/:id", (req, res) => {
  const userIndex = +req.params.id;

  console.log("userIndex:", userIndex);
  if (userIndex < 0 || isNaN(userIndex)) {
    res.status(400).json("please input valid id");
    return;
  }
  const user = users[userIndex];

  if (!user) {
    res.status(404).json("please input valid id");
    return;
  }
  res.json(users[userIndex]);
});




app.listen(5000, () => {
  console.log("app listen 5000");
});
