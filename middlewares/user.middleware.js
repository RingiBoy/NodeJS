const { statusCode } = require("../constants");
const { apiErorr } = require("../errors");
const userService = require("../services/user.service");

module.exports = {
  checkIsUserBodyValid: async (req, res, next) => {
    try {
      const { name, age } = req.body;

      if (Number.isNaN(+age) || age <= 0) {
        return next(new apiErorr("wrong user age", statusCode.BAD_REQUEST));
      }

      if (name.length < 2) {
        return next(
          new apiErorr(
            "wrong user name. Name must to be more on 2 point",
            statusCode.BAD_REQUEST
          )
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
      const { userId } = req.params;
      console.log(req.user);

      const userByEmail = await userService.getOneByParams({ email });
      // userByEmail._id = _id: new ObjectId("630478b3124b56aa133e576d")
      // userByEmail._id.toString() = "630478b3124b56aa133e576d"
      if (userByEmail && userByEmail._id.toString() !== userId) {
        return next(new apiErorr("this email is use", statusCode.CONFLICT));
      }

      next();
    } catch (error) {
      next(error);
    }
  },
  isUserPresent: (from='params') => {
    return async (req, res, next) => {
      try {
        // const { userId } = req.params;
        const { userId } = req[from];

        const user = await userService.getOneById(userId);

        if (!user) {
          return next(new apiErorr("User not found", statusCode.NOT_FOUND));
        }
        req.user = user;
        next();
      } catch (error) {
        next(error);
      }
    };
  },
};
