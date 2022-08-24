const { statusCode } = require("../constants");

const { userService } = require("../services");

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      // const usersFromService = await fileService.getUser();
      const users = await userService.getAllUsers();

      res.json(users);
    } catch (error) {
      next(error);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const user = await userService.createUser(req.body);
      res.status(statusCode.CREATE).json(user);
    } catch (error) {
      next(error);
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const { user } = req;
      console.log(req);
      // const user = await fileService.getUserById(+userId);
      // const user = await User.findById(userId);

      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  deleteUserById: async (req, res, next) => {
    try {
      const { userId } = req.params;

      await userService.deleteUserById(userId);

      res.sendStatus(statusCode.NO_CONTENT);
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
