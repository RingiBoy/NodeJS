const express = require("express");

const app = express();

const fileService = require("./services/file.service");

// console.log("my folder of project is:", cwd());

app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await fileService.readDB();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const { name, age } = req.body;

  if (!Number.isInteger(age) || age < 0) {
    return res.status(400).json("set valid age");
  }
  if (!name || name.length < 3) {
    return res.status(400).json("set valid name");
  }

  const users = await fileService.readDB();

  const newUser = {
    ...req.body,
    id: new Date().valueOf(),
    // id: users.length ? users[users.length - 1].id + 1 : 1
  };

  await fileService.pushToDB([...users, newUser]);

  res.json(newUser);
});

app.listen(5000, () => {
  console.log("app listen 5000");
});
