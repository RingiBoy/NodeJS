const fileService = require("../services/file.service");
const { statusCodes } = require('../constants');

module.exports = {
  getAllUsers: async (req, res) => {
    const usersFromService = await fileService.getUser();
    res.json(usersFromService);
  },

  createUser: async (req, res) => {
    const user = await fileService.addUser(req.body);
    res.status(statusCodes.CREATE).json(user);
  },

  getUserById: async (req, res) => {
    const { userId } = req.params;

    if (Number.isNaN(+userId) || +userId < 0) {
      res.status(statusCodes.BAD_REQUEST).json("Wrong user id");
      return;
    }

    const user = await fileService.getUserById(+userId);
    if (!user) {
      res.status(statusCodes.NOT_FOUND).json("user not found");
      return;
    }

    res.json(user);
  },

  deleteUserById: async (req, res) => {
    const { userId } = req.params;

    if (Number.isNaN(+userId) || +userId < 0) {
      res.status(statusCodes.BAD_REQUEST).json("Wrong user id");
      return;
    }

    const user = await fileService.delUserById(+userId);
    if (!user) {
      res.status(statusCodes.NOT_FOUND).json("user not found");
      return;
    }

    res.sendStatus(statusCodes.NO_CONTENT);
  },

  updateUser: async (req, res) => {
    const { userId } = req.params;
    const { name, age } = req.body;

    if (Number.isNaN(+userId) || +userId < 0) {
      res.status(statusCodes.NOT_FOUND).json("Wrong user id");
      return;
    }
    const userObject = {};
    if (name) userObject.name = name;
    if (age) userObject.age = age;

    const user = await fileService.updateByUserId(+userId, userObject);

    if (!user) {
      res.status(statusCodes.NOT_FOUND).json("user not found");
      return;
    }

    res.status(statusCodes.NO_CONTENT).json(user);
  },
};
