const { response } = require("express");
const express = require("express");
const users = require("./dataBAse");
const fileService = require("./services/file.service");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("REQUEST PROCESSED");

  res.json("hello! its response from server");
});

app.get("/users", async (req, res) => {
  const usersFromService = await fileService.getUser();
  res.json(usersFromService);
});
app.post("/users", async (req, res) => {
  const { name, age } = req.body;
  console.log("name:", name);
  console.log("age:", age);
  if (Number.isNaN(+age) || age <= 0) {
    res.status(400).json("wrong user age");
    return;
  }

  const user = await fileService.addUser({ name, age });

  res.status(201).json(user);
});

app.get("/users/:userId", async (req, res) => {
  const { userId } = req.params;

  if (Number.isNaN(+userId) || +userId < 0) {
    res.status(400).json("Wrong user id");
    return;
  }

  const user = await fileService.getUserById(+userId);
  if (!user) {
    res.status(404).json("user not found");
    return;
  }

  res.json(user);
});

app.delete("/users/:userId", async (req, res) => {
  const { userId } = req.params;

  if (Number.isNaN(+userId) || +userId < 0) {
    res.status(400).json("Wrong user id");
    return;
  }

  const user = await fileService.delUserById(+userId);
  if (!user) {
    res.status(404).json("user not found");
    return;
  }

  res.sendStatus(204);
});

app.put("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const { name, age } = req.body;

  if (Number.isNaN(+userId) || +userId < 0) {
    res.status(400).json("Wrong user id");
    return;
  }
  const userObject = {};
  if (name) userObject.name = name;
  if (age) userObject.age = age;

  const user = await fileService.updateByUserId(+userId, userObject);

  if (!user) {
    res.status(404).json("user not found");
    return;
  }

  res.status(201).json(user);
});

app.listen(5000, () => {
  console.log("app listen 5000");
});
