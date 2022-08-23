const { BAD_REQUEST } = require("../constants/statusCode.enum");
const { apiErorr } = require("../errors");
const userService = require("../services/user.service");

module.exports = {
  checkIsUserBodyValid: async (req, res, next) => {
    try {
      const { name, age } = req.body;

      if (Number.isNaN(+age) || age <= 0) {
        throw new apiErorr("wrong user age", BAD_REQUEST);
      }

      if (name.length < 2) {
        throw new apiErorr(
          "wrong user name. Name must to be more on 2 point",
          BAD_REQUEST
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
      const userByEmail = await userService.getOneByParams({ email });

      if (userByEmail) {
        return next(new apiErorr("this email is use", BAD_REQUEST));
      }

      next();
    } catch (error) {
      next(error);
    }
  },
};
