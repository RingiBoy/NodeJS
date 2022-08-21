const fileService = require("../services/file.service");

module.exports = {
  getAllUsers: async (req, res) => {
    const usersFromService = await fileService.getUser();
    res.json(usersFromService);
  },

  createUser: async (req, res) => {
    const user = await fileService.addUser(req.body);
    res.status(201).json(user);
  },

  getUserById: async (req, res) => {
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
  },

  deleteUserById: async (req, res) => {
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
  },

  updateUser: async (req, res) => {
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
  },
};
