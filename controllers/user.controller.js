const fileService = require("../services/file.service")

module.exports = {
  getAllUsers: async (req, res) => {
    const users = await fileService.readDB();
    res.json(users);
  },
  createUser: async (req, res) => {
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

    res.status(201).json(newUser);
  },
  getUserById: async (req, res) => {
    const { userId } = req.params;
    const users = await fileService.readDB();
    const user = await users.find((user) => user.id === +userId);
    res.status(201).json(user);
  },
  updateUser: async (req, res) => {
    // console.log('put', req.body);

    const { userId } = req.params;
    const users = await fileService.readDB();
    const updateUsers = await users.map((user) =>
      user.id === +userId
        ? { name: req.body.name, age: req.body.age, id: user.id }
        : user
    );

    await fileService.pushToDB(updateUsers);
    res.status(201).json(updateUsers);
  },
  deleteUser: async (req, res) => {
    // console.log('put', req.body);

    const { userId } = req.params;
    const users = await fileService.readDB();
    const updateUsers = await users.filter((user) => {
      if (user.id !== +userId) return user;
    });

    await fileService.pushToDB(updateUsers);
    res.status(201).json(updateUsers);
  },
};
