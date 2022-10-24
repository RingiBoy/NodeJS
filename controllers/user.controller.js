const fileService = require("../services/file.service");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await fileService.readDB();
      res.json(users);
    } catch (error) {
      res.json(error);
    }
  },
  createUser: async (req, res) => {
    try {
      const { name, age } = req.body;

      const users = await fileService.readDB();

      const newUser = {
        ...req.body,
        id: new Date().valueOf(),
        // id: users.length ? users[users.length - 1].id + 1 : 1
      };

      await fileService.pushToDB([...users, newUser]);

      res.status(201).json(newUser);
    } catch (error) {
      res.json(error);
    }
  },
  getUserById: async (req, res) => {
    try {
      const { userId } = req.params;
      const users = await fileService.readDB();
      const user = await users.find((user) => user.id === +userId);
      res.status(201).json(user);
    } catch (error) {
      res.json(error);
    }
  },
  updateUser: async (req, res) => {
    // console.log('put', req.body);
    try {
      const { userId } = req.params;
      const users = await fileService.readDB();
      const updateUsers = await users.map((user) =>
        user.id === +userId
          ? { name: req.body.name, age: req.body.age, id: user.id }
          : user
      );

      await fileService.pushToDB(updateUsers);
      res.status(201).json(updateUsers);
    } catch (error) {
      res.json(error);
    }
  },
  deleteUser: async (req, res) => {
    // console.log('put', req.body);
    try {
      const { userId } = req.params;
      const users = await fileService.readDB();
      const updateUsers = await users.filter((user) => {
        if (user.id !== +userId) return user;
      });

      await fileService.pushToDB(updateUsers);
      res.status(201).json(updateUsers);
    } catch (error) {
      res.json(error);
    }
  },
};
