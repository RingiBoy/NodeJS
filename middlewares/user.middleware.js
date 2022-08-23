const { statusCode } = require("../constants");
const { apiErorr } = require("../errors");
const userService = require("../services/user.service");

module.exports = {
  checkIsUserBodyValid: async (req, res, next) => {
    try {
      const { name, age } = req.body;

      if (Number.isNaN(+age) || age <= 0) {
        throw new apiErorr("wrong user age", statusCode.BAD_REQUEST);
      }

      if (name.length < 2) {
        throw new apiErorr(
          "wrong user name. Name must to be more on 2 point",
          statusCode.BAD_REQUEST
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  },
  checkIsUserEmailUniq: async (req, res, next) => {
    try {
      const { email } = req.body;
      console.log(req.user);  

      const userByEmail = await userService.getOneById({ email });

      if (userByEmail) {
        return next(new apiErorr("this email is use", statusCode.BAD_REQUEST));
      }

      next();
    } catch (error) {
      next(error);
    }
  },
  isUserPresent: async (req, res, next) => {
    try {
      const { userId } = req.params;

      const user = await userService.getOneById(userId);

      if (!user) {
        return next(new apiErorr("User not found", statusCode.NOT_FOUND));
      }
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  },
};
