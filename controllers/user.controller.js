const { statusCodes } = require("../constants");
const { apiErorr } = require("../errors");
const { BAD_REQUEST, NOT_FOUND } = require("../constants/statusCode.enum");
const User = require("../dataBAse/User");
const { userService } = require("../services");

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      // const usersFromService = await fileService.getUser();
      const usersFromService = await User.find();
      res.json(usersFromService);
    } catch (error) {
      next(error);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const user = await userService.createUser(req.body);
      res.status(statusCodes.CREATE).json(user);
    } catch (error) {
      next(error);
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const { userId } = req.params;

      // const user = await fileService.getUserById(+userId);
      const user = await User.findById(userId);
      if (!user) {
        throw new apiErorr("user not found", statusCodes.NOT_FOUND);
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  deleteUserById: async (req, res, next) => {
    try {
      const { userId } = req.params;

      await userService.deleteUserById(userId);

      res.sendStatus(statusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { userId } = req.params;

      const user = await userService.updateUserById(userId, req.body);

      res.json(user);
    } catch (error) {
      next(error);
    }
  },
};
